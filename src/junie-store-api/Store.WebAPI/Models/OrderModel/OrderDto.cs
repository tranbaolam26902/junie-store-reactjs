using Store.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.WebAPI.Models.OrderModel;

public class OrderDto
{
	public Guid Id { get; set; }
	public DateTime OrderDate { get; set; }

	public string UrlSlug { get; set; }

	public OrderStatus Status { get; set; }

	public string FirstName { get; set; }

	public string LastName { get; set; }

	public string Email { get; set; }

	public string ShipAddress { get; set; }

	public string ShipTel { get; set; } // Số điện thoại người nhận

	public string Note { get; set; }

	public double Total { get { return CalculateTotal(); } }

	private double CalculateTotal()
	{
		return Details.Sum(s => s.Price);
	}

	public DiscountDto Discount { get; set; }
	public IList<OrderDetailDto> Details { get; set; }
}

public class DiscountDto
{
	public Guid Id { get; set; }

	public int Quantity { get; set; }

	public float MinPrice { get; set; }

	public DateTime ExpiryDate { get; set; }

	public string Code { get; set; }

	public float DiscountPercentage { get; set; }
}

public class OrderDetailDto
{
	public Guid OrderId { get; set; }

	public Guid ProductId { get; set; }

	public int Quantity { get; set; }

	public double Price { get; set; }

}