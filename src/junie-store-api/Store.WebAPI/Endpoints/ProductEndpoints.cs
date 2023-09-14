using Mapster;
using MapsterMapper;
using Store.Core.Collections;
using Store.Core.Contracts;
using Store.Core.Entities;
using Store.Services.Shops;
using Store.WebAPI.Media;
using Store.WebAPI.Models;
using Store.WebAPI.Models.ProductModel;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Queries;
using Store.WebAPI.Identities;
using Store.WebAPI.Models.ProductHistoryModel;
using Store.WebAPI.Filters;

namespace Store.WebAPI.Endpoints;

public static class ProductEndpoints
{
	public static WebApplication MapProductEndpoints(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/products");

		#region GET method
		routeGroupBuilder.MapGet("/", GetProducts)
			.WithName("GetProducts")
			.Produces<ApiResponse<IPagedList<ProductDto>>>();

		routeGroupBuilder.MapGet("/histories", GetProductHistories)
			.WithName("GetProductHistories")
			.RequireAuthorization("RequireAdminRole")
			.Produces<ApiResponse<IPagedList<ProductHistoryDto>>>();

		routeGroupBuilder.MapGet("/TopSales", GetProductsTopSale)
			.WithName("GetProductsTopSale")
			.Produces<ApiResponse<IList<ProductDto>>>();

		routeGroupBuilder.MapGet("/Related/{slug:regex(^[a-z0-9_-]+$)}/{num:int}", GetRelatedProducts)
			.WithName("GetRelatedProducts")
			.Produces<ApiResponse<IList<ProductDto>>>();

		routeGroupBuilder.MapGet("/{id:guid}", GetProductById)
			.WithName("GetProductByIdAsync")
			.Produces<ApiResponse<ProductDto>>();

		routeGroupBuilder.MapGet("/bySlug/{slug:regex(^[a-z0-9_-]+$)}", GetProductBySlug)
			.WithName("GetProductBySlugAsync")
			.Produces<ApiResponse<ProductDto>>();

		#endregion

		#region POST Method
		routeGroupBuilder.MapPost("/", AddProduct)
			.WithName("AddProduct")
			.AddEndpointFilter<ValidatorFilter<ProductEditModel>>()
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<ProductDto>>()
			.Produces(201)
			.Produces(400)
			.Produces(409);

		routeGroupBuilder.MapPost("/{id:guid}/picture", SetProductPicture)
			.WithName("SetProductPicture")
			.Accepts<IList<IFormFile>>("multipart/form-data")
			.Produces<ApiResponse<string>>()
			.Produces(400);

		#endregion

		#region PUT Method

		routeGroupBuilder.MapPut("/{id:guid}", UpdateProduct)
			.WithName("UpdateProduct")
			.AddEndpointFilter<ValidatorFilter<ProductEditModel>>()
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<ProductDto>>()
			.Produces(201)
			.Produces(400)
			.Produces(409);

		#endregion

		#region DELETE Method

		routeGroupBuilder.MapDelete("/toggleDelete/{id:guid}", ToggleDeleteProduct)
			.WithName("ToggleDeleteProduct")
			.Produces(204)
			.Produces(404);

		routeGroupBuilder.MapDelete("/{id:guid}", DeleteProduct)
			.WithName("DeleteProduct")
			.Produces(204)
			.Produces(404);

		routeGroupBuilder.MapDelete("/histories", DeleteHistory)
			.WithName("DeleteProductHistory")
			.RequireAuthorization("RequireAdminRole")
			.Produces(204)
			.Produces(404);

		#endregion

		return app;
	}

