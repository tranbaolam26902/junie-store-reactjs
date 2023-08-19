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

namespace Store.WebAPI.Endpoints;

public static class OrdersEndpoints
{
	public static WebApplication MapOrdersEndpoint(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/orders");

		routeGroupBuilder.MapGet("/", GetOrder)
			.WithName("GetOrder")
			.Produces<ApiResponse<IPagedList<OrderDto>>>();

		routeGroupBuilder.MapPost("/checkout", CheckOut)
			.WithName("CheckOut")
			.AddEndpointFilter<ValidatorFilter<OrderEditModel>>()
			.Produces<ApiResponse<OrderDto>>();

		routeGroupBuilder.MapGet("/{orderId:guid}", GetOrderById)
			.WithName("GetOrderById")
			.Produces<ApiResponse<OrderDto>>();

		routeGroupBuilder.MapGet("/Toggle/{orderId:guid}", ToggleOrderById)
			.WithName("ToggleOrderById")
			.Produces<ApiResponse<OrderDto>>();


		return app;
	}

	private static async Task<IResult> GetOrder(
		[AsParameters] OrderFilterModel model,
		[FromServices] IOrderRepository repository,
		[FromServices] IMapper mapper)
	{
		var condition = mapper.Map<OrderQuery>(model);

		var orders =
			await repository.GetPagedOrdersAsync(
				condition,
				model,
				p => p.ProjectToType<OrderDto>());

		var paginationResult = new PaginationResult<OrderDto>(orders);

		return Results.Ok(ApiResponse.Success(paginationResult));
	}

	private static async Task<IResult> CheckOut(
		OrderEditModel model,
		[FromServices] IOrderRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			foreach (var edit in model.Detail)
			{
				if (!await repository.CheckQuantityProduct(edit.Id, edit.Quantity))
				{
					return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Out of stock"));
				}
			}

			var newOrder = mapper.Map<Order>(model);

			var order = await repository.CreateOrderAsync(newOrder);

			order = await repository.AddProductOrderAsync(order.Id, model.Detail);

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
}