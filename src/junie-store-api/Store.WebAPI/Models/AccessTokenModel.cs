using Store.WebAPI.Models.UserModel;

namespace Store.WebAPI.Models;

public class AccessTokenModel
{
	public string Token { get; set; }

	public string TokenType { get; set; } = "bearer";

	public DateTime ExpiresToken { get; set; } = DateTime.Now;

	public UserDto UserDto { get; set; }
}