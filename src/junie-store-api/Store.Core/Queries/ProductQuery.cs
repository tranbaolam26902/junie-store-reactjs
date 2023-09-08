namespace Store.Core.Queries;

public class ProductQuery : IProductQuery
{
    public string Keyword { get; set; } = "";
   
    public Guid? CategoryId { get; set; } = Guid.Empty;
    
    public string CategorySlug { get; set; } = "";
    
    public string ProductSlug { get; set; } = "";
    
    public int? Day { get; set; }
    
    public int? Month { get; set; } = 0;
    
    public int? Year { get; set; } = 0;
}