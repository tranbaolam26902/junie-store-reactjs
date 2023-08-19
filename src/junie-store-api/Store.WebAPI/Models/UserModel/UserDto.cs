namespace Store.WebAPI.Models.UserModel;

public class UserDto
{
	public Guid Id { get; set; }

	public string Name { get; set; }

	public string Email { get; set; }

	public string Username { get; set; }

	public string Phone { get; set; }

	public string Address { get; set; }

	public DateTime CreatedDate { get; set; }

	public IList<RoleDto> Roles { get; set; }

	public string RoleName { get; set; }
}

public class RoleDto
{
	public Guid Id { get; set; }
	public string Name { get; set; }
}

public class UserLoginModel
{
	public string Username { get; set; }
	public string Password { get; set; }
}