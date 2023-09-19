using System.Net;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
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
		//

		#endregion

		#region POST Method

		builder.MapPost("/validateDiscount", CheckValidDiscount)
			.WithName("CheckValidDiscount")
			.Produces<ApiResponse<DiscountDto>>();

		#endregion

		return app;
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