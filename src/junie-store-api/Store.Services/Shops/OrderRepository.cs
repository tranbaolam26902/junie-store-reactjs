using Microsoft.EntityFrameworkCore;
using Slugify;
using Store.Core.Constants;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;
using Store.Data.Contexts;
using Store.Services.Extensions;

namespace Store.Services.Shops;

public class OrderRepository : IOrderRepository
{
	private readonly StoreDbContext _dbContext;
	public OrderRepository(StoreDbContext context)
	{
		_dbContext = context;
	}
	public async Task<Order> CreateOrderAsync(Order order, CancellationToken cancellation = default)
	{
		order.Status = OrderStatus.New;
		order.OrderDate = DateTime.Now;
		var slugHelper = new SlugHelper();
		order.CodeOrder = slugHelper.GenerateSlug(Guid.NewGuid().ToString());


		_dbContext.Orders.Add(order);

		await _dbContext.SaveChangesAsync(cancellation);
		return order;
	}

	public async Task<Order> AddProductOrderAsync(Guid orderId, IList<OrderDetailEdit> details, CancellationToken cancellation = default)
	{
		var order = await _dbContext.Set<Order>()
			.Include(s => s.Details)
			.Include(s => s.Discount)
			.FirstOrDefaultAsync(s => s.Id == orderId, cancellation);

		foreach (var item in details)
		{

			var product = await _dbContext.Set<Product>()
				.FirstOrDefaultAsync(s => s.Id == item.Id, cancellation);

			var detail = new OrderDetail()
			{
				ProductId = product.Id,
				Price = product.Price - (product.Price * product.Discount) / 100,
				//Quantity = item.Quantity,
				OrderId = order.Id
			};
			product.Quantity -= item.Quantity;
			_dbContext.Entry(product).State = EntityState.Modified;

			//order.Total += detail.Quantity * detail.Price;
			order.Details.Add(detail);
		}

		_dbContext.Entry(order).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync(cancellation);

		return order;
	}

	public async Task<bool> CheckQuantityProduct(Guid productId, int quantity, CancellationToken cancellation = default)
	{
		var product = await _dbContext.Set<Product>()
			.FirstOrDefaultAsync(s => s.Id == productId, cancellation);

		if (product == null)
		{
			return false;
		}

		if (product.Quantity >= quantity)
		{
			return true;
		}

		return false;
	}

	public async Task<Order> GetOrderByIdAsync(Guid orderId, CancellationToken cancellation = default)
	{
		var order = await _dbContext.Set<Order>()
			.Include(s => s.Details)
			.Include(s => s.Discount)
			.FirstOrDefaultAsync(s => s.Id == orderId, cancellation);

		if (order == null)
		{
			return null;
		}
		
		foreach (var detail in order.Details)
		{
			order.Total += detail.TotalPrice;
		}

		return order;
	}

	public async Task<Order> ToggleOrderAsync(Order order, CancellationToken cancellation = default)
	{
		order.Status = OrderStatus.Approved;
		
		_dbContext.Entry(order).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync(cancellation);
		return order;
	}

	public async Task<IPagedList<T>> GetPagedOrdersAsync<T>(IOrderQuery condition, IPagingParams pagingParams, Func<IQueryable<Order>, IQueryable<T>> mapper)
	{
		var orders = FilterOrder(condition);
		var projectedOrders = mapper(orders);

		return await projectedOrders.ToPagedListAsync(pagingParams);
	}

	private IQueryable<Order> FilterOrder(IOrderQuery condition)
	{
		var orders = _dbContext.Set<Order>()
			.Include(s => s.Details)
			.Include(s => s.Discount)
			.WhereIf(condition.Year > 0, s => s.OrderDate.Year == condition.Year)
			.WhereIf(condition.Month > 0, s => s.OrderDate.Month == condition.Month)
			.WhereIf(condition.Day > 0, s => s.OrderDate.Day == condition.Day)
			.WhereIf(!string.IsNullOrEmpty(condition.Keyword), s =>
				s.FirstName.ToLower().Contains(condition.Keyword.ToLower()) ||
				s.LastName.ToLower().Contains(condition.Keyword.ToLower()) ||
				s.Email.Contains(condition.Keyword) ||
				s.Phone.Contains(condition.Keyword) ||
				s.ShipAddress.Contains(condition.Keyword));
		return orders;
	}
}