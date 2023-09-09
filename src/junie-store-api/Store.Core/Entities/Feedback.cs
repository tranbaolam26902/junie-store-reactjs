namespace Store.Core.Entities;

public class Feedback
{
	public Guid Id { get; set; }

	public Guid ProductId { get; set; }

	public string UserName { get; set; }

	public DateTime PostDate { get; set; }

	public string Content { get; set; }

	public int Rate { get; set; }

	// ======================================================
	// Navigation properties
	// ======================================================

	public Product Product { get; set; }

	public IList<FeedbackPicture> Pictures { get; set; }
}

public class FeedbackPicture
{
	public Guid Id { get; set; }
	
	public Guid FeedbackId { get; set; }

	public string Path { get; set; }

	// ======================================================
	// Navigation properties
	// ======================================================

	public Feedback Feedback { get; set; }
}