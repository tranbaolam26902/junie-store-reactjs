namespace Store.Core.Queries;

public class ProductQuery : IProductQuery
{
    public int? Day { get; set; }
    public string Keyword { get; set; } = "";
    public Guid? CategoryId { get; set; } = Guid.Empty;
    public string CategorySlug { get; set; } = "";
    public string ProductSlug { get; set; } = "";
    public int? Year { get; set; } = 0;
    public int? Month { get; set; } = 0;

}