namespace Store.WebAPI.Models.OrderModel;

public class OrderFilterModel : PagingModel
{
	public string Keyword { get; set; }
}