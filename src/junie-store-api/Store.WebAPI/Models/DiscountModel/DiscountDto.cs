namespace Store.WebAPI.Models.DiscountModel;

public class DiscountDto
{
	public Guid Id { get; set; }

	public int Quantity { get; set; }

	public float MinPrice { get; set; }

	public DateTime ExpiryDate { get; set; }

	public string Code { get; set; }

	public float DiscountPercentage { get; set; }
}