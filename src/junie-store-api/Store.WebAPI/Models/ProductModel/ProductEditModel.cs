namespace Store.WebAPI.Models.ProductModel;

public class ProductEditModel
{
	public string Name { get; set; }

	public string ShortIntro { get; set; }

	public string Description { get; set; }

	public double Price { get; set; }

	public int Quantity { get; set; }

	public int MinQuantity { get; set; }

	public float Discount { get; set; }

	public string Note { get; set; }

	public Guid CategoryId { get; set; }

	public Guid SupplierId { get; set; }

	public string EditReason{ get; set; }
}