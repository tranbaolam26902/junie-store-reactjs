using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Core.Entities;

namespace Store.Data.Mappings;

public class FeedbackPictureMap : IEntityTypeConfiguration<FeedbackPicture>
{
	public void Configure(EntityTypeBuilder<FeedbackPicture> builder)
	{
		builder.ToTable("FeedbackPictures");

		builder.HasKey(x => x.Id);

		builder.Property(s => s.Path)
			.IsRequired()
			.HasMaxLength(512)
			.HasDefaultValue("");

		builder.HasOne(s => s.Feedback)
			.WithMany(s => s.Pictures)
			.HasForeignKey(s => s.FeedbackId)
			.HasConstraintName("FK_Feedback_Pictures")
			.OnDelete(DeleteBehavior.Cascade);
	}
}