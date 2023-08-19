using FluentValidation.AspNetCore;
using FluentValidation;
using System.Reflection;

namespace Store.WebAPI.Validations;

public static class FluentValidationDependencyInjection
{
	public static WebApplicationBuilder ConfigureFluentValidation(this WebApplicationBuilder builder)
	{
		builder.Services.AddFluentValidationClientsideAdapters();

		builder.Services.AddValidatorsFromAssembly(
			Assembly.GetExecutingAssembly());

		return builder;
	}
}