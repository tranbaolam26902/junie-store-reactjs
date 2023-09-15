using FluentValidation;
using Store.WebAPI.Models.ProductModel;

namespace Store.WebAPI.Validations;

public class ProductValidator : AbstractValidator<ProductEditModel>
{
	public ProductValidator()
	{
		RuleFor(s => s.EditReason)
			.NotEmpty()
			.WithMessage("Lý do không được để trống.")
			.MaximumLength(2048)
			.WithMessage("Lý do không được vượt quá 2048 ký tự.");

		RuleFor(s => s.Name)
			.NotEmpty()
			.WithMessage("Tên sản phẩm không được để trống.")
			.MaximumLength(128)
			.WithMessage("Tên sản phẩm không được nhiều hơn 128 ký tự.");

		RuleFor(s => s.Instruction)
			.MaximumLength(2048)
			.WithMessage("Hướng dẫn không được nhiều hơn 2048 ký tự.");

		RuleFor(s => s.Description)
			.MaximumLength(2048)
			.WithMessage("Mô tả không được nhiều hơn 2048 ký tự.");

		RuleFor(s => s.Note)
			.MaximumLength(2048)
			.WithMessage("Ghi chú không được nhiều hơn 2048 ký tự.");
	}
}