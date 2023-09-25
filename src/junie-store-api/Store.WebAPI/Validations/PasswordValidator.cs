using FluentValidation;
using Store.WebAPI.Models.ProductModel;
using Store.WebAPI.Models.UserModel;

namespace Store.WebAPI.Validations;

public class PasswordValidator : AbstractValidator<PasswordEditModel>
{
	public PasswordValidator()
	{
		RuleFor(s => s.ConfirmPassword)
			.NotEmpty().WithMessage("Mật khẩu không được để trống");

		RuleFor(s => s.NewPassword)
			.NotEmpty().WithMessage("Mật khẩu mới không được để trống");

		RuleFor(s => s.ConfirmPassword)
			.NotEmpty().WithMessage("Xác nhận mật khẩu không được để trống");
	}
}