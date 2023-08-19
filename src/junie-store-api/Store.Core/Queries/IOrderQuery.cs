namespace Store.Core.Queries;

public interface IOrderQuery
{
    public int? Year { get; set; }

    public int? Month { get; set; }

    public int? Day { get; set; }

    public string Keyword { get; set; }
}