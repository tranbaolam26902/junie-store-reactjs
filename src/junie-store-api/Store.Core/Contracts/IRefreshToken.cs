namespace Store.Core.Contracts;

public interface IRefreshToken
{
	public string Token { get; set; }
	public DateTime Created { get; set; }
	public DateTime Expires { get; set; }
}