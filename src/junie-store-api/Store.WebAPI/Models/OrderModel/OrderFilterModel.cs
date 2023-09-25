using Store.Core.Entities;

namespace Store.WebAPI.Models.OrderModel;

public class OrderFilterModel : PagingModel
{
	public int? Year { get; set; }

	public int? Month { get; set; }

	public int? Day { get; set; }

	public OrderStatus? Status { get; set; }

	public string Keyword { get; set; }
}