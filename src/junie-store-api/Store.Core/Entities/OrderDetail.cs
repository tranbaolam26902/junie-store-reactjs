using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Core.Entities;

public class OrderDetail
{
	public Guid OrderId { get; set; }

	public Guid ProductId { get; set; }
	
	public double Price { get; set; }

	public int Quantity { get; set; }

	[NotMapped]
	public double TotalPrice => Math.Round(Price * Quantity, 2);

	// ======================================================
	// Navigation properties
	// ======================================================


	public Order Order { get; set; }
	
	public Product Product { get; set; }
}