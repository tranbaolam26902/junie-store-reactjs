using FluentValidation;
using Store.WebAPI.Models;
using System.Net;

namespace Store.WebAPI.Filters;

public class ValidatorFilter<T> : IEndpointFilter where T : class
{
	private readonly IValidator<T> _validator;

	public ValidatorFilter(IValidator<T> validator)
	{
		_validator = validator;
	}

	public async ValueTask<object> InvokeAsync(
		EndpointFilterInvocationContext context,
		EndpointFilterDelegate next)
	{
		var model = context.Arguments
			.SingleOrDefault(s => s?.GetType() == typeof(T)) as T;

		if (model == null)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, new[]
			{
				"Could not create model object"
			}));
		}

		var validationResult = await _validator.ValidateAsync(model);

		if (!validationResult.IsValid)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest,
				validationResult));
		}

		return await next(context);
	}
}