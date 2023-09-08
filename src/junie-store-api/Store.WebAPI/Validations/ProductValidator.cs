using FluentValidation;
using Store.WebAPI.Models.ProductModel;

namespace Store.WebAPI.Validations;

public class ProductValidator : AbstractValidator<ProductEditModel>
{
	public ProductValidator()
	{
		RuleFor(s => s.EditReason)
			.NotEmpty()
			.WithMessage("Edit reason must be not empty.")
			.MaximumLength(2048)
			.WithMessage("Edit reason must not exceed 2048 character.");

		RuleFor(s => s.Name)
			.NotEmpty()
			.WithMessage("Name must be not empty.")
			.MaximumLength(128)
			.WithMessage("Name must not exceed 128 character.");

		RuleFor(s => s.ShortIntro)
			.MaximumLength(256)
			.WithMessage("Name must not exceed 256 character.");

		RuleFor(s => s.Description)
			.MaximumLength(2048)
			.WithMessage("Name must not exceed 2048 character.");

		RuleFor(s => s.Note)
			.MaximumLength(2048)
			.WithMessage("Note must not exceed 2048 character.");
	}
}