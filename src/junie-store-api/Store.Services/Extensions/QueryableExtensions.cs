using System.Linq.Expressions;

namespace Store.Services.Extensions;

public static class QueryableExtensions
{
	/// <summary>
	/// Filters a <see cref="IQueryable{T}"/> by given predicate if given condition is true.
	/// </summary>
	/// <param name="query">Queryable to apply filtering</param>
	/// <param name="condition">A boolean value</param>
	/// <param name="predicate">Predicate to filter the query</param>
	/// <returns>Filtered or not filtered query based on <paramref name="condition"/></returns>
	public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, bool>> predicate)
	{
		return condition
			? query.Where(predicate)
			: query;
	}
	/// <summary>
	/// Filters a <see cref="IQueryable{T}"/> by given predicate if given condition is true.
	/// </summary>
	/// <param name="query">Queryable to apply filtering</param>
	/// <param name="condition">A boolean value</param>
	/// <param name="predicate">Predicate to filter the query</param>
	/// <returns>Filtered or not filtered query based on <paramref name="condition"/></returns>
	public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, int, bool>> predicate)
	{
		return condition
			? query.Where(predicate)
			: query;
	}
}