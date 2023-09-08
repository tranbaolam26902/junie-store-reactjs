using Store.WebAPI.Models.CategoryModel;
using Store.WebAPI.Models.PictureModel;
using Store.WebAPI.Models.SupplierModel;

namespace Store.WebAPI.Models.ProductModel;

public class ProductDto
{
	public Guid Id { get; set; }

	public string Name { get; set; }

	public string Sku { get; set; }

	public string ShortIntro { get; set; }

	public DateTime CreateDate { get; set; }

	public string Description { get; set; }

	public string UrlSlug { get; set; }

	public double Price { get; set; }

	public int Quantity { get; set; }

	public float Discount { get; set; }

	public bool Active { get; set; }

	public bool IsDeleted { get; set; }

	public CategoryDto Category { get; set; }

	public IList<PictureDto> Pictures { get; set; }
}