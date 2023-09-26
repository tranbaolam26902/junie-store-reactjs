using System.Net;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Services.Shops;
using Store.WebAPI.Models;
using Store.WebAPI.Models.OrderModel;
using Mapster;
using Store.Core.Collections;
using Store.WebAPI.Filters;
using Store.Core.Queries;
using Store.WebAPI.Identities;

namespace Store.WebAPI.Endpoints;

public static class OrderEndpoints
{
	public static WebApplication MapOrdersEndpoint(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/orders");

		routeGroupBuilder.MapGet("/", GetOrder)
			.WithName("GetOrder")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<IPagedList<OrderDto>>>();

		routeGroupBuilder.MapGet("/byUser", GetOrderByUser)
			.WithName("GetOrderByUser")
			.RequireAuthorization()
			.Produces<ApiResponse<IPagedList<OrderDto>>>();

		routeGroupBuilder.MapPost("/checkout", CheckOut)
			.WithName("CheckOut")
			.RequireAuthorization()
			.AddEndpointFilter<ValidatorFilter<OrderEditModel>>()
			.Produces<ApiResponse<OrderDto>>();

		routeGroupBuilder.MapGet("/{orderId:guid}", GetOrderById)
			.WithName("GetOrderById")
			.Produces<ApiResponse<OrderDto>>();

		routeGroupBuilder.MapGet("/OrderCode/{orderCode}", GetOrderByCode)
			.WithName("GetOrderByCode")
			.Produces<ApiResponse<OrderDto>>();

		routeGroupBuilder.MapGet("/Toggle/{orderId:guid}", ToggleOrderById)
			.WithName("ToggleOrderById")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<OrderDto>>();

		routeGroupBuilder.MapDelete("/cancel/{orderId:guid}", CancelOrderByUser)
			.WithName("CancelOrderByUser")
			.RequireAuthorization()
			.Produces<ApiResponse<OrderDto>>();

		return app;
	}

	private static async Task<IResult> GetOrder(
		[AsParameters] OrderFilterModel model,
		[FromServices] IOrderRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var condition = mapper.Map<OrderQuery>(model);

			model.SortColumn ??= "OrderDate";

			var orders =
				await repository.GetPagedOrdersAsync(
					condition,
					model,
					p => p.ProjectToType<OrderDto>());

			var paginationResult = new PaginationResult<OrderDto>(orders);

			return Results.Ok(ApiResponse.Success(paginationResult));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetOrderByUser(
		HttpContext context,
		[AsParameters] OrderFilterModel model,
		[FromServices] IOrderRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var condition = mapper.Map<OrderQuery>(model);
			model.SortColumn ??= "OrderDate";
			var orders =
				await repository.GetPagedOrdersByUserAsync(
					context.GetCurrentUser().Id,
					condition,
					model,
					p => p.ProjectToType<OrderDto>());

			var paginationResult = new PaginationResult<OrderDto>(orders);

			return Results.Ok(ApiResponse.Success(paginationResult));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> CheckOut(
		HttpContext context,
		[FromBody] OrderEditModel model,
		[FromServices] IOrderRepository repository,
		[FromServices] ICollectionRepository productRepo,
		[FromServices] IMapper mapper)
	{
		try
		{
			if (!string.IsNullOrWhiteSpace(model.DiscountCode))
			{
				var tempOrder = await repository.GetProductOrderAsync(model.Detail);
				var discount = await repository.CheckValidDiscountAsync(model.DiscountCode, tempOrder.Total);
				if (discount == null)
				{
					return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotAcceptable, "Nhập mã giảm giá hợp lệ"));
				}
			}

			var outOfStockProductNames = new List<string>();
			if (!model.Detail.Any() || model.Detail.Any(s => s.Quantity == 0))
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotAcceptable, "Đơn hàng chưa có sản phẩm"));
			}
			
			foreach (var edit in model.Detail)
			{
				if (!await repository.CheckQuantityProduct(edit.Id, edit.Quantity))
				{
					var product = await productRepo.GetProductByIdAsync(edit.Id);
					outOfStockProductNames.Add(product == null
						? $"Sản phẩm không tồn tại"
						: $"Sản phẩm: {product.Name} không khả dụng hoặc hết hàng");
				}
			}

			if (outOfStockProductNames.Any())
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.UnprocessableEntity, outOfStockProductNames.ToArray()));
			}

			var userDto = context.GetCurrentUser();

			var newOrder = mapper.Map<Order>(model);
			var user = mapper.Map<User>(userDto);

			var order = await repository.AddOrderAsync(newOrder, user);

			await repository.AddProductOrderAsync(order.Id, model.Detail);

			if (!string.IsNullOrWhiteSpace(model.DiscountCode))
			{
				await repository.AddDiscountOrderAsync(order, model.DiscountCode);
			}

			var result = mapper.Map<OrderDto>(order);

			return Results.Ok(ApiResponse.Success(result));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetOrderById(
		[FromRoute] Guid orderId,
		[FromServices] IOrderRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var order = await repository.GetOrderByIdAsync(orderId);

			if (order == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Order is not found"));
			}

			var orderDto = mapper.Map<OrderDto>(order);
			return Results.Ok(ApiResponse.Success(orderDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetOrderByCode(
		[FromRoute] string orderCode,
		[FromServices] IOrderRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var order = await repository.GetOrderByCodeAsync(orderCode);

			if (order == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Order is not found"));
			}

			var orderDto = mapper.Map<OrderDto>(order);
			return Results.Ok(ApiResponse.Success(orderDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> ToggleOrderById(
		[FromRoute] Guid orderId,
		[FromServices] IOrderRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var order = await repository.GetOrderByIdAsync(orderId);

			if (order == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Order is not found"));
			}

			var toggleOrder = await repository.ToggleOrderAsync(order);

			var orderDto = mapper.Map<OrderDto>(order);
			return Results.Ok(ApiResponse.Success(orderDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> CancelOrderByUser(
		HttpContext context,
		[FromRoute] Guid orderId,
		[FromServices] IOrderRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var order = await repository.GetOrderByIdAsync(orderId);
			if (order == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Đơn hàng không tồn tại"));
			} 
			else if (order.UserId != context.GetCurrentUser().Id)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotAcceptable, "Bạn không được phép hủy đơn hàng này"));
			}
			else if (order.Status != OrderStatus.New)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotAcceptable,
					"Không thể hủy đơn hàng đã được xác nhận"));
			}

			order = await repository.CancelOrderAsync(orderId);

			return Results.Ok(ApiResponse.Success(mapper.Map<OrderDto>(order)));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}