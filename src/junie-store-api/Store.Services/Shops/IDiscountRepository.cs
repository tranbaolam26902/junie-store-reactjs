using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;

namespace Store.Services.Shops;

public interface IDiscountRepository
{
	Task<IPagedList<T>> GetPagedDiscountsAsync<T>(
		IDiscountQuery condition,
		IPagingParams pagingParams,
		Func<IQueryable<Discount>,  IQueryable<T>> mapper);

	Task<Discount> AddOrUpdateDiscountAsync(Discount discount, CancellationToken cancellation = default);


	Task<bool> ToggleShowOnMenuAsync(Guid discountId, CancellationToken cancellation = default);

	Task<bool> ToggleActiveAsync(Guid discountId, CancellationToken cancellation = default);

	Task<bool> DeleteDiscountAsync(Guid discountId, CancellationToken cancellation = default);
}