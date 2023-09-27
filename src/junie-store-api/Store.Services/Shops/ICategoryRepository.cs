using Store.Core.Contracts;
using Store.Core.DTO;
using Store.Core.Entities;
using Store.Core.Queries;

namespace Store.Services.Shops;

public interface ICategoryRepository
{
	Task<IPagedList<Category>> GetPagedCategoriesAsync(string keyword, IPagingParams pagingParams,
		CancellationToken cancellationToken = default);

	Task<IList<CategoryItem>> GetRelatedCategoryBySlugAsync(ICategoryQuery condition, CancellationToken cancellationToken = default);

	Task<IPagedList<T>> GetPagedCategoriesAsync<T>(
		ICategoryQuery condition,
		IPagingParams pagingParams,
		Func<IQueryable<Category>, IQueryable<T>> mapper);

	Task<Category> AddOrUpdateCategoryAsync(Category category, CancellationToken cancellationToken = default);

	Task<bool> ToggleDeleteCategoryAsync(Guid categoryId, CancellationToken cancellationToken = default);

	Task<bool> IsCategoryExistedAsync(Guid id, string name, CancellationToken cancellationToken = default);

	Task<bool> ToggleShowOnMenuAsync(Guid id, CancellationToken cancellationToken = default);

	Task<bool> DeleteCategoryAsync(Guid id, CancellationToken cancellation = default);

	Task<Category> GetCategoryByIdAsync(Guid id, CancellationToken cancellationToken = default);

	Task<Category> GetCategoryBySlugAsync(string slug, CancellationToken cancellationToken = default);
}