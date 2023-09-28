using FluentValidation;
using Store.WebAPI.Models.SupplierModel;
using System.Text.RegularExpressions;

namespace Store.WebAPI.Validations;

public class SupplierValidator : AbstractValidator<SupplierEditModel>
{
	public SupplierValidator()
	{
		RuleFor(s => s.Email)
			.EmailAddress().WithMessage("Không đúng định dạng email.");

		RuleFor(s => s.Name)
			.NotEmpty().WithMessage("Tên công ty không được để trống");

		RuleFor(s => s.ContactName)
			.NotEmpty().WithMessage("Tên đối tác không được để trống");


		RuleFor(post => post.Phone)
			.NotEmpty().WithMessage("Số điện thoại không được để trống")
			.MaximumLength(12).WithMessage("Số điện thoại không được nhiều hơn 12 ký tự.")
			.Must(BeAValidPhoneNumber).WithMessage("Số điện thoại không đúng định dạng.");
	}

	private bool BeAValidPhoneNumber(string phone)
	{
		// Define the regular expression pattern for a valid username (no spaces)
		string pattern = @"(84|0[3|5|7|8|9])+([0-9]{8})\b";

		// Use Regex.IsMatch to check if the username matches the pattern
		return Regex.IsMatch(phone, pattern);
	}
}