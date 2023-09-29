using System.ComponentModel.DataAnnotations.Schema;
using Store.Core.Contracts;

namespace Store.Core.Entities;

public enum OrderStatus
{
	None,
	New, //Đơn hàng mới
	Approved, // Đã xác nhận 
	Shipping, // Đang giao hàng
	Success, // Giao thành công
	Returned, // Trả hàng
	Cancelled, // Đơn đã hủy
}

public class Order : IEntity
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

	[NotMapped]
	public double Total { get; set; }

	// ======================================================
	// Navigation properties
	// ======================================================

	public User User { get; set; }
	public Discount Discount { get; set; }
	public IList<OrderDetail> Details { get; set; }
}