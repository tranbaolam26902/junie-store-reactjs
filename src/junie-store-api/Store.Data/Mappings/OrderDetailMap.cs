using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class OrderDetailMap : IEntityTypeConfiguration<OrderDetail>
{
	public void Configure(EntityTypeBuilder<OrderDetail> builder)
	{
		builder.HasKey(od => new
		{
			od.OrderId,
			od.ProductId,
		});

		builder.ToTable("OrderDetails");
	}
}