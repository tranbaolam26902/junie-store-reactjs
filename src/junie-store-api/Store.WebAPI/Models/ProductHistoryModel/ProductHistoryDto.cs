using Store.Core.Entities;

namespace Store.WebAPI.Models.ProductHistoryModel;

public class ProductHistoryDto
{
	public Guid Id { get; set; }

	public Guid ProductId { get; set; }

	public Guid UserId { get; set; }

	public DateTime ActionTime { get; set; }

	public ProductHistoryAction HistoryAction { get; set; }

	public string Note { get; set; }
}