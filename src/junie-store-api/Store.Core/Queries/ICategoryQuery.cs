namespace Store.Core.Queries;

public interface ICategoryQuery
{
	public string Keyword { get; set; }
	
	public string UrlSlug { get; set; }
}