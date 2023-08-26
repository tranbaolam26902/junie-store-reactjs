namespace Store.WebAPI.Models.SupplierModel;

public class SupplierFilterModel : PagingModel
{
	public string Keyword { get; set; }

	public bool? IsDeleted { get; set; }
}