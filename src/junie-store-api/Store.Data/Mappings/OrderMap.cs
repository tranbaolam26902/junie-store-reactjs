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
		
		builder.Property(o => o.FirstName)
			.IsRequired()
			.HasMaxLength(56);
		
		builder.Property(o => o.LastName)
			.HasMaxLength(56);

		builder.Property(s => s.CodeOrder)
			.IsRequired()
			.HasMaxLength(128);

		builder.Property(o => o.Email)
			.IsRequired()
			.HasMaxLength(100);

		builder.Property(o => o.ShipAddress)
			.IsRequired()
			.HasMaxLength(512);

		builder.Property(o => o.Phone)
			.IsRequired()
			.HasMaxLength(12);

		builder.Property(o => o.Note)
			.HasMaxLength(512);

		// Configure the details collection
		builder.HasMany(o => o.Details)
			.WithOne(d => d.Order)
			.HasForeignKey(d => d.OrderId)
			.HasConstraintName("FK_Orders_Details")
			.OnDelete(DeleteBehavior.Cascade);

		builder.HasOne(o => o.User)
			.WithMany(u => u.Orders)
			.HasForeignKey(o => o.UserId)
			.HasConstraintName("FK_Orders_Users")
			.IsRequired(false);

		// Configure the timestamps
		builder.Property(o => o.OrderDate)
			.IsRequired()
			.HasColumnType("datetime");
		
		// Configure the table name
		builder.ToTable("Orders");
	}
}