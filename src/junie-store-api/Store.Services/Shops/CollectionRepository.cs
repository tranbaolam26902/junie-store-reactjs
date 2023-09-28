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

	public async Task<Product> GetProductByIdAsync(Guid id, bool getAll = false, CancellationToken cancellationToken = default)
	{
		if (getAll)
		{
			return await _dbContext.Set<Product>()
				.Include(s => s.Categories)
				.Include(s => s.Feedback)
				.Include(s => s.Pictures)
				.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);
		}

		return await _dbContext.Set<Product>()
			.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);
	}

	public async Task<Product> GetProductBySlugAsync(string slug, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>()
			.Include(s => s.Categories)
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
		return await _dbContext.Set<Product>()
			.AnyAsync(s => s.Id != productId && s.UrlSlug == name.GenerateSlug(), cancellationToken);
	}

	public async Task<Product> AddOrUpdateProductAsync(Product product, Guid userId, string editReason = "", CancellationToken cancellationToken = default)
	{
		var history = new ProductHistory()
		{
			ActionTime = DateTime.Now,
			EditReason = editReason,
			UserId = userId,
			ProductId = product.Id
		};

		product.UrlSlug = product.Name.GenerateSlug();

		if (_dbContext.Set<Product>().Any(s => s.Id == product.Id))
		{
			history.HistoryAction = ProductHistoryAction.Update;
			product.Categories = null;
			_dbContext.Entry(product).State = EntityState.Modified;
		}
		else
		{
			product.CreateDate = DateTime.Now;
			_dbContext.Products.Add(product);

			history.HistoryAction = ProductHistoryAction.Create;
			history.ProductId = product.Id;
		}

		_dbContext.ProductHistories.Add(history);

		await _dbContext.SaveChangesAsync(cancellationToken);
		return product;
	}

	public async Task<Product> SetProductCategoriesAsync(Product product, IList<Guid> categories, CancellationToken cancellationToken = default)
	{
		product = await _dbContext.Set<Product>()
			.Include(s => s.Categories)
			.FirstOrDefaultAsync(s => s.Id == product.Id, cancellationToken);

		UpdateProductCategories(ref product, categories);

		_dbContext.Entry(product).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync(cancellationToken);

		return product;
	}

	public Task<IPagedList<Product>> GetPagedProductsAsync(IProductQuery productQuery, IPagingParams pagingParams,
		CancellationToken cancellationToken = default)
	{
		return FilterProduct(productQuery).ToPagedListAsync(pagingParams, cancellationToken);
	}

	public async Task<IList<Product>> GetTopSaleAsync(int num, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>()
			.Include(s => s.Details)
			.Include(s => s.Pictures)
			.Where(s => s.Quantity > 0 && s.Active == true)
			.OrderByDescending(s => s.Details.Count())
			.Take(num)
			.ToListAsync(cancellationToken);
	}

	public async Task<IList<Product>> GetRelatedProductsAsync(string slug, int num = 10, CancellationToken cancellationToken = default)
	{
		var product = await GetProductBySlugAsync(slug, cancellationToken);

		return await _dbContext.Set<Product>()
			.Include(s => s.Categories)
			.Include(s => s.Pictures)
			.Where(s => s.Id != product.Id && 
			            s.Categories.Any(c => product.Categories.Select(pc => pc.Id).Contains(c.Id)))
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
		var product = await GetProductByIdAsync(productId, false, cancellationToken);

		if (product == null)
		{
			return false;
		}

		var history = new ProductHistory()
		{
			ActionTime = DateTime.Now,
			HistoryAction = ProductHistoryAction.Delete,
			EditReason = reason,
			UserId = userId,
			ProductId = productId
		};
		_dbContext.ProductHistories.Add(history);
		await _dbContext.SaveChangesAsync(cancellationToken);

		return await _dbContext.Set<Product>()
			.Where(s => s.Id == productId)
			.ExecuteUpdateAsync(s => s.SetProperty(c => c.IsDeleted, c => !c.IsDeleted), cancellationToken) > 0;
	}

	public async Task<bool> ToggleActiveProductAsync(Guid productId, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Product>()
			.Where(s => s.Id == productId)
			.ExecuteUpdateAsync(s => s.SetProperty(c => c.Active, c => !c.Active), cancellationToken) > 0;
	}

	public bool UpdateProductCategories(ref Product product, IEnumerable<Guid> selectCategories)
	{
		if (selectCategories == null) return false;

		var categories = _dbContext.Categories.ToList();
		var currentCategoryNames = new HashSet<Guid>(product.Categories.Select(x => x.Id));

		foreach (var category in categories)
		{
			var enumerable = selectCategories as Guid[] ?? selectCategories.ToArray();
			if (enumerable.ToList().Contains(category.Id))
			{
				if (!currentCategoryNames.ToList().Contains(category.Id))
				{
					product.Categories.Add(category);
				}
			}
			else if (currentCategoryNames.ToList().Contains(category.Id))
			{
				product.Categories.Remove(category);
			}
		}
		return true;
	}

	private IQueryable<Product> FilterProduct(IProductQuery condition)
	{
		return _dbContext.Set<Product>()
			.Include(s => s.Details)
			.Include(s => s.Pictures)
			.WhereIf(condition.Active, s => s.Active)
			.WhereIf(condition.IsDeleted, s => s.IsDeleted)
			.WhereIf(condition.IsPublished, s => s.Categories.All(c => !c.IsDeleted))
			.WhereIf(condition.Year > 0, s => s.CreateDate.Year == condition.Year)
			.WhereIf(condition.Month > 0, s => s.CreateDate.Month == condition.Month)
			.WhereIf(condition.Day > 0, s => s.CreateDate.Day == condition.Day)
			.WhereIf(condition.MaxPrice > condition.MinPrice, s =>
				(s.Price - (s.Price * s.Discount / 100)) > condition.MinPrice &&
				(s.Price - (s.Price * s.Discount / 100)) < condition.MaxPrice)
			.WhereIf(!string.IsNullOrWhiteSpace(condition.CategorySlug), s =>
				s.Categories.Any(c => c.UrlSlug == condition.CategorySlug))
			.WhereIf(!string.IsNullOrEmpty(condition.SubCategorySlug), s =>
				s.Categories.Any(c => condition.SubCategorySlug.Split(",", StringSplitOptions.TrimEntries).Any(cs => c.UrlSlug == cs)))
			.WhereIf(!string.IsNullOrEmpty(condition.ProductSlug), s =>
				s.UrlSlug.Contains(condition.ProductSlug))
			.WhereIf(!string.IsNullOrEmpty(condition.Keyword), s =>
				s.Name.Contains(condition.Keyword) ||
				s.Description.Contains(condition.Keyword) ||
				s.Instruction.Contains(condition.Keyword) ||
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
			.WhereIf(!string.IsNullOrWhiteSpace(condition.Keyword), s => s.EditReason.Contains(condition.Keyword));
	}
}