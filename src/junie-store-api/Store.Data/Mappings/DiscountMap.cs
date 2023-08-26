using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Core.Contracts;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class DiscountMap : IEntityTypeConfiguration<Discount>
{
	public void Configure(EntityTypeBuilder<Discount> builder)
	{
		builder.HasKey(x => x.Id);

		builder.ToTable("Discounts");

		builder.Property(s => s.Quantity)
			.IsRequired()
			.HasDefaultValue(0);

		builder.Property(s => s.MinPrice)
			.HasDefaultValue(0);

		builder.Property(s => s.CreateDate)
			.IsRequired()
			.HasColumnType("datetime");

		builder.Property(s => s.ExpiryDate)
			.IsRequired()
			.HasColumnType("datetime");

		builder.Property(s => s.Code)
			.IsRequired()
			.HasMaxLength(128);

		builder.Property(s => s.DiscountPercentage)
			.IsRequired()
			.HasDefaultValue(0);

		builder.Property(s => s.Active)
			.IsRequired()
			.HasDefaultValue(false);

		builder.Property(s => s.ShowOnMenu)
			.IsRequired()
			.HasDefaultValue(false);
	}
}