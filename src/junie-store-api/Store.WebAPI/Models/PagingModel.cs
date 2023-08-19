using Store.Core.Contracts;

namespace Store.WebAPI.Models;

public class PagingModel : IPagingParams
{
	public int? PageNumber { get; set; } = 1;
	public int? PageSize { get; set; } = 10;
	public string SortColumn { get; set; } = "Id";
	public string SortOrder { get; set; } = "DESC";
}