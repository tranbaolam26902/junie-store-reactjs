using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Core.Queries;

namespace Store.Services.Shops;

public interface IUserRepository
{
	Task<User> LoginAsync(string username, string password, CancellationToken cancellationToken = default);

	Task<bool> DeleteRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
	Task<UserLogin> GetRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);

	Task<User> GetUserByIdAsync(Guid userId, bool getFull = false, CancellationToken cancellationToken = default);

	Task<bool> ChangePasswordAsync(User user, string oldPassword, string newPassword, CancellationToken cancellationToken = default);

	Task<User> Register(User user, IEnumerable<Guid> roles,
		CancellationToken cancellationToken = default);

	Task<Role> GetRoleByNameAsync(string role,
		CancellationToken cancellationToken = default);

	Task<bool> IsUserExistedAsync(string userName, CancellationToken cancellationToken = default);

	Task<IList<Role>> GetRolesAsync(CancellationToken cancellationToken = default);
	Task<User> SetUserRolesAsync(Guid userId, Guid roleId, CancellationToken cancellationToken = default);

	Task<UserLogin> SetRefreshTokenAsync(Guid userId, IRefreshToken refreshToken, CancellationToken cancellationToken = default);

	Task<User> GetUserRefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);

	Task<User> UpdateProfileAsync(User user, CancellationToken cancellationToken = default);

	Task<IPagedList<T>> GetPagedUsersAsync<T>(
		UserQuery condition,
		IPagingParams pagingParams,
		Func<IQueryable<User>, IQueryable<T>> mapper,
		CancellationToken cancellationToken = default);
}