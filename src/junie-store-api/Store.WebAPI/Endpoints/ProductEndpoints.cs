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

namespace Store.WebAPI.Endpoints;

public static class ProductEndpoints
{
	public static WebApplication MapProductEndpoints(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/products");

		routeGroupBuilder.MapGet("/", GetProducts)
			.WithName("GetProducts")
			.Produces<ApiResponse<IPagedList<ProductDto>>>();

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
			.WithName("GetProductBySlug")
			.Produces<ApiResponse<ProductDto>>();

		routeGroupBuilder.MapPost("/", AddProduct)
			.WithName("AddProduct")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<ProductDto>>()
			.Produces(201)
			.Produces(400)
			.Produces(409);

		routeGroupBuilder.MapPut("/{id:guid}", UpdateProduct)
			.WithName("UpdateProduct")
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

		routeGroupBuilder.MapDelete("/{id:guid}", DeleteProduct)
			.WithName("DeleteProduct")
			.Produces(204)
			.Produces(404);

		return app;
	}

	private static async Task<IResult> GetProductById(
		Guid id,
		ICollectionRepository repository,
		IMapper mapper)
	{
		var product = await repository.GetProductByIdAsync(id);

		if (product == null)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Product is not found"));
		}

		var productDetail = mapper.Map<ProductDto>(product);

		return Results.Ok(ApiResponse.Success(productDetail));
	}

	private static async Task<IResult> GetProductBySlug(
		string slug,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		var product = await repository.GetProductBySlug(slug);

		if (product == null)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Product is not found with {slug}"));
		}

		var productDetail = mapper.Map<ProductDto>(product);

		return Results.Ok(ApiResponse.Success(productDetail));
	}

	private static async Task<IResult> GetProducts(
		[AsParameters] ProductFilterModel model,
		ICollectionRepository repository,
		IMapper mapper)
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

	private static async Task<IResult> GetProductsTopSale(
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{

		var products =
			await repository.GetTopSaleAsync();

		var productsDto = mapper.Map<IList<ProductDto>>(products);
		

		return Results.Ok(ApiResponse.Success(productsDto));
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
		[FromServices] IMapper mapper)
	{
		try
		{
			var user = IdentityManager.GetCurrentUser(context);
			if (await repository.IsProductExistedAsync(Guid.Empty, model.Name))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.Conflict,
					$"Item already exists with name: `{model.Name}`"));
			}

			var product = mapper.Map<Product>(model);
			
			product.CreateDate = DateTime.Now;
			product.UserId = user.Id;

			await repository.AddOrUpdateProductAsync(product);
			
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
		ProductEditModel model,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		if (await repository.IsProductExistedAsync(Guid.Empty, model.Name))
		{
			return Results.Ok(ApiResponse.Fail(
				HttpStatusCode.Conflict,
				$"Item already exists with name: `{model.Name}`"));
		}

		var product = await repository.GetProductByIdAsync(id);
		mapper.Map(model, product);

		await repository.AddOrUpdateProductAsync(product);
		return Results.Ok(ApiResponse.Success(
			mapper.Map<ProductDto>(product), HttpStatusCode.Created));
	}

	private static async Task<IResult> SetProductPicture(
		[FromRoute] Guid id,
		HttpContext context,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMediaManager mediaManager)
	{
		var form = context.Request.Form.Files;

		var oldProduct = await repository.GetProductByIdAsync(id);
		if (oldProduct == null)
		{
			return Results.Ok(ApiResponse.Fail(
				HttpStatusCode.NotFound,
				$"Product with ID: `{id}` not found."));
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
					"Unable to save the file."));
			}
			await repository.SetImageUrlAsync(id, imageUrl);

		}

		return Results.Ok(ApiResponse.Success("Saved successfully"));
	}
	private static async Task<IResult> DeleteProduct(
		Guid id,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMediaManager mediaManager)
	{
		var oldProduct = await repository.GetProductByIdAsync(id);
		if (oldProduct == null)
		{
			return Results.Ok(ApiResponse.Fail(
				HttpStatusCode.NotFound,
				$"Product with ID: `{id}` not found."));
		}

		var pictures = await repository.GetImageUrlsAsync(id);

		foreach (var picture in pictures)
		{
			await mediaManager.DeleteFileAsync(picture.Path);
		}

		await repository.DeleteImageUrlsAsync(id);

		return await repository.DeleteProductAsync(id)
			? Results.Ok(ApiResponse.Success("Product deleted successfully.", HttpStatusCode.NoContent))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Product with ID: `{id}` not found."));
	}
}