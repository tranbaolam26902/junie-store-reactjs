using Store.Core.DTO;

namespace Store.Services.Shops;

public interface IDashboardRepository
{
	Task<int> TotalOrder(CancellationToken cancellationToken = default);

	Task<int> OrderToday(CancellationToken cancellationToken = default);
	
	Task<int> TotalCategories(CancellationToken cancellationToken = default);
	
	Task<int> TotalProduct(CancellationToken cancellationToken = default);
	
	Task<double> RevenueTodayAsync(CancellationToken cancellationToken = default);

	Task<IList<RevenueOrder>> HourlyRevenueDetailAsync(CancellationToken cancellationToken = default);

	Task<IList<RevenueOrder>> DailyRevenueDetailAsync(CancellationToken cancellationToken = default);

	Task<IList<RevenueOrder>> MonthlyRevenueDetailAsync(CancellationToken cancellationToken = default);
	
	Task<double> TotalRevenue(CancellationToken cancellationToken = default);

} 