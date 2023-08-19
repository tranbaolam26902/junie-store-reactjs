using System.Net;
using FluentValidation.Results;

namespace Store.WebAPI.Models;

public class ApiResponse
{
	public bool IsSuccess => Errors.Count == 0;

	public HttpStatusCode StatusCode { get; init; }

	public IList<string> Errors { get; init; }

	protected ApiResponse()
	{
		StatusCode = HttpStatusCode.OK;
		Errors = new List<string>();
	}

	public static ApiResponse<T> Success<T>(
		T result,
		HttpStatusCode statusCode = HttpStatusCode.OK)
	{
		return new ApiResponse<T>
		{
			Result = result,
			StatusCode = statusCode
		};
	}

	public static ApiResponse<T> FailWithResult<T>(
		HttpStatusCode statusCode,
		T result,
		params string[] errorMessages)
	{
		return new ApiResponse<T>
		{
			Result = result,
			StatusCode = statusCode,
			Errors = new List<string>(errorMessages)
		};
	}

	public static ApiResponse Fail(
		HttpStatusCode statusCode,
		params string[] errorMessages)
	{
		if (errorMessages == null || errorMessages.Length == 0)
		{
			throw new ArgumentException(nameof(errorMessages));
		}

		return new ApiResponse()
		{
			StatusCode = statusCode,
			Errors = new List<string>(errorMessages)
		};
	}

	public static ApiResponse Fail(
		HttpStatusCode statusCode,
		ValidationResult validationResult)
	{
		return Fail(statusCode, validationResult.Errors
			.Select(s => s.ErrorMessage)
			.Where(e => !string.IsNullOrWhiteSpace(e))
			.ToArray());
	}
}

public class ApiResponse<T> : ApiResponse
{
	public T Result { get; set; }
}