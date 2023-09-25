using Store.Core.Constants;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;

namespace Store.Services.Shops;

public interface IOrderRepository
{
	Task<Order> AddOrderAsync(Order order, User user, CancellationToken cancellation = default);

	Task<Order> AddDiscountOrderAsync(Order order, string discountCode, CancellationToken cancellation = default);

	Task<Discount> CheckValidDiscountAsync(string discountCode, double totalBill, CancellationToken cancellation = default);

	Task<Order> AddProductOrderAsync(Guid orderId, IList<OrderDetailEdit> details, CancellationToken cancellation = default);

	Task<Order> GetProductOrderAsync(IList<OrderDetailEdit> details, CancellationToken cancellation = default);

	Task<bool> CheckQuantityProduct(Guid productId, int quantity, CancellationToken cancellation = default);

	Task<Order> GetOrderByIdAsync(Guid orderId, CancellationToken cancellation = default);

	Task<Order> GetOrderByCodeAsync(string code, CancellationToken cancellation = default);

	Task<Order> ToggleOrderAsync(Order order, CancellationToken cancellation = default);

	Task<IPagedList<T>> GetPagedOrdersAsync<T>(
		IOrderQuery condition,
		IPagingParams pagingParams,
		Func<IQueryable<Order>, IQueryable<T>> mapper);
	
	Task<IPagedList<T>> GetPagedOrdersByUserAsync<T>(
		Guid userId,
		IOrderQuery condition,
		IPagingParams pagingParams,
		Func<IQueryable<Order>, IQueryable<T>> mapper);
}