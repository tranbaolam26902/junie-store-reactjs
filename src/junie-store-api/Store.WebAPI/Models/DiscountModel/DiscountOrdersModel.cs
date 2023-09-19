using Store.Core.Constants;

namespace Store.WebAPI.Models.DiscountModel;

public class DiscountOrdersModel
{
	public string DiscountCode { get; set; }

	public IList<OrderDetailEdit> Detail { get; set; }
}