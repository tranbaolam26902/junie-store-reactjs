using FluentValidation.Results;
using Store.WebAPI.Models;

namespace Store.WebAPI.Extensions;

public static class ValidationResultExtensions
{
	public static ValidationFailureResponse ToResponse(
		this ValidationResult validationResult)
	{
		return validationResult.Errors.ToResponse();
	}

	public static ValidationFailureResponse ToResponse(
		this IEnumerable<ValidationFailure> failures)
	{
		return new ValidationFailureResponse(
			failures.Select(s => s.ErrorMessage));
	}

	public static IList<string> GetErrorMessage(
		this ValidationResult validationResult)
	{
		return validationResult.Errors.GetErrorMessage();
	}

	public static IList<string> GetErrorMessage(
		this IEnumerable<ValidationFailure> failures)
	{
		return failures.Select(s => s.ErrorMessage).ToList();
	}

	public static IDictionary<string, List<string>> GetErrorsWithPropertyNames(
		this ValidationResult validationResult)
	{
		return validationResult.Errors.GetErrorsWithPropertyNames();
	}

	public static IDictionary<string, List<string>> GetErrorsWithPropertyNames(
		this IEnumerable<ValidationFailure> failures)
	{
		return failures
			.GroupBy(e => e.PropertyName)
			.ToDictionary(
				g => g.Key,
				g => g.Select(e => e.ErrorMessage).ToList());
	}
}