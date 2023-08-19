using Store.Core.Contracts;

namespace Store.Core.Entities;

public class User : IEntity
{
	public Guid Id { get; set; }

	public string Name { get; set; }

	public DateTime CreatedDate { get; set; }

	public string Email { get; set; }

	public string Password { get; set; }

	public string Username { get; set; }

	public string Phone { get; set; }

	public string Address { get; set; }

	// ======================================================
	// Navigation properties
	// ======================================================

	public IList<Role> Roles { get; set; }

	public UserLogin UserLogin { get; set; }

	public IList<Product> Products { get; set; }

	public IList<Order> Orders { get; set; }

}

public class Role : IEntity
{
	public Guid Id { get; set; }
	public string Name { get; set; }

	public IList<User> Users { get; set; }
}

public class UserLogin : IEntity
{
	public Guid Id { get; set; }

	public string RefreshToken { get; set; }

	public DateTime TokenCreated { get; set; }

	public DateTime TokenExpires { get; set; }

	public User User { get; set; }
}