using Mapster;
using Microsoft.Extensions.Hosting;
using Store.Core.Entities;
using Store.WebAPI.Models.CategoryModel;
using Store.WebAPI.Models.OrderModel;
using Store.WebAPI.Models.PictureModel;
using Store.WebAPI.Models.ProductModel;

namespace Store.WebAPI.Mapsters;

public class MapsterConfiguration : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<Category, CategoryDto>();
		config.NewConfig<Picture, PictureDto>();

		config.NewConfig<Product, ProductDto>();
	}
}