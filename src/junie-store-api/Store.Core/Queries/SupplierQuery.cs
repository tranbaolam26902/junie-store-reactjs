namespace Store.Core.Queries;

public class SupplierQuery : ISupplierQuery
{
	public string Keyword { get; set; }
	public bool IsDeleted { get; set; }
}