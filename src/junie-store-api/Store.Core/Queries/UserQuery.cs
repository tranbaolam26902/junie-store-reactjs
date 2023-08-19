namespace Store.Core.Queries;

public class UserQuery : IUserQuery
{
	public string Keyword { get; set; } = "";
}