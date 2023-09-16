﻿using Store.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

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

	public double Total => CalculateTotal();

	private double CalculateTotal()
	{
		var total = Details.Sum(s => s.Price);
		if (Discount != null)
		{
			total *=  Discount.DiscountPercentage / 100;
		}

		return total;
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