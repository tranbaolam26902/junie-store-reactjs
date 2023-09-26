using Microsoft.AspNetCore.Mvc;
using Store.Core.Contracts;
using Store.Services.Shops;
using Store.WebAPI.Models.OrderModel;
using Store.WebAPI.Models;
using System.Net;
using Store.Core.DTO;
using Store.WebAPI.Models.DashboardModel;

namespace Store.WebAPI.Endpoints;

public static class DashboardEndpoints
{
	public static WebApplication MapDashboardEndpoint(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/dashboard");

		routeGroupBuilder.MapGet("/", GetDashboard)
			.WithName("GetDashboard")
			.Produces<ApiResponse<IPagedList<OrderDto>>>();

		routeGroupBuilder.MapGet("/RevenueDetail", GetRevenueDetail)
			.WithName("GetRevenueDetail")
			.Produces<ApiResponse<IList<RevenueOrder>>>();

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
				RevenueToday = await repository.RevenueTodayAsync(),
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

	private static async Task<IResult> GetRevenueDetail(
		[AsParameters] DashboardFilterModel model,
		[FromServices] IDashboardRepository repository)
	{
		try
		{
			switch (model.Type)
			{
				case TypeRevenue.Month:
					return Results.Ok(ApiResponse.Success(await repository.MonthlyRevenueDetailAsync()));
				case TypeRevenue.Day:
					return Results.Ok(ApiResponse.Success(await repository.DailyRevenueDetailAsync()));
				case TypeRevenue.Hour:
					return Results.Ok(ApiResponse.Success(await repository.HourlyRevenueDetailAsync()));
				default:
					return Results.Ok(ApiResponse.Success("", HttpStatusCode.NoContent));
			}
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}