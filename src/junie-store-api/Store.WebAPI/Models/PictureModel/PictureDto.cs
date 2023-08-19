namespace Store.WebAPI.Models.PictureModel;

public class PictureDto
{
	public Guid Id { get; set; }

	public Guid ProductId { get; set; }

	public string Path { get; set; }

	public bool Active { get; set; }
}