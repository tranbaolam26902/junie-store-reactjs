using Store.Core.Entities;

namespace Store.Core.Queries;

public class OrderQuery : IOrderQuery
{
	public int? Year { get; set; } = 0;

	public int? Month { get; set; } = 0;

    public int? Day { get; set; } = 0;

    public OrderStatus? Status { get; set; } = OrderStatus.None;

    public string Keyword { get; set; } = "";
}