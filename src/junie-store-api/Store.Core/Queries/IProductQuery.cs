namespace Store.Core.Queries;

public interface IProductQuery
{
	public Guid? CategoryId { get; set; }

    public string CategorySlug { get; set; }

    public string ProductSlug { get; set; }

    public int? Year { get; set; }

    public int? Month { get; set; }

    public int? Day { get; set; }

    public string Keyword { get; set; }
}