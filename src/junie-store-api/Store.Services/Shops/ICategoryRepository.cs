using Store.Core.Contracts;
using Store.Core.Entities;

namespace Store.Services.Shops;

public interface ICategoryRepository
{
	Task<IPagedList<Category>> GetPagedCategoriesAsync(string keyword, IPagingParams pagingParams,
		CancellationToken cancellationToken = default);

	Task<IPagedList<T>> GetPagedCategoriesAsync<T>(
		string keyword,
		IPagingParams pagingParams,
		Func<IQueryable<Category>, IQueryable<T>> mapper);

	Task<Category> AddOrUpdateCategoryAsync(Category category, CancellationToken cancellationToken = default);

	Task<bool> DeleteCategoryAsync(Guid categoryId, CancellationToken cancellationToken = default);

	Task<bool> IsCategorySlugExistedAsync(Guid id, string slug, CancellationToken cancellationToken = default);

	Task<bool> ToggleShowOnMenu(Guid id, CancellationToken cancellationToken = default);

	Task<Category> GetCategoryByIdAsync(Guid id, CancellationToken cancellationToken = default);
}