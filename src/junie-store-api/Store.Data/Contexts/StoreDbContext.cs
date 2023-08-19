using Microsoft.EntityFrameworkCore;
using Store.Core.Entities;
using Store.Data.Mappings;

namespace Store.Data.Contexts
{
	public class StoreDbContext : DbContext
	{
		public DbSet<Product> Products { get; set; }

		public DbSet<Picture> Pictures { get; set; }

		public DbSet<Feedback> Feedback { get; set; }

		public DbSet<Order> Orders { get; set; }

		public DbSet<OrderDetail> OrderDetails { get; set; }

		public DbSet<Discount> Discounts { get; set; }

		public DbSet<Category> Categories { get; set; }

		public DbSet<Supplier> Suppliers { get; set; }

		public DbSet<User> Users { get; set; }

		public DbSet<Role> Roles { get; set; }

		public DbSet<UserLogin> UserLogin { get; set; }


		public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options)
		{
			
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(CategoryMap).Assembly);
		}
	}
}
