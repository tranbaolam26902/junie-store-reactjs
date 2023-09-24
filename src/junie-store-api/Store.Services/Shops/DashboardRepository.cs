using Microsoft.EntityFrameworkCore;
using Store.Core.DTO;
using Store.Core.Entities;
using Store.Data.Contexts;

namespace Store.Services.Shops;

public class DashboardRepository : IDashboardRepository
{
	private readonly StoreDbContext _dbContext;
	public DashboardRepository(StoreDbContext context)
	{
		_dbContext = context;
	}
	public async Task<int> TotalOrder(CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Order>().CountAsync(cancellationToken);
	}

	public async Task<int> OrderToday(CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Order>().CountAsync(s => s.OrderDate >= DateTime.Now.AddDays(-1), cancellationToken);
	}

	public async Task<int> TotalCategories(CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Category>().CountAsync(cancellationToken);
	}

	public async Task<int> TotalProduct(CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>().CountAsync(cancellationToken);
	}

	public async Task<double> RevenueTodayAsync(CancellationToken cancellationToken = default)
	{
		var orders = await _dbContext.Set<Order>()
			.Include(s => s.Details)
			.Include(s => s.Discount)
			.Where(s => s.OrderDate >= DateTime.Now.AddDays(-1))
			.ToListAsync(cancellationToken);

		var total = orders.Sum(s => s.Total);

		return total;
	}

	public async Task<IList<RevenueOrder>> HourlyRevenueDetailAsync(CancellationToken cancellationToken = default)
	{
		var orders = await _dbContext.Set<Order>()
			.Include(s => s.Details)
			.Include(s => s.Discount)
			.Where(s => s.OrderDate >= DateTime.Now.AddDays(-1))
			.ToListAsync(cancellationToken);

		var hourlyRevenues = orders
			.GroupBy(o => o.OrderDate.Hour)
			.OrderBy(group => group.Key)
			.Select(group => new RevenueOrder()
			{
				TypeRevenue = TypeRevenue.Day,
				Time = group.Key,
				TotalRevenue = group.Sum(o => o.Total)
			})
			.ToList();

		return hourlyRevenues;
	}

	public double GetTotalPriceOrder(Order order)
	{
		var total = 0d;
		foreach (var detail in order.Details)
		{
			total += detail.TotalPrice;
		}

		return total;
	}

	public async Task<double> TotalRevenue(CancellationToken cancellationToken = default)
	{
		var orders = await _dbContext.Set<Order>()
			.Include(s => s.Details)
			.Include(s => s.Discount)
			.ToListAsync(cancellationToken);

		var total = 0d;
		foreach (var order in orders)
		{
			total += GetTotalPriceOrder(order);
		}

		return total;
	}
}