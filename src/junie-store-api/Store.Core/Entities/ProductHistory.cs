using System.Security.Principal;
using Store.Core.Contracts;

namespace Store.Core.Entities;

public enum ProductHistoryAction
{
	None,
	Create,
	Delete,
	UpdateFull,
	UpdatePrice,
	UpdateQuantity
}

public class ProductHistory : IEntity
{
	public Guid Id { get; set; }

	public Guid ProductId { get; set; }

	public Guid UserId { get; set; }

	public DateTime ActionTime { get; set; }

	public ProductHistoryAction HistoryAction { get; set; }

	public string Note { get; set; }

	// Navigation properties

	public User User { get; set; }

	public Product Product { get; set; }
}