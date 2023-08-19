using Microsoft.EntityFrameworkCore;
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
	public async Task<int> TotalOrder(CancellationToken cancellationToken = default(CancellationToken))
	{
		return await _dbContext.Set<Order>().CountAsync(cancellationToken);
	}

	public async Task<int> OrderToday(CancellationToken cancellationToken = default(CancellationToken))
	{
		return await _dbContext.Set<Order>().CountAsync(s => s.OrderDate >= DateTime.Now.AddDays(-1), cancellationToken);
	}

	public async Task<int> TotalCategories(CancellationToken cancellationToken = default(CancellationToken))
	{
		return await _dbContext.Set<Category>().CountAsync(cancellationToken);
	}

	public async Task<int> TotalProduct(CancellationToken cancellationToken = default(CancellationToken))
	{
		return await _dbContext.Set<Product>().CountAsync(cancellationToken);
	}

	public async Task<double> RevenueToday(CancellationToken cancellationToken = default(CancellationToken))
	{
		var orders = await _dbContext.Set<Order>()
			.Include(s => s.Details)
			.Include(s => s.Discount)
			.Where(s => s.OrderDate >= DateTime.Now.AddDays(-1))
			.ToListAsync(cancellationToken);

		var total = 0d;
		foreach (var order in orders)
		{
			total += GetTotalPriceOrder(order);
		}

		return total;
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

	public async Task<double> TotalRevenue(CancellationToken cancellationToken = default(CancellationToken))
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