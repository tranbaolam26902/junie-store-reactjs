using Store.Core.Entities;

namespace Store.Core.DTO;

public class LoginResult
{
	public LoginStatus Status { get; set; }	

	public User User { get; set; }
}