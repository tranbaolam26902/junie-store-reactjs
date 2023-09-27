namespace Store.WebAPI.Models.CategoryModel;

public class CategoryFilterModel : PagingModel
{
	public string Keyword { get; set; } = "";

	public bool? ShowOnMenu { get; set; } = false;
}

public class CategoryManagerFilter : CategoryFilterModel
{

	public bool? IsDeleted { get; set; } = false;
}

public class CategoryRelateModel
{
	public string Keyword { get; set; } = "";

	public string UrlSlug { get; set; } = "";
}