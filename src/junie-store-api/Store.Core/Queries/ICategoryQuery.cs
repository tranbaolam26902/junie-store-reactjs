namespace Store.Core.Queries;

public interface ICategoryQuery
{
	public string Keyword { get; set; }

	public string UrlSlug { get; set; }

	public bool ShowOnMenu { get; set; }

	public bool IsDeleted { get; set; }
}