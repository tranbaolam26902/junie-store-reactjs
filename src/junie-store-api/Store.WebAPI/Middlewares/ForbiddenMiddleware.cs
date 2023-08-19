using Store.WebAPI.Models;
using System.Net;
using System.Text.Json;

namespace Store.WebAPI.Middlewares;

public class ForbiddenMiddleware
{
	private readonly RequestDelegate _next;

	public ForbiddenMiddleware(RequestDelegate next)
	{
		_next = next;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		await _next(context);

		if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
		{
			context.Response.ContentType = "application/json";
			context.Response.StatusCode = StatusCodes.Status403Forbidden;

			// Your custom error message
			var statusCode = (HttpStatusCode)Enum.Parse(typeof(HttpStatusCode), StatusCodes.Status403Forbidden.ToString());
			var apiRes = ApiResponse.Fail(statusCode, "Forbidden");

			var options = new JsonSerializerOptions
			{
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
			};

			var json = JsonSerializer.Serialize(apiRes, options);

			await context.Response.WriteAsync(json);
		}
	}
}