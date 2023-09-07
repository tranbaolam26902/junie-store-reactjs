using Store.Core.Entities;
using Store.Core.Identity;
using Store.Data.Contexts;

namespace Store.Data.Seeder;

public class DataSeeder : IDataSeeder
{
	private readonly StoreDbContext _dbContext;
	private readonly IPasswordHasher _hasher;

	public DataSeeder(StoreDbContext dbContext, IPasswordHasher hasher)
	{
		_dbContext = dbContext;
		_hasher = hasher;
	}

	public void Initialize()
	{
		_dbContext.Database.EnsureCreated();

		if (_dbContext.Users.Any())
		{
			return;
		}
		var roles = AddRoles();
		var users = AddUsers(roles);

		var categories = AddCategories();
		var discounts = AddDiscount();
		var suppliers = AddSuppliers();
		var products = AddProduct(categories, users, suppliers);

	}

	private IList<Role> AddRoles()
	{
		var roles = new List<Role>()
		{
			new() {Id = Guid.NewGuid(), Name = "Admin"},
			new() {Id = Guid.NewGuid(), Name = "Manager"},
			new() {Id = Guid.NewGuid(), Name = "User"}
		};

		_dbContext.Roles.AddRange(roles);
		_dbContext.SaveChanges();
		return roles;
	}

	private IList<User> AddUsers(IList<Role> roles)
	{
		var users = new List<User>()
		{
			new ()
			{
				Name = "Admin",
				Email = "Admin@gmail.com",
				Address = "DLU",
				Phone = "0123456789",
				Username = "admin",
				CreatedDate = DateTime.Now,
				Password = _hasher.Hash("admin123"),
				Roles = new List<Role>()
				{
					roles[0],
					roles[1],
					roles[2]
				}
			}
		};

		_dbContext.Users.AddRange(users);
		_dbContext.SaveChanges();

		return users;
	}

	private IList<Category> AddCategories()
	{
		var categories = new List<Category>()
		{
			new() { Name = "Bông tai", Description = "Bông tai", UrlSlug = "bong-tai"},
			new() { Name = "Dây truyền", Description = "Dây truyền", UrlSlug = "day-truyen"},
			new() { Name = "Vòng tay", Description = "Vòng tay", UrlSlug = "vong-tay"},
			new() { Name = "Nhẫn", Description = "Nhẫn", UrlSlug = "nhan"},
		};

		_dbContext.Categories.AddRange(categories);
		_dbContext.SaveChanges();
		return categories;
	}

	private IList<Discount> AddDiscount()
	{
		var discount = new List<Discount>()
		{
			new() {Id = Guid.NewGuid(), Code = "100000001", Active = true, DiscountPercentage = 50, CreateDate = DateTime.Now, ExpiryDate = DateTime.Now.AddMonths(2), MinPrice = 0, Quantity = 100},
			new() {Id = Guid.NewGuid(), Code = "100000002", Active = true, DiscountPercentage = 50, CreateDate = DateTime.Now, ExpiryDate = DateTime.Now.AddMonths(2), MinPrice = 0, Quantity = 100},
			new() {Id = Guid.NewGuid(), Code = "100000003", Active = true, DiscountPercentage = 50, CreateDate = DateTime.Now, ExpiryDate = DateTime.Now.AddMonths(2), MinPrice = 0, Quantity = 100},
			new() {Id = Guid.NewGuid(), Code = "100000004", Active = true, DiscountPercentage = 50, CreateDate = DateTime.Now, ExpiryDate = DateTime.Now.AddMonths(2), MinPrice = 0, Quantity = 100},
		};

		_dbContext.Discounts.AddRange(discount);
		_dbContext.SaveChanges();
		return discount;
	}

	private IList<Supplier> AddSuppliers()
	{
		var suppliers = new List<Supplier>()
		{
			new()
			{
				Address = "DLU",
				ContactName = "DLU",
				Description = "",
				Email = "demo@gmail.com",
				Name = "DLU",
				Phone = "",
				IsDeleted = false,
			}
		};

		_dbContext.Suppliers.AddRange(suppliers);
		_dbContext.SaveChanges();

		return suppliers;
	}

	private IList<Product> AddProduct(IList<Category> categories, IList<User> users, IList<Supplier> suppliers)
	{
		var product = new List<Product>()
		{
			new()
			{
				Quantity = 10,
				Name = "Nhẫn Charlotte",
				CreateDate = DateTime.Now,
				CategoryId = categories[3].Id,
				ShortIntro =
					"Tinh tế, duyên dáng những vẫn sang trọng là những điều mà chúng ta sẽ cảm nhận được khi đeo trên mình các trang sức làm từ ngọc trai." +
					" Ẩn chứa trong mỗi viên ngọc trai đều là một vẻ đẹp đầy sự thu hút, mà càng nhìn lại càng thấy yêu hơn.",
				Description = "Lần đầu tiên cho ra mắt sản phẩm về nhẫn, " +
				              "Junie ưu ái mang tới sự kết hợp từ ngọc trai nước ngọt nhỏ nhắn nhưng không kém phần nổi bật và những viên đá Cubic Zirconia lấp lánh kiêu sa." +
				              "\r\n\r\nMột chiếc nhẫn nhỏ xinh mà bạn có thể diện vào bất cứ lúc nào, bất cứ ở nơi đâu và bất cứ khi bạn muốn lựa chọn vẻ xinh đẹp riêng phù hợp với chính mình.",
				Active = true,
				Discount = 10,
				Price = 100000,
				UrlSlug = "nhan-charlotte",
				Pictures = new List<Picture>()
				{
					new()
					{
						Path = "images/default.png",
						Active = true
					}
				},
				Sku = "R-CHARLOTTE",
				Note = "",
				Supplier = suppliers[0]
			}
		};

		_dbContext.Products.AddRange(product);
		_dbContext.SaveChanges();
		return product;
	}
}