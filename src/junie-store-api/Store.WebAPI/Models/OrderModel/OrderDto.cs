using Store.Core.Entities;
using Store.WebAPI.Models.DiscountModel;

namespace Store.WebAPI.Models.OrderModel;

public class OrderDto
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

	public float DiscountPercentage { get; set; }

	public double Total => CalculateTotal();

	private double CalculateTotal()
	{
		var total = Details.Sum(s => s.Price * s.Quantity);
		if (DiscountPercentage > 0)
		{
			total *=  DiscountPercentage / 100;
		}

		return total;
	}

	public DiscountDto Discount { get; set; }
	public IList<OrderDetailDto> Details { get; set; }
}

public class OrderDetailDto
{
	public Guid OrderId { get; set; }

	public Guid ProductId { get; set; }

	public int Quantity { get; set; }

	public double Price { get; set; }

}