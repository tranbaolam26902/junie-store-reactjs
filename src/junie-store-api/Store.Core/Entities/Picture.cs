using Store.Core.Contracts;

namespace Store.Core.Entities;

public class Picture : IEntity
{
	public Guid Id { get; set; }

	public Guid ProductId { get; set; }
	
	public string Path { get; set; }

	public bool Active { get; set; }

	// ======================================================
	// Navigation properties
	// ======================================================

	public virtual Product Product { get; set; }
}