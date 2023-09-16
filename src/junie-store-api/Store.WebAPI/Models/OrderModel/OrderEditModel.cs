using Store.Core.Constants;

namespace Store.WebAPI.Models.OrderModel;

public class OrderEditModel
{
	public string Name { get; set; }
	
	public string ShipAddress { get; set; }

	public string Phone { get; set; } 

	public string Note { get; set; }

	public string DiscountCode { get; set; }

	public IList<OrderDetailEdit> Detail { get; set; }
}
