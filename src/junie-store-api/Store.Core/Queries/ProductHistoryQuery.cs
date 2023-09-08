using Store.Core.Entities;

namespace Store.Core.Queries;

public class ProductHistoryQuery : IProductHistoryQuery
{
	public string Keyword { get; set; } = "";
	public Guid ProductId { get; set; } = Guid.Empty;
	public Guid UserId { get; set; } = Guid.Empty;
	public int? Day { get; set; } = 0;
	public int? Month { get; set; } = 0;
	public int? Year { get; set; } = 0;
	public ProductHistoryAction Action { get; set; } = ProductHistoryAction.None;
}