using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class SupplierMap : IEntityTypeConfiguration<Supplier>
{
	public void Configure(EntityTypeBuilder<Supplier> builder)
	{
		builder.ToTable("Suppliers");

		builder.HasKey(s => s.Id);

		builder.Property(s => s.Name)
			.HasMaxLength(1024)
			.IsRequired();

		builder.Property(s => s.Description)
			.HasMaxLength(2048);

		builder.Property(s => s.ContactName)
			.HasMaxLength(1024)
			.IsRequired();

		builder.Property(s => s.Address)
			.HasMaxLength(1024)
			.IsRequired()
			.HasDefaultValue("");

		builder.Property(s => s.Email)
			.HasMaxLength(512)
			.IsRequired()
			.HasDefaultValue("");

		builder.Property(s => s.Phone)
			.HasMaxLength(1024)
			.IsRequired()
			.HasDefaultValue("");

		builder.Property(p => p.IsDeleted)
			.IsRequired()
			.HasDefaultValue(false);

		builder.HasMany(p => p.Products)
			.WithOne(u => u.Supplier)
			.HasForeignKey(u => u.SupplierId)
			.HasConstraintName("FK_Product_Supplier")
			.OnDelete(DeleteBehavior.Cascade);
	}
}