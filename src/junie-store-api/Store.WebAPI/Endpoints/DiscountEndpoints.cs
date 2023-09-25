using System.Net;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Collections;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;
using Store.Services.Shops;
using Store.WebAPI.Models;
using Store.WebAPI.Models.DiscountModel;

namespace Store.WebAPI.Endpoints;

public static class DiscountEndpoints
{
	public static WebApplication MapDiscountEndpoint(
		this WebApplication app)
	{
		var builder = app.MapGroup("/api/discounts");

		#region GET Method

		builder.MapGet("/", GetPagedDiscounts)
			.WithName("GetPagedDiscounts")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<IPagedList<DiscountDto>>>();

		builder.MapGet("/{id:guid}", GetDiscountById)
			.WithName("GetDiscountById")
			.Produces<ApiResponse<DiscountDto>>()
			.Produces<ApiResponse>(404);


		builder.MapGet("/byCode/{code}", GetDiscountByCode)
			.WithName("GetDiscountByCode")
			.Produces<ApiResponse<DiscountDto>>()
			.Produces<ApiResponse>(404);

		#endregion

		#region POST Method

		builder.MapPost("/", AddDiscount)
			.WithName("AddDiscount")
			.RequireAuthorization("RequireManagerRole")
			.Produces<DiscountDto>(201);

		builder.MapPost("/validateDiscount", CheckValidDiscount)
			.WithName("CheckValidDiscount")
			.Produces<ApiResponse<DiscountDto>>();

		#endregion

		#region PUT Method

		builder.MapPut("/{id:guid}", UpdateDiscount)
			.WithName("UpdateDiscount")
			.RequireAuthorization("RequireManagerRole")
			.Produces<DiscountDto>(201);

		#endregion

		return app;
	}

	private static async Task<IResult> GetPagedDiscounts(
		[AsParameters] DiscountFilterModel model,
		[FromServices] IDiscountRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var condition = mapper.Map<DiscountQuery>(model);

			var discounts =
				await repository.GetPagedDiscountsAsync(
					condition,
					model,
					p => p.ProjectToType<DiscountDto>());

			var paginationResult = new PaginationResult<DiscountDto>(discounts);

			return Results.Ok(ApiResponse.Success(paginationResult));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetDiscountById(
		[FromRoute] Guid id,
		[FromServices] IDiscountRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var discount = await repository.GetDiscountByIdAsync(id);

			if (discount == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Mã giảm giá không tồn tại."));
			}

			
			return Results.Ok(ApiResponse.Success(mapper.Map<DiscountDto>(discount)));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetDiscountByCode(
		[FromRoute] string code,
		[FromServices] IDiscountRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var discount = await repository.GetDiscountByCodeAsync(code);

			if (discount == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Mã `{code}` không tồn tại."));
			}


			return Results.Ok(ApiResponse.Success(mapper.Map<DiscountDto>(discount)));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> AddDiscount(
		[FromBody] DiscountEditModel model,
		[FromServices] IDiscountRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			if (await repository.IsDiscountExistedAsync(Guid.Empty, model.Code))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.Conflict,
					$"Mã `{model.Code}` đã tồn tại"));
			}

			var discount = mapper.Map<Discount>(model);

			await repository.AddOrUpdateDiscountAsync(discount);

			return Results.Ok(ApiResponse.Success(mapper.Map<DiscountDto>(discount), HttpStatusCode.Created));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> UpdateDiscount(
		[FromRoute] Guid id,
		[FromBody] DiscountEditModel model,
		[FromServices] IDiscountRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			if (await repository.IsDiscountExistedAsync(id, model.Code))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.Conflict,
					$"Mã `{model.Code}` đã tồn tại"));
			}

			var discount = await repository.GetDiscountByIdAsync(id);
			mapper.Map(model, discount);

			await repository.AddOrUpdateDiscountAsync(discount);

			return Results.Ok(ApiResponse.Success(mapper.Map<DiscountDto>(discount), HttpStatusCode.NoContent));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> CheckValidDiscount(
		DiscountOrdersModel model,
		[FromServices] IOrderRepository orderRepo,
		[FromServices] IMapper mapper)
	{
		try
		{
			var tempOrder = await orderRepo.GetProductOrderAsync(model.Detail);
			var discount = await orderRepo.CheckValidDiscountAsync(model.DiscountCode, tempOrder.Total);
			
			return discount == null 
				? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotAcceptable, "Mã giảm giá không hợp lệ hoặc đã hết hạn sử dụng"))
				: Results.Ok(ApiResponse.Success(mapper.Map<DiscountDto>(discount)));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}