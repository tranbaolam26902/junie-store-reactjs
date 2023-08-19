using Microsoft.AspNetCore.Mvc;
using Store.Core.Contracts;
using Store.Services.Shops;
using Store.WebAPI.Models.OrderModel;
using Store.WebAPI.Models;
using System.Net;
using Store.WebAPI.Models.DashboardModel;

namespace Store.WebAPI.Endpoints;

public static class DashboardEndpoint
{
	public static WebApplication MapDashboardEndpoint(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/dashboard");

		routeGroupBuilder.MapGet("/", GetDashboard)
			.WithName("GetDashboard")
			.Produces<ApiResponse<IPagedList<OrderDto>>>();


		return app;
	}

	private static async Task<IResult> GetDashboard(
		[FromServices] IDashboardRepository repository)
	{
		try
		{
			var dashboard = new DashboardDto()
			{
				OrderToday = await repository.OrderToday(),
				RevenueToday = await repository.RevenueToday(),
				TotalCategories = await repository.TotalCategories(),
				TotalOrder = await repository.TotalOrder(),
				TotalProduct = await repository.TotalProduct(),
				TotalRevenue = await repository.TotalRevenue()
			};

			return Results.Ok(ApiResponse.Success(dashboard));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}