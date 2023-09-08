namespace Store.Core.Entities;

public class Category
{
	public Guid Id { get; set; }

	public string Name { get; set; }

	public string UrlSlug { get; set; }

	public string Description { get; set; }

	public bool ShowOnMenu { get; set; }

	public bool IsDeleted { get; set; }

	// ======================================================
	// Navigation properties
	// ======================================================

	public IList<Product> Products { get; set; }
}