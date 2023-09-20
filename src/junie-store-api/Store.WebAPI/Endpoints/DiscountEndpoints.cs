using System.Net;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Collections;
using Store.Core.Contracts;
using Store.Core.Queries;
using Store.Services.Shops;
using Store.WebAPI.Models;
using Store.WebAPI.Models.CategoryModel;
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
			.Produces<ApiResponse<IPagedList<DiscountDto>>>();

		#endregion

		#region POST Method

		builder.MapPost("/validateDiscount", CheckValidDiscount)
			.WithName("CheckValidDiscount")
			.Produces<ApiResponse<DiscountDto>>();

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