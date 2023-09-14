using Microsoft.EntityFrameworkCore;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Data.Contexts;
using Store.Services.Extensions;

namespace Store.Services.Shops;

public class CategoryRepository : ICategoryRepository
{
	private readonly StoreDbContext _dbContext;

	public CategoryRepository(StoreDbContext context)
	{
		_dbContext = context;
	}

	public Task<IPagedList<Category>> GetPagedCategoriesAsync(string keyword, IPagingParams pagingParams, CancellationToken cancellationToken = default)
	{
		var categories = _dbContext.Set<Category>()
			.WhereIf(!string.IsNullOrWhiteSpace(keyword), s =>
				s.UrlSlug.Contains(keyword) ||
				s.Description.Contains(keyword) ||
				s.Name.Contains(keyword));

		return categories.ToPagedListAsync(pagingParams, cancellationToken);
	}

	public async Task<IPagedList<T>> GetPagedCategoriesAsync<T>(string keyword, IPagingParams pagingParams, Func<IQueryable<Category>, IQueryable<T>> mapper)
	{
		var categories = _dbContext.Set<Category>()
			.WhereIf(!string.IsNullOrWhiteSpace(keyword), s =>
				s.UrlSlug.Contains(keyword) ||
				s.Description.Contains(keyword) ||
				s.Name.Contains(keyword));

		var projectedCategories = mapper(categories);
		return await projectedCategories.ToPagedListAsync(pagingParams);

	}

	public async Task<bool> IsCategorySlugExistedAsync(Guid id, string slug, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Category>().AnyAsync(s => s.Id != id && s.UrlSlug.Equals(slug), cancellationToken);
	}

	public async Task<bool> ToggleShowOnMenu(Guid id, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Category>()
			.Where(s => s.Id == id)
			.ExecuteUpdateAsync(s => s.SetProperty(c => c.ShowOnMenu, c => !c.ShowOnMenu), cancellationToken) > 0;
	}

	public async Task<Category> GetCategoryByIdAsync(Guid id, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Category>()
			.FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
	}

	public async Task<Category> GetCategoryBySlugAsync(string slug, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Category>()
			.FirstOrDefaultAsync(s => s.UrlSlug == slug, cancellationToken);
	}

	public async Task<Category> AddOrUpdateCategoryAsync(Category category, CancellationToken cancellationToken = default)
	{
		if (_dbContext.Set<Category>().Any(s => s.Id == category.Id))
		{
			_dbContext.Entry(category).State = EntityState.Modified;
		}
		else
		{
			_dbContext.Categories.Add(category);
		}

		await _dbContext.SaveChangesAsync(cancellationToken);
		return category;
	}

	public async Task<bool> ToggleDeleteCategoryAsync(Guid categoryId, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Category>()
			.Where(x => x.Id == categoryId)
			.ExecuteUpdateAsync(s =>
				s.SetProperty(c => c.IsDeleted, c => !c.IsDeleted), cancellationToken) > 0;
	}
}