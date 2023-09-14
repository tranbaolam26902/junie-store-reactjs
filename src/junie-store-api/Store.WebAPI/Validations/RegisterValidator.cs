using FluentValidation;
using Store.WebAPI.Models.UserModel;
using System.Text.RegularExpressions;

namespace Store.WebAPI.Validations;

public class RegisterValidator : AbstractValidator<RegisterModel>
{
	public RegisterValidator()
	{

		RuleFor(s => s.Email)
			.EmailAddress()
			.WithMessage("Email không đúng định dạng")
			.NotEmpty()
			.WithMessage("Email không được để trống.");

		RuleFor(s => s.Username)
			.NotEmpty()
			.WithMessage("Tên đăng nhập không được để trống.")
			.MaximumLength(128)
			.WithMessage("Tên đăng nhập không được nhiều hơn 128 ký tự.")
			.Must(BeAValidUsername).WithMessage("Tên đăng nhập không hợp lệ."); ;

		RuleFor(s => s.Password)
			.NotEmpty().WithMessage("Mật khẩu không được để trống.")
			.MinimumLength(8).WithMessage("Mật khẩu phải có ít nhất 8 ký tự.");
	}

	private bool BeAValidUsername(string username)
	{
		// Define the regular expression pattern for a valid username (no spaces)
		string pattern = @"^\S+$";

		// Use Regex.IsMatch to check if the username matches the pattern
		return Regex.IsMatch(username, pattern);
	}
}