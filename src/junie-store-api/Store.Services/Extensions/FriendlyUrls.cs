using Slugify;

namespace Store.Services.Extensions;

public static class FriendlyUrls
{

	public static string GenerateSlug(this string input)
	{
		var slugHelper = new SlugHelper();
		return slugHelper.GenerateSlug(input);
	}
}