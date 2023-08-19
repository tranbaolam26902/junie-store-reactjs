using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Infrastructure;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class ProductMap : IEntityTypeConfiguration<Product>
{
	public void Configure(EntityTypeBuilder<Product> builder)
	{
		builder.ToTable("Products");

		builder.HasKey(s => s.Id);

		builder.Property(s => s.Name)
			.IsRequired()
			.HasMaxLength(128);

		builder.Property(s => s.UrlSlug)
			.IsRequired()
			.HasMaxLength(256);

		builder.Property(s => s.Sku)
			.IsRequired()
			.HasMaxLength(256);

		builder.Property(s => s.ShortIntro)
			.IsRequired()
			.HasMaxLength(256);

		builder.Property(s => s.Description)
			.HasMaxLength(2048);

		builder.Property(s => s.Price)
			.IsRequired()
			.HasDefaultValue(0);

		builder.Property(s => s.Quantity)
			.IsRequired()
			.HasDefaultValue(0);

		builder.Property(s => s.MinQuantity)
			.IsRequired()
			.HasDefaultValue(0);

		builder.Property(s => s.Discount)
			.HasDefaultValue(0);

		builder.Property(p => p.Active)
			.IsRequired()
			.HasDefaultValue(false);

		builder.Property(s => s.Note)
			.HasMaxLength(2048);

		// Configure the timestamps
		builder.Property(o => o.CreateDate)
			.HasColumnType("datetime");

		builder.HasOne(p => p.Category)
			.WithMany(c => c.Products)
			.HasForeignKey(p => p.CategoryId)
			.HasConstraintName("FK_Products_Categories")
			.OnDelete(DeleteBehavior.Cascade);

		builder.HasMany(s => s.Pictures)
			.WithOne(s => s.Product)
			.HasForeignKey(s => s.ProductId)
			.HasConstraintName("FK_Products_Pictures")
			.OnDelete(DeleteBehavior.Cascade);

		builder.HasMany(o => o.Details)
			.WithOne(d => d.Product)
			.HasForeignKey(d => d.ProductId)
			.HasConstraintName("FK_Products_Details")
			.OnDelete(DeleteBehavior.Cascade);

		builder.HasOne(p => p.User)
			.WithMany(u=> u.Products)
			.HasForeignKey(u => u.UserId)
			.HasConstraintName("FK_Products_Users")
			.OnDelete(DeleteBehavior.Cascade);

		builder.HasOne(p => p.Supplier)
			.WithMany(s => s.Products)
			.HasForeignKey(s => s.SupplierId)
			.HasConstraintName("FK_Products_Suppliers")
			.OnDelete(DeleteBehavior.Cascade);
	}
}