using Microsoft.EntityFrameworkCore;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;
using Store.Data.Contexts;
using Store.Services.Extensions;

namespace Store.Services.Shops;

public class CollectionRepository : ICollectionRepository
{
	private readonly StoreDbContext _dbContext;

	public CollectionRepository(StoreDbContext context)
	{
		_dbContext = context;
	}

	public async Task<Product> GetProductByIdAsync(Guid id, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>()
			.Include(s => s.Category)
			.Include(s => s.Pictures)
			.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);
	}

	public async Task<Product> GetProductBySlug(string slug, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>()
			.Include(s => s.Category)
			.Include(s => s.Pictures)
			.FirstOrDefaultAsync(s => s.UrlSlug.Equals(slug), cancellationToken);
	}

	public async Task<bool> IsProductSlugExistedAsync(Guid productId, string slug, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>()
			.AnyAsync(s => s.Id != productId && s.UrlSlug == slug, cancellationToken);
	}

	public async Task<bool> IsProductExistedAsync(Guid productId, string name, CancellationToken cancellationToken = default)
	{
		var slug = FriendlyUrls.GenerateSlug(name);
		return await _dbContext.Set<Product>()
			.AnyAsync(s => s.Id != productId && s.UrlSlug == slug, cancellationToken);
	}

	public async Task<Product> AddOrUpdateProductAsync(Product product, Guid userId, string note = "", CancellationToken cancellationToken = default)
	{
		var history = new ProductHistory()
		{
			ActionTime = DateTime.Now,
			Note = note,
			UserId = userId,
			ProductId = product.Id
		};

		product.UrlSlug = FriendlyUrls.GenerateSlug(product.Name);
		if (_dbContext.Set<Product>().Any(s => s.Id == product.Id))
		{
			history.HistoryAction = ProductHistoryAction.Update;
			_dbContext.Entry(product).State = EntityState.Modified;
		}
		else
		{
			product.Sku = "SP-" + Guid.NewGuid().ToString().Split('-')[0].ToUpper();
			_dbContext.Products.Add(product);

			history.HistoryAction = ProductHistoryAction.Create;
			history.ProductId = product.Id;
		}

		_dbContext.ProductHistories.Add(history);
		await _dbContext.SaveChangesAsync(cancellationToken);
		return product;
	}

	public Task<IPagedList<Product>> GetPagedProductsAsync(IProductQuery productQuery, IPagingParams pagingParams,
		CancellationToken cancellationToken = default)
	{
		return FilterProduct(productQuery).ToPagedListAsync(pagingParams, cancellationToken);
	}

	public async Task<IList<Product>> GetTopSaleAsync(CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>()
			.Include(s => s.Details)
			.Include(s => s.Pictures)
			.Where(s => s.Quantity > 0 && s.Active == true)
			.OrderByDescending(s => s.Details.Count())
			.Take(8)
			.ToListAsync(cancellationToken);
	}

	public async Task<IList<Product>> GetRelatedProductsAsync(string slug, int num = 10, CancellationToken cancellationToken = default)
	{
		var product = await GetProductBySlug(slug, cancellationToken);

		return await _dbContext.Set<Product>()
			.Include(s => s.Category)
			.Include(s => s.Pictures)
			.Where(s => s.Id != product.Id && product.CategoryId == s.CategoryId)
			.OrderBy(s => Guid.NewGuid())
			.Take(num)
			.ToListAsync(cancellationToken);
	}

	public async Task<IPagedList<T>> GetPagedProductsAsync<T>(IProductQuery condition, IPagingParams pagingParams, Func<IQueryable<Product>, IQueryable<T>> mapper)
	{
		var products = FilterProduct(condition);
		var projectedProducts = mapper(products);

		return await projectedProducts.ToPagedListAsync(pagingParams);
	}

	public async Task<IPagedList<T>> GetPagedProductHistoriesAsync<T>(IProductHistoryQuery condition, IPagingParams pagingParams, Func<IQueryable<ProductHistory>, IQueryable<T>> mapper)
	{
		var products = FilterProductHistories(condition);
		var projectedProducts = mapper(products);

		return await projectedProducts.ToPagedListAsync(pagingParams);
	}

	public async Task<bool> SetImageUrlAsync(Guid productId, string imageUrl, CancellationToken cancellationToken = default)
	{
		if (_dbContext.Set<Product>().FirstOrDefault(s => s.Id == productId) == null)
		{
			return false;
		}
		
		var picture = new Picture()
		{
			Id = Guid.NewGuid(),
			ProductId = productId,
			Path = imageUrl,
			Active = true
		};

		_dbContext.Pictures.Add(picture);
		await _dbContext.SaveChangesAsync(cancellationToken);
		return true;
	}

	public async Task<IList<Picture>> GetImageUrlsAsync(Guid productId, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Picture>()
			.Where(s => s.ProductId == productId)
			.ToListAsync(cancellationToken);
	}

	public async Task<bool> DeleteImageUrlsAsync(Guid productId, CancellationToken cancellationToken = default)
	{
		var pictures = await _dbContext.Set<Picture>()
			.Where(s => s.ProductId == productId)
			.ToListAsync(cancellationToken);

		_dbContext.Pictures.RemoveRange(pictures);
		await _dbContext.SaveChangesAsync(cancellationToken);
		
		return true;
	}

	public async Task<bool> DeleteProductAsync(Guid productId, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>()
			.Where(x => x.Id == productId)
			.ExecuteDeleteAsync(cancellationToken) > 0;
	}

	public async Task<bool> DeleteProductHistoryAsync(Guid historyId, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<ProductHistory>()
			.Where(x => x.Id == historyId)
			.ExecuteDeleteAsync(cancellationToken) > 0;
	}

	public async Task<bool> ToggleDeleteProductAsync(Guid productId, Guid userId, string reason, CancellationToken cancellationToken = default)
	{
		var product = await GetProductByIdAsync(productId, cancellationToken);

		if (product == null)
		{
			return false;
		}

		var history = new ProductHistory()
		{
			ActionTime = DateTime.Now,
			HistoryAction = ProductHistoryAction.Delete,
			Note = reason,
			UserId = userId,
			ProductId = productId
		};
		_dbContext.ProductHistories.Add(history);
		await _dbContext.SaveChangesAsync(cancellationToken);

		return await _dbContext.Set<Product>()
			.Where(s => s.Id == productId)
			.ExecuteUpdateAsync(s => s.SetProperty(c => c.IsDeleted, c => !c.IsDeleted), cancellationToken) > 0;
	}

	private IQueryable<Product> FilterProduct(IProductQuery condition)
	{
		return _dbContext.Set<Product>()
			.Include(s => s.Category)
			.Include(s => s.Pictures)
			.WhereIf(condition.Year > 0, s => s.CreateDate.Year == condition.Year)
			.WhereIf(condition.Month > 0, s => s.CreateDate.Month == condition.Month)
			.WhereIf(condition.Day > 0, s => s.CreateDate.Day == condition.Day)
			.WhereIf(!string.IsNullOrEmpty(condition.CategorySlug), s => s.Category.UrlSlug.Contains(condition.CategorySlug))
			.WhereIf(!string.IsNullOrEmpty(condition.ProductSlug), s => s.UrlSlug.Contains(condition.ProductSlug))
			.WhereIf(!string.IsNullOrEmpty(condition.Keyword), s =>
				s.Name.Contains(condition.Keyword) ||
				s.Description.Contains(condition.Keyword) ||
				s.ShortIntro.Contains(condition.Keyword) ||
				s.Sku.Contains(condition.Keyword) ||
				s.UrlSlug.Contains(condition.Keyword));
	}

	private IQueryable<ProductHistory> FilterProductHistories(IProductHistoryQuery condition)
	{
		return _dbContext.Set<ProductHistory>()
			.WhereIf(condition.UserId != Guid.Empty, s => s.UserId == condition.UserId)
			.WhereIf(condition.ProductId != Guid.Empty, s => s.ProductId == condition.ProductId)
			.WhereIf(condition.Action != ProductHistoryAction.None, s => s.HistoryAction == condition.Action)
			.WhereIf(condition.Day > 0, s => s.ActionTime.Day == condition.Day)
			.WhereIf(condition.Month > 0, s => s.ActionTime.Month == condition.Month)
			.WhereIf(condition.Year > 0, s => s.ActionTime.Year == condition.Year)
			.WhereIf(!string.IsNullOrWhiteSpace(condition.Keyword), s => s.Note.Contains(condition.Keyword));
	}
}