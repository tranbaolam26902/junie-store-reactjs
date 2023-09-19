namespace Store.Core.Queries;

public class DiscountQuery : IDiscountQuery
{
	public string Code { get; set; } = "";
	public int Quantity { get; set; } = 0;
	public float MinPrice { get; set; } = 0f;
	public float DiscountPercent { get; set; } = 0f;
	public int? Year { get; set; } = 0;
	public int? Month { get; set; } = 0;
	public int? Day { get; set; } = 0;
	public bool ShowOnMenu { get; set; } = false;
}