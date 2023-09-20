namespace Store.Core.Queries;

public interface IDiscountQuery
{
	public int Quantity { get; set; }

	public float MinPrice { get; set; }

	public float DiscountPercent { get; set; }

	public int? Year { get; set; }

	public int? Month { get; set; }

	public int? Day { get; set; }

	public bool IsDiscountPercentage { get; set; }

	public bool IsDiscountAmount { get; set; }
}