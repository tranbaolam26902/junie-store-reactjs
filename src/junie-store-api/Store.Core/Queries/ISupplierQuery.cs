namespace Store.Core.Queries;

public interface ISupplierQuery
{
	public string Keyword { get; set; }

	public bool IsDeleted { get; set; }
}