using System.IdentityModel.Tokens.Jwt;
using System.Net;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Collections;
using Store.Core.Entities;
using Store.Core.Queries;
using Store.Services.Shops;
using Store.WebAPI.Filters;
using Store.WebAPI.Identities;
using Store.WebAPI.Models;
using Store.WebAPI.Models.UserModel;

namespace Store.WebAPI.Endpoints;

public static class UserEndpoints
{
	public static WebApplication MapAccountEndpoints(
		this WebApplication app)
	{
		var builder = app.MapGroup("/api/account");

		#region Get Method

		builder.MapGet("/refreshToken", RefreshToken)
			.WithName("RefreshToken")
			.AllowAnonymous()
			.Produces<ApiResponse<AccessTokenModel>>();

		builder.MapGet("/logout", Logout)
			.WithName("DeleteRefreshTokenAsync")
			.AllowAnonymous();

		builder.MapGet("/getUsers", GetUsers)
			.WithName("GetUsers")
			.RequireAuthorization("RequireAdminRole")
			.Produces<ApiResponse<PaginationResult<UserDto>>>();

		builder.MapGet("/roles", GetRoles)
			.WithName("GetRolesAsync")
			.Produces<ApiResponse<IList<RoleDto>>>()
			.RequireAuthorization("RequireAdminRole")
			.Produces(StatusCodes.Status401Unauthorized)
			.Produces(StatusCodes.Status403Forbidden);

		builder.MapGet("/getProfile", GetProfile)
			.WithName("GetProfile")
			.RequireAuthorization()
			.Produces<ApiResponse<UserDto>>();

		#endregion

		#region Post Method

		builder.MapPost("/login", Login)
			.WithName("LoginAsync")
			.AllowAnonymous()
			.Produces<ApiResponse<AccessTokenModel>>();

		builder.MapPost("/register", Register)
			.WithName("RegisterAsync")
			.AddEndpointFilter<ValidatorFilter<RegisterModel>>()
			.Produces<ApiResponse<UserDto>>();

		#endregion

		#region Put Method

		builder.MapPut("/updateUserRoles", UpdateUserRoles)
			.WithName("UpdateUserRoles")
			.RequireAuthorization("RequireAdminRole")
			.Produces<ApiResponse<UserDto>>()
			.Produces(StatusCodes.Status401Unauthorized)
			.Produces(StatusCodes.Status403Forbidden);

		builder.MapPut("/updateProfile", UpdateProfile)
			.WithName("UpdateProfile")
			//.AddEndpointFilter<ValidatorFilter<UserEditModel>>()
			.RequireAuthorization()
			.Produces<ApiResponse<UserDto>>();

		builder.MapPut("/changePassword", ChangePassword)
			.WithName("ChangePassword")
			.AddEndpointFilter<ValidatorFilter<PasswordEditModel>>()
			.RequireAuthorization()
			.Produces<ApiResponse<PaginationResult<UserDto>>>();

		#endregion

		return app;

	}

