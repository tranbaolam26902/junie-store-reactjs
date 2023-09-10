namespace Store.WebAPI.Models.UserModel;

public class RegisterModel
{
	public string Name { get; set; }

	public string Email { get; set; }

	public string Password { get; set; }

	public string Username { get; set; }

	public string Phone { get; set; }

	public string Address { get; set; }
}

public class UserRolesEditModel
{
	public Guid UserId { get; set; }

	public IList<Guid> RoleIdList { get; set; }
}