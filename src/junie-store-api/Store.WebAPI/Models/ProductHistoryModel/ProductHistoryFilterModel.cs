using Store.Core.Entities;

namespace Store.WebAPI.Models.ProductHistoryModel;

public class ProductHistoryFilterModel : PagingModel
{
	public string Keyword { get; set; } = "";
	public Guid? ProductId { get; set; }
	public Guid? UserId { get; set; }
	public int? Day { get; set; } = 0;
	public int? Month { get; set; } = 0;
	public int? Year { get; set; } = 0;
	public ProductHistoryAction? Action { get; set; } = ProductHistoryAction.None;
}