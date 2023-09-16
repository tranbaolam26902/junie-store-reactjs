namespace Store.Core.Entities;

public class OrderDetail
{
	public Guid OrderId { get; set; }

	public Guid ProductId { get; set; }
	
	public double Price { get; set; }

	public int Quantity { get; set; }

	public double TotalPrice
	{
		get
		{
			if (Order.Discount != null)
			{
				return Math.Round(Price * Quantity * (1 - Order.Discount.DiscountPercentage), 2);
			}
			return Math.Round(Price * Quantity, 2);
		}
	}

	// ======================================================
	// Navigation properties
	// ======================================================


	public Order Order { get; set; }
	
	public Product Product { get; set; }
}