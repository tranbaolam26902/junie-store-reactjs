using Microsoft.EntityFrameworkCore;
using Store.Core.Contracts;
using Store.Core.DTO;
using Store.Core.Entities;
using Store.Core.Queries;
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

	public async Task<IList<CategoryItem>> GetRelatedCategoryBySlugAsync(ICategoryQuery condition, CancellationToken cancellationToken = default)
	{
		
		var products = await _dbContext.Set<Product>()
			.Include(p => p.Categories)
			.Where(c => !c.IsDeleted && c.Active)
			.WhereIf(!string.IsNullOrWhiteSpace(condition.UrlSlug),
			s => s.Categories.Any(c => c.UrlSlug == condition.UrlSlug && !c.IsDeleted))
			.WhereIf(!string.IsNullOrEmpty(condition.Keyword), s =>
				s.Name.Contains(condition.Keyword) ||
				s.Description.Contains(condition.Keyword) ||
				s.Instruction.Contains(condition.Keyword) ||
				s.Sku.Contains(condition.Keyword) ||
				s.UrlSlug.Contains(condition.Keyword))
			.ToListAsync(cancellationToken);

		var categoryItems = products
			.SelectMany(p =>
			{
				if (!string.IsNullOrWhiteSpace(condition.UrlSlug))
				{
					return p.Categories.Where(s => s.UrlSlug != condition.UrlSlug && !s.IsDeleted);
				}
				return p.Categories.Where(s => !s.IsDeleted);
			})
			.GroupBy(c => new { c.Id, c.Name, c.UrlSlug })
			.Select(group => new CategoryItem()
			{
				Id = group.Key.Id,
				Name = group.Key.Name,
				UrlSlug = group.Key.UrlSlug,
				ProductCount = group.Count()
			})
			.ToList();
		return categoryItems;
	}

	public async Task<IPagedList<T>> GetPagedCategoriesAsync<T>(ICategoryQuery condition, IPagingParams pagingParams, Func<IQueryable<Category>, IQueryable<T>> mapper)
	{
		var categories = _dbContext.Set<Category>()
			.WhereIf(condition.ShowOnMenu, s => s.ShowOnMenu)
			.WhereIf(condition.IsDeleted, s => s.IsDeleted)
			.WhereIf(!string.IsNullOrWhiteSpace(condition.Keyword), s =>
				s.UrlSlug.Contains(condition.Keyword) ||
				s.Description.Contains(condition.Keyword) ||
				s.Name.Contains(condition.Keyword));

		var projectedCategories = mapper(categories);
		return await projectedCategories.ToPagedListAsync(pagingParams);

	}

	public async Task<IPagedList<T>> GetPagedCategoriesForUserAsync<T>(ICategoryQuery condition, IPagingParams pagingParams, Func<IQueryable<Category>, IQueryable<T>> mapper)
	{
		var categories = _dbContext.Set<Category>()
			.Where(s => !s.IsDeleted)
			.WhereIf(condition.ShowOnMenu, s => s.ShowOnMenu)
			.WhereIf(!string.IsNullOrWhiteSpace(condition.Keyword), s =>
				s.UrlSlug.Contains(condition.Keyword) ||
				s.Description.Contains(condition.Keyword) ||
				s.Name.Contains(condition.Keyword));

		var projectedCategories = mapper(categories);
		return await projectedCategories.ToPagedListAsync(pagingParams);
	}

	public async Task<bool> IsCategoryExistedAsync(Guid id, string name, CancellationToken cancellationToken = default)
	{
		var slug = name.GenerateSlug();

		return await _dbContext.Set<Category>().AnyAsync(s => s.Id != id && s.UrlSlug.Equals(slug), cancellationToken);
	}

	public async Task<bool> ToggleShowOnMenuAsync(Guid id, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Category>()
			.Where(s => s.Id == id)
			.ExecuteUpdateAsync(s => s.SetProperty(c => c.ShowOnMenu, c => !c.ShowOnMenu), cancellationToken) > 0;
	}

	public async Task<bool> DeleteCategoryAsync(Guid id, CancellationToken cancellation = default)
	{
		return await _dbContext.Set<Category>()
			.Where(s => s.Id == id)
			.ExecuteDeleteAsync(cancellation) > 0;
	}

	public async Task<Category> GetCategoryByIdAsync(Guid id, CancellationToken cancellationToken = default)
	{
		return await _dbContext.Set<Category>()
			.FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
	}

	public async Task<Category> GetCategoryBySlugAsync(string slug, bool isUser = false, CancellationToken cancellationToken = default)
	{
		if (isUser)
		{
			return await _dbContext.Set<Category>()
				.FirstOrDefaultAsync(s => s.UrlSlug == slug && !s.IsDeleted, cancellationToken);
		}

		return await _dbContext.Set<Category>()
			.FirstOrDefaultAsync(s => s.UrlSlug == slug, cancellationToken);
	}

	public async Task<Category> AddOrUpdateCategoryAsync(Category category, CancellationToken cancellationToken = default)
	{

		category.UrlSlug = category.Name.GenerateSlug();
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
		var category = await GetCategoryByIdAsync(categoryId, cancellationToken);
		if (category == null)
		{
			return false;
		}

		category.ShowOnMenu = false;

		category.IsDeleted = !category.IsDeleted;

		_dbContext.Entry(category).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync(cancellationToken);

		return true;
	}
}