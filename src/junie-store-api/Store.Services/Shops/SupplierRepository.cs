using Microsoft.EntityFrameworkCore;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;
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
	public async Task<IPagedList<T>> GetPagedSuppliersAsync<T>(
		ISupplierQuery condition
		, IPagingParams pagingParams
		, Func<IQueryable<Supplier>, IQueryable<T>> mapper)
	{
		var suppliers = _dbContext.Set<Supplier>()
			.Include(s => s.Products)
			.WhereIf(!condition.IsDeleted, s => !s.IsDeleted)
			.WhereIf(condition.IsDeleted, s => s.IsDeleted)
			.WhereIf(!string.IsNullOrWhiteSpace(condition.Keyword), s =>
				s.Email.Contains(condition.Keyword) ||
				s.Description.Contains(condition.Keyword) ||
				s.Name.Contains(condition.Keyword) ||
				s.Phone.Contains(condition.Keyword) ||
				s.ContactName.Contains(condition.Keyword));

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

	public async Task ToggleDeleteSupplierAsync(Guid supplierId, CancellationToken cancellationToken = default)
	{ 
		await _dbContext.Set<Supplier>()
			.Where(s => s.Id == supplierId)
			.ExecuteUpdateAsync(s => s.SetProperty(d => d.IsDeleted, d => !d.IsDeleted), cancellationToken);
	}
}