using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NLog.Web;
using Store.Core.Identity;
using Store.Data.Contexts;
using Store.Data.Seeder;
using Store.Services.Shops;
using Store.WebAPI.Media;
using Store.WebAPI.Middlewares;

namespace Store.WebAPI.Extensions;

public static class WebApplicationExtensions
{
	public static WebApplicationBuilder ConfigureServices(
		this WebApplicationBuilder builder)
	{
		builder.Services.AddMemoryCache();

		builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(option =>
				option.TokenValidationParameters = new TokenValidationParameters()
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = builder.Configuration["Jwt:Issuer"],
					ValidAudience = builder.Configuration["Jwt:Audience"],
					IssuerSigningKey = new SymmetricSecurityKey(
						Encoding.UTF8.GetBytes(
							builder.Configuration["Jwt:Key"] ?? ""))
				});

		builder.Services.AddAuthorization(options =>
		{
			options.AddPolicy("RequireAdminRole", policy =>
				policy.RequireRole(ClaimTypes.Role, "Admin"));
			options.AddPolicy("RequireManagerRole", policy =>
				policy.RequireRole(ClaimTypes.Role, "Manager"));
		});
		
		builder.Services.AddDbContext<StoreDbContext>(
				option =>
					option.UseSqlServer(
						builder.Configuration.GetConnectionString("DefaultConnection")));

		builder.Services.AddScoped<IMediaManager, LocalFileSystemMediaManager>();
		builder.Services.AddScoped<IDataSeeder, DataSeeder>();
		builder.Services.AddScoped<ICollectionRepository, CollectionRepository>();
		builder.Services.AddScoped<IUserRepository, UserRepository>();
		builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
		builder.Services.AddScoped<IOrderRepository, OrderRepository>();
		builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();
		builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();


		return builder;
	}

	public static WebApplicationBuilder ConfigureCors(
		this WebApplicationBuilder builder)
	{
		builder.Services.AddCors(option =>
			option.AddPolicy("StoreApp", policyBuilder =>
				policyBuilder
					.AllowAnyOrigin()
					.AllowAnyHeader()
					.AllowAnyMethod()));
		return builder;
	}

	public static WebApplicationBuilder ConfigureAuthentication(
		this WebApplicationBuilder builder)
	{
		builder.Services.AddSwaggerGen(c =>
		{
			c.SwaggerDoc("v1", new OpenApiInfo { Title = "Junie Store API", Version = "v1" });
			c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
			{
				Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
				Name = "Authorization",
				In = ParameterLocation.Header,
				Type = SecuritySchemeType.ApiKey,
				Scheme = "Bearer",
				BearerFormat = "JWT"
			});
			c.AddSecurityRequirement(new OpenApiSecurityRequirement
			{
				{
					new OpenApiSecurityScheme
					{
						Reference = new OpenApiReference
						{
							Type = ReferenceType.SecurityScheme,
							Id = "Bearer"
						}
					},
					new string[] { }
				}
			});
		});

		return builder;
	}



	public static WebApplicationBuilder ConfigureNLog(
		this WebApplicationBuilder builder)
	{
		builder.Logging.ClearProviders();
		builder.Host.UseNLog();

		return builder;
	}

	public static IApplicationBuilder UseDataSeeder(
		this IApplicationBuilder app)
	{
		using var scope = app.ApplicationServices.CreateScope();

		try
		{
			scope.ServiceProvider.GetRequiredService<IDataSeeder>().Initialize();
		}
		catch (Exception e)
		{
			scope.ServiceProvider.GetRequiredService<ILogger<Program>>()
				.LogError(e, "Count not insert data into database");
		}

		return app;
	}

	public static WebApplicationBuilder ConfigureSwaggerOpenApi(
		this WebApplicationBuilder builder)
	{
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		return builder;
	}

	public static WebApplication SetupContext(
		this WebApplication app)
	{
		app.Use(async (context, next) =>
		{
			context.Request.EnableBuffering(); // Enable buffering to allow reading the body multiple times

			var length = context.Request.ContentLength;
			if (length is > 0 and > 33554432) // Check if the length of the request body exceeds the limit
			{
				context.Response.StatusCode = StatusCodes.Status413RequestEntityTooLarge;
				await context.Response.WriteAsync("Request body too large");
				return;
			}

			await next();
		});

		return app;
	}

	public static WebApplication SetupMiddleware(
		this WebApplication app)
	{
		app.UseMiddleware<UnauthorizedMiddleware>();
		app.UseMiddleware<ForbiddenMiddleware>();

		return app;
	}

	public static WebApplication SetupRequestPipeline(
		this WebApplication app)
	{
		if (app.Environment.IsDevelopment())
		{
			app.UseSwagger();
			app.UseSwaggerUI();
		}

		app.UseStaticFiles();


		app.UseHttpsRedirection();

		app.UseAuthentication();
		app.UseAuthorization();

		app.UseCors("StoreApp");

		return app;
	}

}