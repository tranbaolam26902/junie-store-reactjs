using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class FeedbackImageMap : IEntityTypeConfiguration<FeedbackImage>
{
	public void Configure(EntityTypeBuilder<FeedbackImage> builder)
	{
		builder.ToTable("FeedbackImages");

		builder.HasKey(x => x.Id);

		builder.Property(s => s.ImageUrl)
			.IsRequired()
			.HasMaxLength(512)
			.HasDefaultValue("");

		builder.HasOne(s => s.Feedback)
			.WithMany(s => s.Images)
			.HasForeignKey(s => s.FeedbackId)
			.HasConstraintName("FK_Feedback_Images")
			.OnDelete(DeleteBehavior.Cascade);
	}
}