namespace Store.Services.Shops;

public interface IDashboardRepository
{
	Task<int> TotalOrder(CancellationToken cancellationToken = default(CancellationToken));
	Task<int> OrderToday(CancellationToken cancellationToken = default(CancellationToken));
	Task<int> TotalCategories(CancellationToken cancellationToken = default(CancellationToken));
	Task<int> TotalProduct(CancellationToken cancellationToken = default(CancellationToken));
	Task<double> RevenueToday(CancellationToken cancellationToken = default(CancellationToken));
	Task<double> TotalRevenue(CancellationToken cancellationToken = default(CancellationToken));
}