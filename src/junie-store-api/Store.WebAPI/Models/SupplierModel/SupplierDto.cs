namespace Store.WebAPI.Models.SupplierModel;

public class SupplierDto
{
	public Guid Id { get; set; }

	public string Name { get; set; }

	public string Description { get; set; }

	public string ContactName { get; set; }

	public string Address { get; set; }

	public string Email { get; set; }

	public string Phone { get; set; }

	public bool IsDeleted { get; set; }
}