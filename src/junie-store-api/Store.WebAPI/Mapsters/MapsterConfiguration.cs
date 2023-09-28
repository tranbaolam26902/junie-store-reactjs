using Mapster;
using Store.Core.Entities;
using Store.WebAPI.Models.CategoryModel;
using Store.WebAPI.Models.OrderModel;
using Store.WebAPI.Models.PictureModel;
using Store.WebAPI.Models.ProductHistoryModel;
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

		config.NewConfig<Category, CategoryDto>()
			.Map(dest => dest.ProductCount, 
				src => src.Products == null ? 0 : src.Products.Count);

		config.NewConfig<Picture, PictureDto>();

		config.NewConfig<OrderDetail, OrderDetailDto>()
			.Map(dest => dest.Name, src => src.Product.Name)
			.Map(dest => dest.Sku, src => src.Product.Sku)
			.Map(dest => dest.ImageUrl, 
				src => src.Product.Pictures != null ? src.Product.Pictures.FirstOrDefault().Path : "");

		config.NewConfig<Product, ProductDto>();
		config.NewConfig<ProductEditModel, Product>()
			.Ignore(s => s.Categories);

		config.NewConfig<ProductHistory, ProductHistoryDto>()
			.Map(dest => dest.ProductName,
				src => src.Product.Name ?? "")
			.Map(dest => dest.UserName,
				src => src.User.Name);

		config.NewConfig<Supplier, SupplierDto>()
			.Map(dest => dest.ProductCount,
				src => src.Products == null ? 0 : src.Products.Count);
	}
}