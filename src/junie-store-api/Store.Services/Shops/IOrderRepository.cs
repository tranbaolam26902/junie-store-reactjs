using Store.Core.Constants;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;

namespace Store.Services.Shops;

public interface IOrderRepository
{
	Task<Order> CreateOrderAsync(Order order, CancellationToken cancellation = default);

	Task<Order> AddProductOrderAsync(Guid orderId, IList<OrderDetailEdit> details, CancellationToken cancellation = default);

	Task<bool> CheckQuantityProduct(Guid productId, int quantity, CancellationToken cancellation = default);
	Task<Order> GetOrderByIdAsync(Guid orderId, CancellationToken cancellation = default);
	Task<Order> ToggleOrderAsync(Order order, CancellationToken cancellation = default);
	Task<IPagedList<T>> GetPagedOrdersAsync<T>(
		IOrderQuery condition,
		IPagingParams pagingParams,
		Func<IQueryable<Order>, IQueryable<T>> mapper);
}