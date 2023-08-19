namespace Store.WebAPI.Models.UserModel;

public class UserFilterModel : PagingModel
{
	public string Keyword { get; set; } = "";
}