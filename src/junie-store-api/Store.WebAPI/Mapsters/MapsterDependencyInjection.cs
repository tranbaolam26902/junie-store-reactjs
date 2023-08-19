using Mapster;
using MapsterMapper;

namespace Store.WebAPI.Mapsters;

public static class MapsterDependencyInjection
{
	public static WebApplicationBuilder ConfigureMapster(
		this WebApplicationBuilder builder)
	{
		var config = TypeAdapterConfig.GlobalSettings;

		config.Scan(typeof(MapsterConfiguration).Assembly);

		builder.Services.AddSingleton(config);
		builder.Services.AddScoped<IMapper, ServiceMapper>();

		return builder;
	}
}