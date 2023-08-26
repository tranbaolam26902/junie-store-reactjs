using Store.Core.Contracts;
using Store.Core.Entities;

namespace Store.Services.Shops;

public interface ISupplierRepository
{
	Task<IPagedList<T>> GetPagedSuppliersAsync<T>(
		string keyword,
		IPagingParams pagingParams,
		Func<IQueryable<Supplier>, IQueryable<T>> mapper);

	Task<Supplier> GetSupplierByIdAsync(Guid supplierId, CancellationToken cancellationToken = default);

	Task AddOrUpdateSupplierAsync(
		Supplier supplier,
		CancellationToken cancellation = default);
	
}