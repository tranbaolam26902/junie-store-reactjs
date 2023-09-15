using Mapster;
using Store.Core.Entities;
using Store.WebAPI.Models.CategoryModel;
using Store.WebAPI.Models.PictureModel;
using Store.WebAPI.Models.ProductModel;
using Store.WebAPI.Models.SupplierModel;
using Store.WebAPI.Models.UserModel;

namespace Store.WebAPI.Mapsters;

public class MapsterConfiguration : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<User, UserDto>()
			.Map(dest => dest.RoleName,
				src => src.Roles == null || !src.Roles.Any() ? "" :
					src.Roles.Any(r => r.Name == "Admin") ? "Admin" :
					src.Roles.Any(r => r.Name == "Manager") ? "Manager" :
					"User");

		config.NewConfig<Category, CategoryDto>();
		config.NewConfig<Picture, PictureDto>();

		config.NewConfig<Product, ProductDto>();
		config.NewConfig<ProductEditModel, Product>()
			.Ignore(s => s.Categories);


		config.NewConfig<Supplier, SupplierDto>()
			.Map(dest => dest.ProductCount,
				src => src.Products == null ? 0 : src.Products.Count);
	}
}