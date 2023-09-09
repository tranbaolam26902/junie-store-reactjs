﻿using System.Net;
using Mapster;
using Store.Core.Contracts;
using Store.WebAPI.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Collections;
using Store.Core.Entities;
using Store.Services.Shops;
using Store.WebAPI.Models.CategoryModel;

namespace Store.WebAPI.Endpoints;

public static class CategoryEndpoint
{
	public static WebApplication MapCategoriesEndpoint(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/categories");

		#region GET Method

		routeGroupBuilder.MapGet("/", GetCategories)
			.WithName("GetCategories")
			.Produces<ApiResponse<IPagedList<CategoryDto>>>();

		routeGroupBuilder.MapGet("/{id:guid}", GetCategoryById)
			.WithName("GetCategoryById")
			.Produces<ApiResponse<Category>>();

		routeGroupBuilder.MapGet("/toggleShowOnMenu/{id:guid}", ToggleShowOnMenu)
			.WithName("ToggleCategoryShowOnMenu")
			.Produces(204)
			.Produces(404);

		#endregion

		#region POST Method

		routeGroupBuilder.MapPost("/", AddCategory)
			.WithName("AddCategory")
			.RequireAuthorization("RequireManagerRole")
			.Produces(201)
			.Produces(400)
			.Produces(409);

		#endregion

		#region PUT Method

		routeGroupBuilder.MapPut("/{id:guid}", UpdateCategory)
			.WithName("UpdateCategory")
			.RequireAuthorization("RequireManagerRole")
			.Produces(204)
			.Produces(400)
			.Produces(409);

		#endregion

		#region DELETE Method

		routeGroupBuilder.MapDelete("/toggleDelete/{id:guid}", ToggleDeleteCategory)
			.WithName("ToggleDeleteCategory")
			.RequireAuthorization("RequireManagerRole")
			.Produces(204)
			.Produces(404);

		#endregion

		return app;
	}

	private static async Task<IResult> GetCategories(
		[AsParameters] CategoryFilterModel model,
		[FromServices] ICategoryRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var products =
				await repository.GetPagedCategoriesAsync(
					model.Keyword,
					model,
					p => p.ProjectToType<CategoryDto>());

			var paginationResult = new PaginationResult<CategoryDto>(products);

			return Results.Ok(ApiResponse.Success(paginationResult));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetCategoryById(
		[FromRoute] Guid id,
		[FromServices] ICategoryRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var category = await repository.GetCategoryByIdAsync(id);
			var categoryItem = mapper.Map<CategoryDto>(category);

			return category == null
				? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound))
				: Results.Ok(ApiResponse.Success(categoryItem));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> AddCategory(
		CategoryEditModel model,
		[FromServices] ICategoryRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			if (await repository.IsCategorySlugExistedAsync(Guid.Empty, model.UrlSlug))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotFound, $"Slug `{model.UrlSlug}` đã được sử dụng."));
			}

			var category = mapper.Map<Category>(model);

			await repository.AddOrUpdateCategoryAsync(category);

			return Results.Ok(ApiResponse.Success(mapper.Map<CategoryDto>(category), HttpStatusCode.Created));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> UpdateCategory(
		[FromRoute] Guid id,
		CategoryEditModel model,
		[FromServices] ICategoryRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			if (await repository.IsCategorySlugExistedAsync(id, model.UrlSlug))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotFound, $"Slug `{model.UrlSlug}` đã được sử dụng."));
			}

			var category = mapper.Map<Category>(model);
			category.Id = id;

			return await repository.AddOrUpdateCategoryAsync(category) != null
				? Results.Ok(ApiResponse.Success("Danh mục đã được cập nhật!", HttpStatusCode.NoContent))
				: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> ToggleShowOnMenu(
		[FromRoute] Guid id,
		[FromServices] ICategoryRepository repository)
	{
		try
		{
			if (await repository.ToggleShowOnMenu(id).ConfigureAwait(false))
			{
				return Results.Ok(ApiResponse.Success("Chuyển trạng thái thành công.", HttpStatusCode.NoContent));
			}

			return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Danh mục không tồn tại"));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> ToggleDeleteCategory(
		[FromRoute] Guid id,
		[FromServices] ICategoryRepository repository)
	{
		try
		{
			return await repository.ToggleDeleteCategoryAsync(id)
				? Results.Ok(ApiResponse.Success("Chuyển trạng thái thành công.", HttpStatusCode.NoContent))
				: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Danh mục không tồn tại với id: `{id}`"));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}