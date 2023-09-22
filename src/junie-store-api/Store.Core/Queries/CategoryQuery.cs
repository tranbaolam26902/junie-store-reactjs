namespace Store.Core.Queries;

public class CategoryQuery : ICategoryQuery
{
	public string Keyword { get; set; } = "";
	public string UrlSlug { get; set; } = "";
}