using Store.Core.Contracts;

namespace Store.Core.Collections;

public class RefreshToken : IRefreshToken
{
	public string Token { get; set; } = string.Empty;
	public DateTime Created { get; set; } = DateTime.Now;
	public DateTime Expires { get; set; }
}