	private static async Task<IResult> GetProductById(
		[FromRoute] Guid id,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var product = await repository.GetProductByIdAsync(id);

			if (product == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Sản phẩm không tồn tại với id: `{id}`"));
			}

			var productDetail = mapper.Map<ProductDto>(product);

			return Results.Ok(ApiResponse.Success(productDetail));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetProductBySlug(
		string slug,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var product = await repository.GetProductBySlugAsync(slug);

			if (product == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Sản phẩm không tồn tại với slug: `{slug}`"));
			}

			var productDetail = mapper.Map<ProductDto>(product);

			return Results.Ok(ApiResponse.Success(productDetail));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetProducts(
		[AsParameters] ProductFilterModel model,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var condition = mapper.Map<ProductQuery>(model);

			var products =
				await repository.GetPagedProductsAsync(
					condition,
					model,
					p => p.ProjectToType<ProductDto>());

			var paginationResult = new PaginationResult<ProductDto>(products);

			return Results.Ok(ApiResponse.Success(paginationResult));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetProductHistories(
		[AsParameters] ProductHistoryFilterModel model,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var condition = mapper.Map<ProductHistoryQuery>(model);

			var histories =
				await repository.GetPagedProductHistoriesAsync(
					condition,
					model,
					p => p.ProjectToType<ProductHistoryDto>());

			var paginationResult = new PaginationResult<ProductHistoryDto>(histories);

			return Results.Ok(ApiResponse.Success(paginationResult));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetProductsTopSale(
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var products =
				await repository.GetTopSaleAsync();

			var productsDto = mapper.Map<IList<ProductDto>>(products);

			return Results.Ok(ApiResponse.Success(productsDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetRelatedProducts(
		[FromRoute] string slug,
		[FromRoute] int num,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var products =
				await repository.GetRelatedProductsAsync(slug, num);

			var productsDto = mapper.Map<IList<ProductDto>>(products);

			return Results.Ok(ApiResponse.Success(productsDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> AddProduct(
		HttpContext context,
		ProductEditModel model,
		[FromServices] ICollectionRepository repository,
		[FromServices] ICategoryRepository categoryRepo,
		[FromServices] ISupplierRepository supplierRepo,
		[FromServices] IMapper mapper)
	{
		try
		{
			var user = IdentityManager.GetCurrentUser(context);
			if (await repository.IsProductExistedAsync(Guid.Empty, model.Name))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.Conflict,
					$"Sản phẩm đã tồn tại với tên: `{model.Name}`"));
			}

			var isExitsCategory = await categoryRepo.GetCategoryByIdAsync(model.CategoryId);
			var isExitsSupplier = await supplierRepo.GetSupplierByIdAsync(model.SupplierId);

			if (isExitsSupplier == null || isExitsCategory == null)
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotFound,
					$"Mã nhà cung cấp hoặc danh mục không tồn tại!"));
			}

			var product = mapper.Map<Product>(model);

			product.CreateDate = DateTime.Now;
			//product.Category = null;
			product.Supplier = null;

			await repository.AddOrUpdateProductAsync(product, user.Id);

			return Results.Ok(ApiResponse.Success(
			mapper.Map<ProductDto>(product), HttpStatusCode.Created));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> UpdateProduct(
		[FromRoute] Guid id,
		HttpContext context,
		ProductEditModel model,
		[FromServices] ICollectionRepository repository,
		[FromServices] ICategoryRepository categoryRepo,
		[FromServices] ISupplierRepository supplierRepo,
		[FromServices] IMapper mapper)
	{
		try
		{
			var user = IdentityManager.GetCurrentUser(context);
			if (await repository.IsProductExistedAsync(Guid.Empty, model.Name))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.Conflict,
					$"Sản phẩm đã tồn tại với tên: `{model.Name}`"));
			}

			var isExitsCategory = await categoryRepo.GetCategoryByIdAsync(model.CategoryId);
			var isExitsSupplier = await supplierRepo.GetSupplierByIdAsync(model.SupplierId);

			if (isExitsSupplier == null || isExitsCategory == null)
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotFound,
					$"Mã nhà cung cấp hoặc danh mục không tồn tại!"));
			}

			var product = await repository.GetProductByIdAsync(id);
			mapper.Map(model, product);

			//product.Category = null;
			product.Supplier = null;

			await repository.AddOrUpdateProductAsync(product, user.Id, model.EditReason);
			return Results.Ok(ApiResponse.Success(
				mapper.Map<ProductDto>(product), HttpStatusCode.Created));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> SetProductPicture(
		[FromRoute] Guid id,
		HttpContext context,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMediaManager mediaManager)
	{
		try
		{
			var form = context.Request.Form.Files;

			var oldProduct = await repository.GetProductByIdAsync(id);
			if (oldProduct == null)
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotFound,
					$"Sản phẩm không tồn tại với id: `{id}`."));
			}

			var pictures = await repository.GetImageUrlsAsync(id);

			foreach (var picture in pictures)
			{
				await mediaManager.DeleteFileAsync(picture.Path);
			}

			await repository.DeleteImageUrlsAsync(id);

			foreach (var imageFile in form)
			{
				var imageUrl = await mediaManager.SaveFileAsync(
					imageFile.OpenReadStream(),
					imageFile.FileName, imageFile.ContentType);

				if (string.IsNullOrWhiteSpace(imageUrl))
				{
					return Results.Ok(ApiResponse.Fail(
						HttpStatusCode.InternalServerError,
						"Không lưu được hình ảnh."));
				}
				await repository.SetImageUrlAsync(id, imageUrl);

			}

			return Results.Ok(ApiResponse.Success("Lưu hình ảnh thành công."));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> ToggleDeleteProduct(
		[FromRoute] Guid id,
		HttpContext context,
		[FromBody] string reason,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var user = IdentityManager.GetCurrentUser(context);

			return await repository.ToggleDeleteProductAsync(id, user.Id, reason)
				? Results.Ok(ApiResponse.Success("Sản phẩm đã được chuyển trạng thái.", HttpStatusCode.NoContent))
				: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Sản phẩm không tồn tại với id: `{id}`"));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> DeleteHistory(
		[FromBody] IList<Guid> listId,
		[FromServices] ICollectionRepository repository)
	{
		try
		{
			foreach (var historyId in listId)
			{
				await repository.DeleteProductHistoryAsync(historyId);
			}

			return Results.Ok(ApiResponse.Success("Xóa thành công.", HttpStatusCode.NoContent));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> DeleteProduct(
		Guid id,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMediaManager mediaManager)
	{
		try
		{
			var oldProduct = await repository.GetProductByIdAsync(id);
			if (oldProduct == null)
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotFound,
					$"Sản phẩm không tồn tại với id: `{id}`."));
			} 
			else if (oldProduct.IsDeleted == false)
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotAcceptable,
					$"Sản phẩm chưa đánh dấu xóa."));
			}

			var pictures = await repository.GetImageUrlsAsync(id);

			foreach (var picture in pictures)
			{
				await mediaManager.DeleteFileAsync(picture.Path);
			}

			await repository.DeleteImageUrlsAsync(id);

			await repository.DeleteProductAsync(id);
			
			return Results.Ok(ApiResponse.Success("Xóa sản phẩm thành công.", HttpStatusCode.NoContent));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}