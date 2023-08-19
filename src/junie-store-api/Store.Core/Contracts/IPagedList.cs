namespace Store.Core.Contracts;

public interface IPagedList
{
	int PageCount { get; }

	int TotalItemCount { get; }

	int PageIndex { get; }

	int PageNumber { get; }

	int PageSize { get; }

	// Kiểm tra có trang trước hay không
	bool HasPreviousPage { get; }

	// Kiểm tra có trang tiếp theo không
	bool HasNextPage { get; }

	bool IsFirstPage { get; }

	bool IsLastPage { get; }

	// Thứ tự phần tử đầu trang (start: 1)
	int FirstItemIndex { get; }

	// Thứ tự phần tử cuối trang (start: 1)
	int LastItemIndex { get; }
}

public interface IPagedList<out T> : IPagedList, IEnumerable<T>
{
	// Lấy phần tử tại vị trí Index (Start: 0)
	T this[int index] { get; }

	// Đếm số phần tử có trong trang
	int Count { get; }
}