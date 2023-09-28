using System.Text.RegularExpressions;
using FluentValidation;
using Store.WebAPI.Models.OrderModel;

namespace Store.WebAPI.Validations;

public class OrderValidator : AbstractValidator<OrderEditModel>
{
	public OrderValidator()
	{
		RuleFor(post => post.Name)
			.NotEmpty().WithMessage("Tên không được để trống.")
			.MaximumLength(512).WithMessage("Tên không được nhiều hơn 512 ký tự.");

		RuleFor(s => s.Note)
			.MaximumLength(2048).WithMessage("Ghi chú không được nhiều hơn 2048 ký tự.");

		RuleFor(post => post.Phone)
			.NotEmpty().WithMessage("Số điện thoại không được để trống")
			.MaximumLength(12).WithMessage("Số điện thoại không được nhiều hơn 12 ký tự.")
			.Must(BeAValidPhoneNumber).WithMessage("Số điện thoại không đúng định dạng.");

		RuleFor(post => post.ShipAddress)
			.NotEmpty().WithMessage("Địa chỉ không được để trống.")
			.MaximumLength(1024).WithMessage("Địa chỉ không được nhiều hơn 1024 ký tự.");
		
	}

	private bool BeAValidPhoneNumber(string phone)
	{
		// Define the regular expression pattern for a valid username (no spaces)
		string pattern = @"(84|0[3|5|7|8|9])+([0-9]{8})\b";

		// Use Regex.IsMatch to check if the username matches the pattern
		return Regex.IsMatch(phone, pattern);
	}
}