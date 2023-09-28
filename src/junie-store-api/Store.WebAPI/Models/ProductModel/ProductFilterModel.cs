namespace Store.WebAPI.Models.ProductModel;

public class ProductFilterModel : PagingModel
{
	public string Keyword { get; set; }

	public string CategorySlug { get; set; }

	public string SubCategorySlug { get; set; }

	public string ProductSlug { get; set; }

	public bool? Active { get; set; }

	public double? MinPrice { get; set; }

	public double? MaxPrice { get; set; }

	public bool? IsDeleted { get; set; }

	public bool? IsPublished { get; set; }

	public int? Year { get; set; }

	public int? Month { get; set; }

	public int? Day { get; set; }
}