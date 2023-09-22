using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class OrderMap : IEntityTypeConfiguration<Order>
{
	public void Configure(EntityTypeBuilder<Order> builder)
	{
		// Configure the primary key
		builder.HasKey(o => o.Id);
		
		builder.Property(o => o.Name)
			.IsRequired()
			.HasMaxLength(128);
		
		builder.Property(s => s.CodeOrder)
			.IsRequired()
			.HasMaxLength(128);

		builder.Property(o => o.Email)
			.IsRequired()
			.HasMaxLength(128);

		builder.Property(o => o.ShipAddress)
			.IsRequired()
			.HasMaxLength(512);

		builder.Property(o => o.Phone)
			.IsRequired()
			.HasMaxLength(12);

		builder.Property(o => o.Note)
			.HasMaxLength(1024);

		builder.Property(s => s.DiscountAmount)
			.HasDefaultValue(0);

		builder.Property(s => s.IsDiscountPercentage)
			.IsRequired()
			.HasDefaultValue(false);

		// Configure the details collection
		builder.HasMany(o => o.Details)
			.WithOne(d => d.Order)
			.HasForeignKey(d => d.OrderId)
			.HasConstraintName("FK_Orders_Details")
			.OnDelete(DeleteBehavior.Cascade);

		// Configure the timestamps
		builder.Property(o => o.OrderDate)
			.IsRequired()
			.HasColumnType("datetime");
		
		// Configure the table name
		builder.ToTable("Orders");
	}
}