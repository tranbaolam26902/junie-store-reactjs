namespace Store.WebAPI.Models.ProductModel;

public class ProductEditModel
{
	public string Name { get; set; }

	public string Sku { get; set; }

	public string Instruction { get; set; }

	public string Description { get; set; }

	public double Price { get; set; }

	public int Quantity { get; set; }

	public int MinQuantity { get; set; }

	public float Discount { get; set; }

	public string Note { get; set; }

	public Guid SupplierId { get; set; }

	public string EditReason{ get; set; }

	public bool Active { get; set; } = true;

	public IList<Guid> Categories { get; set; }
}

public class ProductEditReason
{
	public string Reason { get; set; }
}