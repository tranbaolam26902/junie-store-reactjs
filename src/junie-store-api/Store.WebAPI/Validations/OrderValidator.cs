using FluentValidation;
using Store.WebAPI.Models.OrderModel;

namespace Store.WebAPI.Validations;

public class OrderValidator : AbstractValidator<OrderEditModel>
{
	public OrderValidator()
	{
		RuleFor(post => post.LastName)
			.NotEmpty().WithMessage("Họ không được bỏ trống")
			.MaximumLength(500).WithMessage("Họ tên đề không được nhiều hơn 500 ký tự");

		RuleFor(post => post.FirstName)
			.NotEmpty().WithMessage("Tên không được bỏ trống")
			.MaximumLength(500).WithMessage("Họ tên đề không được nhiều hơn 500 ký tự");

		RuleFor(s => s.Note)
			.MaximumLength(2000).WithMessage("Ghi chú không được nhiều hơn 2000 ký tự");

		RuleFor(post => post.ShipTel)
			.NotEmpty().WithMessage("Số điện thoại không được bỏ trống")
			.MaximumLength(500).WithMessage("Họ tên đề không được nhiều hơn 500 ký tự");

		RuleFor(post => post.ShipAddress)
			.NotEmpty().WithMessage("Địa chỉ không được bỏ trống")
			.MaximumLength(500).WithMessage("Họ tên đề không được nhiều hơn 500 ký tự");

		RuleFor(s => s.Email)
			.EmailAddress()
			.WithMessage("Không đúng định dạng email")
			.NotEmpty()
			.WithMessage("Email không được bỏ trống");
		
	}
}