using Slugify;

namespace Store.Services.Extensions;

public class FriendlyUrls
{
	public static string GenerateSlug(string input)
	{
		var slugHelper = new SlugHelper();
		return slugHelper.GenerateSlug(input);
	}


}