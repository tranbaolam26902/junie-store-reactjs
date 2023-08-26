using Mapster;
using Store.Core.Entities;
using Store.WebAPI.Models.CategoryModel;
using Store.WebAPI.Models.PictureModel;
using Store.WebAPI.Models.ProductModel;
using Store.WebAPI.Models.SupplierModel;

namespace Store.WebAPI.Mapsters;

public class MapsterConfiguration : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<Category, CategoryDto>();
		config.NewConfig<Picture, PictureDto>();

		config.NewConfig<Product, ProductDto>();

		config.NewConfig<Supplier, SupplierDto>()
			.Map(dest => dest.ProductCount,
				src => src.Products == null ? 0 : src.Products.Count);
	}
}