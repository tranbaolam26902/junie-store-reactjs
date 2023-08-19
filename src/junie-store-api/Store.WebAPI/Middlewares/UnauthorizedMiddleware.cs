using Store.WebAPI.Models;
using System.Net;
using System.Text.Json;

namespace Store.WebAPI.Middlewares;

public class UnauthorizedMiddleware
{
	private readonly RequestDelegate _next;

	public UnauthorizedMiddleware(RequestDelegate next)
	{
		_next = next;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		await _next(context);

		if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
		{
			context.Response.ContentType = "application/json";
			context.Response.StatusCode = StatusCodes.Status401Unauthorized;

			// Your custom error message
			var statusCode = (HttpStatusCode)Enum.Parse(typeof(HttpStatusCode), StatusCodes.Status401Unauthorized.ToString());
			var apiRes = ApiResponse.Fail(statusCode, "Unauthorized");

			var options = new JsonSerializerOptions
			{
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
			};

			var json = JsonSerializer.Serialize(apiRes, options);

			await context.Response.WriteAsync(json);
		}
	}
}