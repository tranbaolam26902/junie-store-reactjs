using Microsoft.EntityFrameworkCore;
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
	public async Task<Order> AddOrderAsync(Order order, User user, CancellationToken cancellation = default)
	{
		order.Email = user.Email;
		order.UserId = user.Id;
		order.OrderDate = DateTime.Now;
		order.Status = OrderStatus.New;

		var codes = Guid.NewGuid().ToString().Split('-');
		order.CodeOrder = $"HD{codes[0]}{codes[1]}".ToUpper();

		_dbContext.Orders.Add(order);
		await _dbContext.SaveChangesAsync(cancellation);
		return order;
	}

	public async Task<Order> AddDiscountOrderAsync(Order order, string discountCode, CancellationToken cancellation = default)
	{
		var discount = await CheckValidDiscountAsync(discountCode, order.Total, cancellation);

		order.DiscountAmount = discount.DiscountAmount;
		order.IsDiscountPercentage = discount.IsDiscountPercentage;

		order.Discount = discount;

		discount.Quantity--;

		_dbContext.Entry(discount).State = EntityState.Modified;
		_dbContext.Entry(order).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync(cancellation);

		return order;
	}

	public async Task<Discount> CheckValidDiscountAsync(string discountCode, double totalBill,
		CancellationToken cancellation)
	{
		var discount = await _dbContext.Set<Discount>()
			.FirstOrDefaultAsync(s =>
				s.Code == discountCode &&
				s.Active &&
				s.ExpiryDate >= DateTime.Now, cancellation);

		if (discount == null)
		{
			// No valid discount found
			return null;
		}

		if (discount.Quantity <= 0)
		{
			return null;
		}

		if (totalBill < discount.MinPrice)
		{
			return null;
		}

		// Valid discount found
		return discount;
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
				Quantity = item.Quantity,
				OrderId = order.Id
			};
			product.Quantity -= item.Quantity;
			product.CountOrder += item.Quantity;
			_dbContext.Entry(product).State = EntityState.Modified;

			//order.Total += detail.Quantity * detail.Price;
			order.Details.Add(detail);
		}

		_dbContext.Entry(order).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync(cancellation);

		return order;
	}

	public async Task<Order> GetProductOrderAsync(IList<OrderDetailEdit> details, CancellationToken cancellation = default)
	{
		var order = new Order();

		foreach (var item in details)
		{
			var product = await _dbContext.Set<Product>()
				.FirstOrDefaultAsync(s => s.Id == item.Id, cancellation);

			var detail = new OrderDetail()
			{
				ProductId = product.Id,
				Price = product.Price - (product.Price * product.Discount) / 100,
				Quantity = item.Quantity,
				OrderId = order.Id
			};
			product.Quantity -= item.Quantity;

			order.Total += detail.Quantity * detail.Price;
		}

		return order;
	}

	public async Task<bool> CheckQuantityProduct(Guid productId, int quantity, CancellationToken cancellation = default)
	{
		var product = await _dbContext.Set<Product>()
			.FirstOrDefaultAsync(s => s.Id == productId && s.Active, cancellation);

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
			.ThenInclude(s => s.Product)
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

	public async Task<Order> GetOrderByCodeAsync(string code, CancellationToken cancellation = default)
	{
		return await _dbContext.Set<Order>()
			.Include(s => s.Details)
			.ThenInclude(s => s.Product)
			.ThenInclude(p => p.Pictures)
			.Include(s => s.Discount)
			.FirstOrDefaultAsync(s => s.CodeOrder == code, cancellation);
	}

	public async Task<Order> ToggleOrderAsync(Order order, OrderStatus status, CancellationToken cancellation = default)
	{
		order.Status = status;

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

	public async Task<IPagedList<T>> GetPagedOrdersByUserAsync<T>(Guid userId, IOrderQuery condition, IPagingParams pagingParams, Func<IQueryable<Order>, IQueryable<T>> mapper)
	{
		var orders = FilterOrder(condition, userId);
		var projectedOrders = mapper(orders);

		return await projectedOrders.ToPagedListAsync(pagingParams);
	}

	public async Task<Order> CancelOrderAsync(Guid orderId, CancellationToken cancellation = default)
	{
		var order = await _dbContext.Set<Order>()
			.Include(s => s.Details)
			.ThenInclude(s => s.Product)
			.Include(s => s.Discount)
			.FirstOrDefaultAsync(s => s.Id == orderId, cancellation);

		order.Status = OrderStatus.Cancelled;
		foreach (var item in order.Details)
		{

			var product = await _dbContext.Set<Product>()
				.FirstOrDefaultAsync(s => s.Id == item.ProductId, cancellation);

			product.Quantity += item.Quantity;
			product.CountOrder -= item.Quantity;
			_dbContext.Entry(product).State = EntityState.Modified;
		}

		_dbContext.Entry(order).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync(cancellation);

		return order;
	}

	private IQueryable<Order> FilterOrder(IOrderQuery condition, Guid userId = default)
	{
		var orders = _dbContext.Set<Order>()
			.Include(s => s.Details)
			.Include(s => s.Discount)
			.WhereIf(userId != Guid.Empty, s => s.UserId == userId)
			.WhereIf(condition.Status != null && condition.Status != OrderStatus.None, o => o.Status == condition.Status)
			.WhereIf(condition.Year > 0, s => s.OrderDate.Year == condition.Year)
			.WhereIf(condition.Month > 0, s => s.OrderDate.Month == condition.Month)
			.WhereIf(condition.Day > 0, s => s.OrderDate.Day == condition.Day)
			.WhereIf(!string.IsNullOrEmpty(condition.Keyword), s =>
				s.Name.ToLower().Contains(condition.Keyword.ToLower()) ||
				s.Email.Contains(condition.Keyword) ||
				s.Phone.Contains(condition.Keyword) ||
				s.ShipAddress.Contains(condition.Keyword));
		return orders;
	}
}