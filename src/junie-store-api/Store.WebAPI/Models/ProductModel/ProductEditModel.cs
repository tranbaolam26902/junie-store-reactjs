namespace Store.WebAPI.Models.ProductModel;

public class ProductEditModel
{
	public string Name { get; set; }

	public string ShortIntro { get; set; }

	public string Description { get; set; }

	public string UrlSlug { get; set; }

	public double Price { get; set; }

	public int Quantity { get; set; }

	public float Discount { get; set; }

	public bool Active { get; set; }

	public Guid CategoryId { get; set; }
}