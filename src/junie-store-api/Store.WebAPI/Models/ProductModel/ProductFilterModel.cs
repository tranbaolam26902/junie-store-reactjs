namespace Store.WebAPI.Models.ProductModel;

public class ProductFilterModel : PagingModel
{
	public string Keyword { get; set; }
	public string CategorySlug { get; set; }

	public string ProductSlug { get; set; }


	public bool? Active { get; set; }

	public bool? IsDeleted { get; set; }

	public int? Year { get; set; }

	public int? Month { get; set; }

	public int? Day { get; set; }
}