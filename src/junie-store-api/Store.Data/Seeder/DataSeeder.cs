using Store.Core.Entities;
using Store.Core.Identity;
using Store.Data.Contexts;
using System.Collections.Generic;

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
				Id = Guid.NewGuid(),
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
			new() {Id = Guid.NewGuid(), Name = "Light novel", Description = "Light novel", UrlSlug = "light-novel"},
			new() {Id = Guid.NewGuid(), Name = "Manga", Description = "Manga", UrlSlug = "manga"},
			new() {Id = Guid.NewGuid(), Name = "Novel", Description = "Novel", UrlSlug = "novel"},
			new() {Id = Guid.NewGuid(), Name = "Comic", Description = "Comic", UrlSlug = "comic"},
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
				Id = Guid.NewGuid(),
				Address = "DLU",
				ContactName = "DLU",
				Description = "",
				Email = "demo@gmail.com",
				Name = "asd",
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
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				Name = "Subaru Và Vì Tinh Tú Thứ Bảy – Tập 1",
				CreateDate = DateTime.Now,
				CategoryId = categories[0].Id,
				ShortIntro = "Một Kaze hòa đồng, tươi sáng và một Moto giản đơn, nghiêm túc lại là bạn thân từ nhỏ.",
				Description = "Tại thế giới game nổi tiếng “Union”, có một nhóm người chơi đã trở thành huyền thoại. " +
				              "Tên của họ là Subaru. Họ là nhóm học sinh tiểu học đã thân thiết với nhau từ bé, cùng với Sense của mỗi người, " +
				              "họ đã chạm đến đỉnh cao nhất của game. Thế nhưng, sự kiện chết người đó đã khiến “Union” chấm dứt hoạt động." +
				              " Nhóm bạn thân thiết cũng chia xa. 6 năm sau, Haruto giờ đã là học sinh trung học phổ thông. " +
				              "Cậu lần nữa đăng nhập vào thế giới game mới là “ReUnion”, rồi có cuộc hội ngộ với thiếu nữ nọ. " +
				              "Cô ấy là Asahi – đồng đội của cậu khi còn ở Subaru, là bạn thanh mai trúc mã, và cũng là người đã chết sáu năm trước." +
				              " Liệu Asahi là hồn ma điện tử, hay thứ gì khác…? Giao giữa hiện thực và thế giới trong game, " +
				              "tiểu thuyết thanh xuân đầy đột phá!",
				Active = true,
				Discount = 10,
				Price = 100000,
				UrlSlug = "subaru-va-vi-tinh-tu-thu-bay-tap-1",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				},
				Sku = "",
				Note = "",
				User = users[0],
				Supplier = suppliers[0]
			}
		};

		_dbContext.Products.AddRange(product);
		_dbContext.SaveChanges();
		return product;
	}


}