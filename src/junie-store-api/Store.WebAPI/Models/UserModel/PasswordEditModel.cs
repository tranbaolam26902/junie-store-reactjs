namespace Store.WebAPI.Models.UserModel;

public class PasswordEditModel
{
	public string OldPassword { get; set; }
	public string NewPassword { get; set; }
	public string ConfirmPassword { get; set; }
}