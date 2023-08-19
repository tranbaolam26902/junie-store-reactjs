using System.Collections;
using Store.Core.Contracts;

namespace Store.Core.Collections;

public class PagedList<T> : PagingMetadata, IPagedList<T>
{
	private readonly List<T> _subset = new();

	public PagedList(IList<T> items, int pageNumber, int pageSize, int totalCount)
		: base(pageNumber, pageSize, totalCount)
	{
		_subset.AddRange(items);
	}

	#region IPagedList<T> Members

	public IEnumerator<T> GetEnumerator()
	{
		return _subset.GetEnumerator();
	}

	IEnumerator IEnumerable.GetEnumerator()
	{
		return GetEnumerator();
	}

	public T this[int index] => _subset[index];

	public virtual int Count => _subset.Count;

	#endregion
}