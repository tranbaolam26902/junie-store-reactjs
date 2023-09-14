using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class AccountMap : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> builder)
	{
		builder.ToTable("Users");

		builder.HasKey(p => p.Id);

		builder.Property(p => p.Name)
			.IsRequired()
			.HasMaxLength(128)
			.HasDefaultValue("");

		builder.Property(p => p.Email)
			.IsRequired()
			.HasDefaultValue("");

		builder.Property(s => s.Username)
			.IsRequired()
			.HasMaxLength(128);

		builder.Property(s => s.Password)
			.IsRequired()
			.HasMaxLength(512);

		builder.HasMany(s => s.Roles)
			.WithMany(s => s.Users)
			.UsingEntity(pt => pt.ToTable("UserInRoles"));

		builder
			.HasOne(u => u.UserLogin)
			.WithOne(ul => ul.User)
			.HasForeignKey<UserLogin>(ul => ul.Id);
	}
}

public class RoleMap : IEntityTypeConfiguration<Role>
{
	public void Configure(EntityTypeBuilder<Role> builder)
	{
		builder.ToTable("Roles");

		builder.HasKey(p => p.Id);

		builder.Property(p => p.Name)
			.HasMaxLength(128);
	}
}