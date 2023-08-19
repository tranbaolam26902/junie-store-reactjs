using Store.Core.Constants;

namespace Store.WebAPI.Models.OrderModel;

public class OrderEditModel
{
	public string FirstName { get; set; }

	public string LastName { get; set; }

	public string Email { get; set; }

	public string ShipAddress { get; set; }

	public string ShipTel { get; set; } 

	public string Note { get; set; }

	public IList<OrderDetailEdit> Detail { get; set; }
}
