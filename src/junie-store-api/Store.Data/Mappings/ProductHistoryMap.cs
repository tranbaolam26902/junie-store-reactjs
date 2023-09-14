using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class ProductHistoryMap : IEntityTypeConfiguration<ProductHistory>
{
	public void Configure(EntityTypeBuilder<ProductHistory> builder)
	{
		builder.ToTable("ProductHistories");

		builder.HasKey(s => s.Id);

		builder.Property(s => s.ActionTime)
			.IsRequired()
			.HasColumnType("datetime");

		builder.Property(s => s.EditReason)
			.IsRequired()
			.HasMaxLength(2048);

		builder.Property(s => s.HistoryAction)
			.IsRequired()
			.HasDefaultValue(ProductHistoryAction.None);

		builder.HasOne(o => o.Product)
			.WithMany(d => d.ProductHistories)
			.HasForeignKey(d => d.ProductId)
			.HasConstraintName("FK_Products_Histories")
			.OnDelete(DeleteBehavior.Cascade);

		builder.HasOne(o => o.User)
			.WithMany(d => d.ProductHistories)
			.HasForeignKey(d => d.UserId)
			.HasConstraintName("FK_Users_Histories")
			.OnDelete(DeleteBehavior.Cascade);
	}
}