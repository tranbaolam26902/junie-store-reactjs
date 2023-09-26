using Store.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Core.DTO;

public class OrderItem
{
	public Guid Id { get; set; }

	public DateTime OrderDate { get; set; }

	public string CodeOrder { get; set; }

	public Guid UserId { get; set; }

	public OrderStatus Status { get; set; }

	public string Name { get; set; }

	public string Email { get; set; }

	public string ShipAddress { get; set; }

	public string Phone { get; set; }

	public string Note { get; set; }

	public float DiscountAmount { get; set; }

	public bool IsDiscountPercentage { get; set; }

	public double Total => CalculateTotal();

	private double CalculateTotal()
	{
		var total = Details.Sum(s => s.Price * s.Quantity);
		if (!IsDiscountPercentage)
		{
			total -= DiscountAmount;
		}
		else if (DiscountAmount > 0)
		{
			total *= 1 - (DiscountAmount / 100);
		}

		return total;
	}

	// ======================================================
	// Navigation properties
	// ======================================================

	public IList<OrderDetail> Details { get; set; }

	public OrderItem(Order o)
	{
		Id = o.Id;
		OrderDate = o.OrderDate;
		CodeOrder = o.CodeOrder;
		UserId = o.UserId;
		Status = o.Status;
		Name = o.Name;
		Email = o.Email;
		ShipAddress = o.ShipAddress;
		Phone = o.Phone;
		Note = o.Note;
		DiscountAmount = o.DiscountAmount;
		IsDiscountPercentage = o.IsDiscountPercentage;
		Details = o.Details;
	}
}