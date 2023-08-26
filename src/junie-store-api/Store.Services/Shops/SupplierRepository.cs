using Microsoft.EntityFrameworkCore;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Data.Contexts;
using Store.Services.Extensions;

namespace Store.Services.Shops;

public class SupplierRepository : ISupplierRepository
{
	private readonly StoreDbContext _dbContext;
	public SupplierRepository(StoreDbContext dbContext)
	{
		_dbContext = dbContext;
	}
	public async Task<IPagedList<T>> GetPagedSuppliersAsync<T>(string keyword, IPagingParams pagingParams, Func<IQueryable<Supplier>, IQueryable<T>> mapper)
	{
		var suppliers = _dbContext.Set<Supplier>()
			.WhereIf(!string.IsNullOrWhiteSpace(keyword), s =>
				s.Email.Contains(keyword) ||
				s.Description.Contains(keyword) ||
				s.Name.Contains(keyword) ||
				s.Phone.Contains(keyword) ||
				s.ContactName.Contains(keyword));

		var projectedSuppliers = mapper(suppliers);

		return await projectedSuppliers.ToPagedListAsync(pagingParams);
	}

	public async Task<Supplier> GetSupplierByIdAsync(Guid supplierId, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Supplier>()
			.FirstOrDefaultAsync(s => s.Id == supplierId, cancellationToken);
	}

	public async Task AddOrUpdateSupplierAsync(Supplier supplier, CancellationToken cancellation = default)
	{
		if (await _dbContext.Set<Supplier>().AnyAsync(s => s.Id == supplier.Id, cancellation))
		{
			_dbContext.Entry(supplier).State = EntityState.Modified;
		}
		else
		{
			_dbContext.Suppliers.Add(supplier);
		}

		await _dbContext.SaveChangesAsync(cancellation);
	}
}