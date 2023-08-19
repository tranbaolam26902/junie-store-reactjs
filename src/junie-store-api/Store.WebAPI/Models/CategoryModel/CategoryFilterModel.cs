namespace Store.WebAPI.Models.CategoryModel;

public class CategoryFilterModel : PagingModel
{
	public string Keyword { get; set; }
}