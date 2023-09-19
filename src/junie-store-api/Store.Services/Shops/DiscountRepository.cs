using Microsoft.EntityFrameworkCore;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;
using Store.Data.Contexts;
using Store.Services.Extensions;
using System.Threading;

namespace Store.Services.Shops;

public class DiscountRepository : IDiscountRepository
{
	private readonly StoreDbContext _dbContext;

	public DiscountRepository(StoreDbContext context)
	{
		this._dbContext = context;
	}

	public async Task<IPagedList<T>> GetPagedDiscountsAsync<T>(IDiscountQuery condition, IPagingParams pagingParams, Func<IQueryable<Discount>, IQueryable<T>> mapper)
	{
		var discounts = FilterDiscount(condition);
		var projectedDiscounts = mapper(discounts);

		return await projectedDiscounts.ToPagedListAsync(pagingParams);
	}

	public async Task<Discount> AddOrUpdateDiscountAsync(Discount discount, CancellationToken cancellation = default)
	{
		if (_dbContext.Set<Discount>().Any(s => s.Id == discount.Id))
		{
			_dbContext.Entry(discount).State = EntityState.Modified;
		}
		else
		{
			discount.CreateDate = DateTime.Now;
			_dbContext.Discounts.Add(discount);
		}

		await _dbContext.SaveChangesAsync(cancellation);
		return discount;
	}

	public async Task<bool> ToggleShowOnMenuAsync(Guid discountId, CancellationToken cancellation = default)
	{
		return await _dbContext.Set<Discount>()
			.Where(s => s.Id == discountId)
			.ExecuteUpdateAsync(s => 
				s.SetProperty(d => d.ShowOnMenu, c => !c.ShowOnMenu), cancellation) > 0;
	}

	public Task<bool> ToggleActiveAsync(Guid discountId, CancellationToken cancellation = default)
	{
		throw new NotImplementedException();
	}

	public Task<bool> DeleteDiscountAsync(Guid discountId, CancellationToken cancellation = default)
	{
		throw new NotImplementedException();
	}


	private IQueryable<Discount> FilterDiscount(IDiscountQuery condition)
	{
		float tolerance = 0.0001f;
		return _dbContext.Set<Discount>()
			.WhereIf(condition.ShowOnMenu, d => d.ShowOnMenu)
			.WhereIf(!string.IsNullOrWhiteSpace(condition.Code), d => d.Code == condition.Code)
			.WhereIf(condition.Quantity > 0, d => d.Quantity == condition.Quantity)
			.WhereIf(condition.MinPrice > 0, d => Math.Abs(d.MinPrice - condition.MinPrice) < tolerance)
			.WhereIf(condition.DiscountPercent > 0,
				d => Math.Abs(d.DiscountPercentage - condition.DiscountPercent) > tolerance)
			.WhereIf(condition.Day > 0, s =>
				s.CreateDate.Day == condition.Day ||
				s.ExpiryDate.Day == condition.Day)
			.WhereIf(condition.Month > 0, s =>
				s.CreateDate.Month == condition.Month ||
				s.ExpiryDate.Month == condition.Month)
			.WhereIf(condition.Year > 0, s =>
				s.CreateDate.Year == condition.Year ||
				s.ExpiryDate.Year == condition.Year);
	}
}