	private static async Task<IResult> Login(
		HttpContext context,
		[FromBody] UserLoginModel model,
		[FromServices] IUserRepository repository,
		[FromServices] IConfiguration configuration,
		[FromServices] IMapper mapper)
	{
		// Authenticate user with provided username and password

		var user = mapper.Map<User>(model);
		var result = await user.Authenticate(repository);

		// Retrieve user DTO object from task result

		// Check if authentication was successful
		if (result.Status == LoginStatus.Success)
		{
			var userDto = mapper.Map<UserDto>(result.User);

			// Generate a new access token and refresh token
			var token = userDto.Generate(configuration);
			var refreshToken = IdentityManager.GenerateRefreshToken();

			// Set the new refresh token in the HTTP response's cookies
			await repository.SetRefreshToken(userDto.Id, refreshToken, context);

			// Return the new access token
			var accessToken = new AccessTokenModel()
			{
				Token = new JwtSecurityTokenHandler().WriteToken(token),
				UserDto = userDto,
			};

			return Results.Ok(ApiResponse.Success(accessToken));
		}


		// Return error response
		return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, IdentityManager.LoginResult(result.Status)));
	}

	private static async Task<IResult> RefreshToken(
		HttpContext context,
		[FromServices] IUserRepository repository,
		[FromServices] IMapper mapper,
		[FromServices] IConfiguration configuration)
	{
		try
		{
			// Check if the incoming request has a valid refresh token
			var refreshToken = context.Request.Cookies["refreshToken"];

			// Retrieve user information using the refresh token
			var user = await repository.GetUserRefreshTokenAsync(refreshToken);

			// Handle different cases depending on the validity of the refresh token
			if (user == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.Unauthorized, "Refresh Token không tồn tại."));
			}
			else if (user.UserLogin.TokenExpires < DateTime.Now)
			{
				var lastLoginDate = user.UserLogin.TokenExpires;
				var currentDate = DateTime.Now;

				var daysSinceLastLogin = (currentDate - lastLoginDate).Days;
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.Unauthorized, $"Token đã hết hạn vào {daysSinceLastLogin} ngày trước."));
			}

			// Generate a new access token and refresh token
			var userDto = mapper.Map<UserDto>(user);
			var token = userDto.Generate(configuration);
			var newRefreshToken = IdentityManager.GenerateRefreshToken();

			// Set the new refresh token in the HTTP response's cookies
			await repository.SetRefreshToken(userDto.Id, newRefreshToken, context);

			// Return the new access token
			var accessToken = new AccessTokenModel()
			{
				Token = new JwtSecurityTokenHandler().WriteToken(token),
				UserDto = userDto,
			};

			return Results.Ok(ApiResponse.Success(accessToken));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> Logout(
		HttpContext context,
		[FromServices] IUserRepository repository)
	{
		try
		{
			var refreshToken = context.Request.Cookies["refreshToken"];

			if (await repository.GetRefreshTokenAsync(refreshToken) != null)
			{
				await repository.DeleteRefreshTokenAsync(refreshToken);
				context.Response.Cookies.Delete("refreshToken");
				return Results.Ok(ApiResponse.Success("Cookie đã được xóa."));
			}
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Cookie không tồn tại."));

		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> ChangePassword(
		PasswordEditModel model,
		HttpContext context,
		[FromServices] IUserRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var identity = context.GetCurrentUser();
			var user = await repository.GetUserByIdAsync(identity.Id, true);


			if (await repository.ChangePasswordAsync(user, model.OldPassword, model.NewPassword))
			{
				var userDto = mapper.Map<UserDto>(user);
				return Results.Ok(ApiResponse.Success(userDto));
			}
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Mật khẩu không chính xác."));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> Register(
		[FromBody] RegisterModel model,
		[FromServices] IUserRepository repository,
		[FromServices] IConfiguration configuration,
		[FromServices] IMapper mapper)
	{
		try
		{
			var user = mapper.Map<User>(model);

			var userExist = await repository.IsUserExistedAsync(user.Username);
			if (userExist)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Tài khoản đã tồn tại."));
			}

			var newUser = await repository.RegisterAsync(user);

			var userDto = mapper.Map<UserDto>(newUser);

			return Results.Ok(ApiResponse.Success(userDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> UpdateUserRoles(
		[FromBody] UserRolesEditModel model,
		[FromServices] IUserRepository repository,
		[FromServices] IConfiguration configuration,
		[FromServices] IMapper mapper)
	{
		try
		{
			var user = await repository.GetUserByIdAsync(model.UserId, true);
			if (user == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Tài khoản không tồn tại."));
			}

			var newUser = await repository.SetUserRolesAsync(user.Id, model.RoleIdList);

			var userDto = mapper.Map<UserDto>(newUser);

			return Results.Ok(ApiResponse.Success(userDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> UpdateProfile(
		UserEditModel model,
		HttpContext context,
		[FromServices] IUserRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var identity = IdentityManager.GetCurrentUser(context);

			var user = await repository.GetUserByIdAsync(identity.Id);

			mapper.Map(model, user);

			var result = await repository.UpdateProfileAsync(user);

			if (result == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Cập nhật thất bại."));
			}

			var userDto = mapper.Map<UserDto>(user);
			return Results.Ok(ApiResponse.Success(userDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetUsers(
		[AsParameters] UserFilterModel model,
		[FromServices] IUserRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var userQuery = mapper.Map<UserQuery>(model);

			var userList = await repository.GetPagedUsersAsync(
				userQuery,
				model,
				p => p.ProjectToType<UserDto>());

			return Results.Ok(ApiResponse.Success(userList));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetProfile(
		HttpContext context,
		[FromServices] IUserRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var identity = context.GetCurrentUser();

			var user = await repository.GetUserByIdAsync(identity.Id);
			var userDto = mapper.Map<UserDto>(user);

			return Results.Ok(ApiResponse.Success(userDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetRoles(
		[FromServices] IUserRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var roles = await repository.GetRolesAsync();
			var listRoles = mapper.Map<IList<RoleDto>>(roles);

			return Results.Ok(ApiResponse.Success(listRoles));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}