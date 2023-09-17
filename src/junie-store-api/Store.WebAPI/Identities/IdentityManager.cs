using MapsterMapper;
using Microsoft.IdentityModel.Tokens;
using Store.Services.Shops;
using Store.WebAPI.Models.UserModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Store.Core.Collections;
using Store.Core.Contracts;
using Store.Core.DTO;
using Store.Core.Entities;

namespace Store.WebAPI.Identities;

public static class IdentityManager
{
	public static UserDto GetCurrentUser(this
		HttpContext context)
	{
		if (context.User.Identity is ClaimsIdentity identity)
		{
			var userClaims = identity.Claims;

			return new UserDto
			{
				Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
				Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
				Name = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value,
				Id = Guid.Parse(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Sid)?.Value),
				RoleName = userClaims.Where(c => c.Type == ClaimTypes.Role)
					.Any(c => c.Value == "Admin") ? "Admin" : "Manager"

			};
		}
		return null;
	}

	public static JwtSecurityToken Generate(this
		UserDto user,
		IConfiguration config)
	{
		var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"] ?? ""));
		var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

		var claims = new List<Claim>()
		{
			new Claim(ClaimTypes.Sid, user.Id.ToString()),
			new Claim(ClaimTypes.NameIdentifier, user.Username),
			new Claim(ClaimTypes.Email, user.Email),
			new Claim(ClaimTypes.Name, user.Name),
		};

		foreach (var role in user.Roles)
		{
			claims.Add(new Claim(ClaimTypes.Role, role.Name));
		}

		var token = new JwtSecurityToken(config["Jwt:Issuer"],
			config["Jwt:Audience"],
			claims,
			expires: DateTime.Now.AddMinutes(15),
			signingCredentials: credentials);

		return token;
	}

	public static async Task<LoginResult> Authenticate(this User userLogin, IUserRepository repository)
	{
		return await repository.LoginAsync(userLogin);
	}

	public static string LoginResult(this LoginStatus status)
	{
		if (status == LoginStatus.UserName)
		{
			return "Tên đăng nhập không chính xác.";
		}

		return "Mật khẩu không chính xác.";
	}

	public static RefreshToken GenerateRefreshToken()
	{
		var refreshToken = new RefreshToken
		{
			Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
			Expires = DateTime.Now.AddDays(15),
			Created = DateTime.Now
		};

		return refreshToken;
	}

	public static async Task SetRefreshToken(
		this IUserRepository repository,
		Guid userId,
		RefreshToken newRefreshToken,
		HttpContext context)
	{
		// Sets the options for the refresh token cookie
		var cookieOptions = new CookieOptions()
		{
			HttpOnly = true,
			Expires = newRefreshToken.Expires,
			Secure = true,
			SameSite = SameSiteMode.None,
			Domain = "localhost"

		};

		// Adds the refresh token to the response cookies with the specified options
		context.Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

		// Sets the refresh token in the database for the specified user
		await repository.SetRefreshTokenAsync(userId, newRefreshToken);
	}
}