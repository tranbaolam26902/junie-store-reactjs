namespace Store.WebAPI.Models.DashboardModel;

public class DashboardDto
{
	public int TotalOrder { get; set; }

	public int OrderToday { get; set; }

	public int TotalCategories { get; set; }

	public int TotalProduct { get; set; }

	public double RevenueToday { get; set; }

	public double TotalRevenue { get; set; }
}