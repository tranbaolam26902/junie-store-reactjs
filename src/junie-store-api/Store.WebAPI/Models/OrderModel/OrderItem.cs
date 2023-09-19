using Store.Core.Entities;
using Store.WebAPI.Models.DiscountModel;

namespace Store.WebAPI.Models.OrderModel;

public class OrderItem
{
	public Guid Id { get; set; }

	public string CodeOrder { get; set; }

	public DateTime OrderDate { get; set; }

	public OrderStatus Status { get; set; }

	public string Name { get; set; }

	public string Email { get; set; }

	public string ShipAddress { get; set; }

	public string Phone { get; set; } // Số điện thoại người nhận

	public string Note { get; set; }

	public double Total => CalculateTotal();

	private double CalculateTotal()
	{
		var total = Details.Sum(s => s.Price);
		if (Discount != null)
		{
			total *= Discount.DiscountPercentage / 100;
		}

		return total;
	}

	public DiscountDto Discount { get; set; }
	public IList<OrderDetailItem> Details { get; set; }
}

public class OrderDetailItem : OrderDetailDto
{
	public string Name { get; set; }

	public string Sku { get; set; }
}