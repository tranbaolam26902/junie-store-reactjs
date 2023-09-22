namespace Store.WebAPI.Models.CategoryModel;

public class CategoryFilterModel : PagingModel
{
	public string Keyword { get; set; } = "";
}

public class CategoryRelateModel
{
	public string Keyword { get; set; } = "";

	public string UrlSlug { get; set; } = "";
}