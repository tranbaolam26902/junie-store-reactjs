using FluentValidation;
using Store.WebAPI.Models.UserModel;

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

		RuleFor(s => s.Name)
			.NotEmpty()
			.WithMessage("Tên không được để trống.")
			.MaximumLength(128)
			.WithMessage("Tên không được nhiều hơn 128 ký tự.");

		RuleFor(s => s.Phone)
			.Matches(@"(84|0[3|5|7|8|9])+([0-9]{8})\b")
			.When(s => !string.IsNullOrWhiteSpace(s.Phone))
			.WithMessage("Không đúng định dạng số điện thoại.");

		RuleFor(s => s.Password)
			.NotEmpty().WithMessage("Mật khẩu không được để trống.")
			.MinimumLength(8).WithMessage("Mật khẩu phải có ít nhất 8 ký tự.");
	}
}