namespace Store.Core.DTO;

public enum TypeRevenue
{
	Year,
	Month, 
	Day, 
	Hour
}

public class RevenueOrder
{
	public int Time { get; set; }

	public double TotalRevenue { get; set; }

	public TypeRevenue TypeRevenue { get; set; }
}