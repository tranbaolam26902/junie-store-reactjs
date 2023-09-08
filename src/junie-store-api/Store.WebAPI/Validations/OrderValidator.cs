using FluentValidation;
using Store.WebAPI.Models.OrderModel;

namespace Store.WebAPI.Validations;

public class OrderValidator : AbstractValidator<OrderEditModel>
{
	public OrderValidator()
	{
		RuleFor(post => post.LastName)
			.NotEmpty().WithMessage("Last name cannot be left blank")
			.MaximumLength(512).WithMessage("Last name must not exceed 512 characters");

		RuleFor(post => post.FirstName)
			.NotEmpty().WithMessage("First name cannot be left blank")
			.MaximumLength(512).WithMessage("Full name must not exceed 512 characters");

		RuleFor(s => s.Note)
			.MaximumLength(2048).WithMessage("Note cannot exceed 2048 characters");

		RuleFor(post => post.ShipTel)
			.NotEmpty().WithMessage("Phone number cannot be left blank")
			.MaximumLength(512).WithMessage("Phone number must not exceed 512 characters");

		RuleFor(post => post.ShipAddress)
			.NotEmpty().WithMessage("Address cannot be left blank")
			.MaximumLength(1024).WithMessage("Address must not exceed 1024 characters");

		RuleFor(s => s.Email)
			.EmailAddress()
			.WithMessage("Invalid email format")
			.NotEmpty()
			.WithMessage("Email cannot be left blank");
	}
}