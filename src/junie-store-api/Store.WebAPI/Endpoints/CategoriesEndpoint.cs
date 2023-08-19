using System.Net;
using Mapster;
using Store.Core.Contracts;
using Store.WebAPI.Models.ProductModel;
using Store.WebAPI.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Collections;
using Store.Core.Entities;
using Store.Services.Shops;
using Store.WebAPI.Models.CategoryModel;

namespace Store.WebAPI.Endpoints;

public static class CategoriesEndpoint
{
	public static WebApplication MapCategoriesEndpoint(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/categories");

		routeGroupBuilder.MapGet("/", GetCategories)
			.WithName("GetCategories")
			.Produces<ApiResponse<IPagedList<CategoryDto>>>();

		routeGroupBuilder.MapGet("/{id:guid}", GetCategoryById)
			.WithName("GetCategoryById")
			.Produces<ApiResponse<Category>>();

		routeGroupBuilder.MapPost("/", AddCategory)
			.WithName("AddCategory")
			.Produces(201)
			.Produces(400)
			.Produces(409);

		routeGroupBuilder.MapPut("/{id:guid}", UpdateCategory)
			.WithName("UpdateCategory")
			.Produces(204)
			.Produces(400)
			.Produces(409);

		routeGroupBuilder.MapDelete("/{id:guid}", DeleteCategory)
			.WithName("DeleteCategory")
			.Produces(204)
			.Produces(404);

		return app;
	}

	private static async Task<IResult> GetCategories(
		[AsParameters] CategoryFilterModel model,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{

		var products =
			await repository.GetPagedCategoriesAsync(
				model.Keyword,
				model,
				p => p.ProjectToType<CategoryDto>());

		var paginationResult = new PaginationResult<CategoryDto>(products);

		return Results.Ok(ApiResponse.Success(paginationResult));
	}

	private static async Task<IResult> GetCategoryById(
		Guid id,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		var category = await repository.GetCategoryByIdAsync(id);
		var categoryItem = mapper.Map<CategoryDto>(category);


		return category == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound))
			: Results.Ok(ApiResponse.Success(categoryItem));
	}

	private static async Task<IResult> AddCategory(
		CategoryEditModel model,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		if (await repository.IsCategorySlugExistedAsync(Guid.Empty, model.UrlSlug))
		{
			return Results.Ok(ApiResponse.Fail(
				HttpStatusCode.NotFound, $"Slug {model.UrlSlug} đã được sử dụng"));
		}

		var category = mapper.Map<Category>(model);

		await repository.AddOrUpdateCategoryAsync(category);

		return Results.Ok(ApiResponse.Success(mapper.Map<CategoryDto>(category), HttpStatusCode.Created));
	}

	private static async Task<IResult> UpdateCategory(
		[FromRoute] Guid id,
		CategoryEditModel model,
		[FromServices] ICollectionRepository repository,
		[FromServices] IMapper mapper)
	{
		if (await repository.IsCategorySlugExistedAsync(id, model.UrlSlug))
		{
			return Results.Ok(ApiResponse.Fail(
				HttpStatusCode.NotFound, $"Slug {model.UrlSlug} đã được sử dụng"));
		}

		var category = mapper.Map<Category>(model);
		category.Id = id;

		return await repository.AddOrUpdateCategoryAsync(category) != null
			? Results.Ok(ApiResponse.Success("Category is updated", HttpStatusCode.NoContent))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound));
	}

	private static async Task<IResult> DeleteCategory(
		Guid id,
		[FromServices] ICollectionRepository repository)
	{
		return await repository.DeleteCategoryAsync(id)
			? Results.Ok(ApiResponse.Success("Category is deleted", HttpStatusCode.NoContent))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy chủ đề với id: `{id}`"));
	}


}