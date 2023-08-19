namespace Store.Core.Identity;

public interface IPasswordHasher
{
	string Hash(string password);

	bool VerifyPassword(string password, string inputPassword);
}