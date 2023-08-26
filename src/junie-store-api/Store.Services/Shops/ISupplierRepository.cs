using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;

namespace Store.Services.Shops;

public interface ISupplierRepository
{
	Task<IPagedList<T>> GetPagedSuppliersAsync<T>(
		ISupplierQuery condition,
		IPagingParams pagingParams,
		Func<IQueryable<Supplier>, IQueryable<T>> mapper);

	Task<Supplier> GetSupplierByIdAsync(Guid supplierId, CancellationToken cancellationToken = default);

	Task AddOrUpdateSupplierAsync(
		Supplier supplier,
		CancellationToken cancellation = default);

	Task ToggleDeleteSupplierAsync(Guid supplierId, CancellationToken cancellationToken = default);
	
}