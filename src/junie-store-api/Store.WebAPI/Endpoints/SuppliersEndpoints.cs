using System.Net;
using Store.WebAPI.Models;

namespace Store.WebAPI.Endpoints;

public static class SuppliersEndpoints
{
	public static WebApplication MapSupplierEndpoints(
		this WebApplication app)
	{
		var builder = app.MapGroup("/api/suppliers");

		return app;
	}

	private static IResult GetPagedSuppliersAsync()
	{
		try
		{
			return Results.Ok();
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}