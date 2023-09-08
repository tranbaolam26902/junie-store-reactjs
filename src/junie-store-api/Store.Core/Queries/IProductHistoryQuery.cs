using Store.Core.Entities;

namespace Store.Core.Queries;

public interface IProductHistoryQuery
{
	public string Keyword { get; set; }

	public Guid ProductId { get; set; }

	public Guid UserId { get; set; }

	public int? Day { get; set; }

	public int? Month { get; set; }

	public int? Year { get; set; }

	public ProductHistoryAction Action { get; set; }
}