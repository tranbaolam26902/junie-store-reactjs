using FluentValidation;
using Store.WebAPI.Models.OrderModel;

namespace Store.WebAPI.Validations;

public class OrderValidator : AbstractValidator<OrderEditModel>
{
	public OrderValidator()
	{
		RuleFor(post => post.LastName)
			.NotEmpty().WithMessage("Họ không được để trống.")
			.MaximumLength(512).WithMessage("Họ không được nhiều hơn 512 ký tự.");

		RuleFor(post => post.FirstName)
			.NotEmpty().WithMessage("Tên không được để trống.")
			.MaximumLength(512).WithMessage("Tên không được nhiều hơn 512 ký tự.");

		RuleFor(s => s.Note)
			.MaximumLength(2048).WithMessage("Ghi chú không được nhiều hơn 2048 ký tự.");

		RuleFor(post => post.Phone)
			.NotEmpty().WithMessage("Số điện thoại không được để trống")
			.MaximumLength(12).WithMessage("Số điện thoại không được nhiều hơn 12 ký tự.");

		RuleFor(post => post.ShipAddress)
			.NotEmpty().WithMessage("Địa chỉ không được để trống.")
			.MaximumLength(1024).WithMessage("Địa chỉ không được nhiều hơn 1024 ký tự.");

		RuleFor(s => s.Email)
			.EmailAddress()
			.WithMessage("Không đúng định dạng email.")
			.NotEmpty()
			.WithMessage("Email không được để trống.");
	}
}