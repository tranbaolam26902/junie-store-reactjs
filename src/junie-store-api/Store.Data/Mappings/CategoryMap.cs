using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class CategoryMap : IEntityTypeConfiguration<Category>
{
	public void Configure(EntityTypeBuilder<Category> builder)
	{
		builder.ToTable("Categories");

		builder.HasKey(p => p.Id);

		builder.Property(p => p.Name)
			.HasMaxLength(128)
			.IsRequired();

		builder.Property(p => p.Description)
			.HasMaxLength(512);

		builder.Property(p => p.UrlSlug)
			.HasMaxLength(256)
			.IsRequired();

		builder.Property(c => c.ShowOnMenu)
			.IsRequired()
			.HasDefaultValue(false);

		builder.Property(s => s.IsDeleted)
			.IsRequired()
			.HasDefaultValue(false);
	}
}