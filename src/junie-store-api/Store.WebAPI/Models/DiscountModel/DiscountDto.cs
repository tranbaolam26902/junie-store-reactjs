namespace Store.WebAPI.Models.DiscountModel;

public class DiscountDto
{
	public Guid Id { get; set; }

	public int Quantity { get; set; }

	public float MinPrice { get; set; }

	public DateTime CreateDate { get; set; }

	public DateTime ExpiryDate { get; set; }

	public string Code { get; set; }

	public float DiscountAmount { get; set; }

	public bool IsDiscountPercentage { get; set; }
}