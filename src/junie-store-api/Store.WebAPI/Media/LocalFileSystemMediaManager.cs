namespace Store.WebAPI.Media;

public class LocalFileSystemMediaManager : IMediaManager
{
	private const string PictureFolder = "uploads/pictures/{0}{1}";
	private readonly ILogger<LocalFileSystemMediaManager> _logger;

	public LocalFileSystemMediaManager(ILogger<LocalFileSystemMediaManager> logger)
	{
		_logger = logger;
	}

	public async Task<string> SaveFileAsync(Stream buffer, string originalFileName, string contentType,
		CancellationToken cancellationToken = default)
	{
		try
		{
			if (!buffer.CanRead || !buffer.CanSeek || buffer.Length == 0)
			{
				return null;
			}

			var fileExt = Path.GetExtension(originalFileName).ToLower();
			var returnFilePath = CreateFilePath(fileExt, contentType.ToLower());
			var fullPath = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "wwwroot", returnFilePath));

			buffer.Position = 0;

			await using var fileStream = new FileStream(
				fullPath, FileMode.Create);
			await buffer.CopyToAsync(fileStream, cancellationToken);

			return returnFilePath;
		}
		catch (Exception e)
		{
			_logger.LogError(e, $"Could not save file '{originalFileName}'.");
			return null;
		}
	}

	public Task<bool> DeleteFileAsync(string filePath, CancellationToken cancellationToken = default)
	{
		try
		{
			if (string.IsNullOrWhiteSpace(filePath))
			{
				Task.FromResult(true);
			}
			var fullPath = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "wwwroot", filePath));
			File.Delete(fullPath);

			return Task.FromResult(true);
		}
		catch (Exception e)
		{
			_logger.LogError(e, $"Could not delete file '{filePath}'.");
			return Task.FromResult(false);
		}
	}

	private string CreateFilePath(string fileExt, string contentType = "")
	{
		return string.Format(PictureFolder, Guid.NewGuid().ToString("N"), fileExt);
	}
}