using System.Net;
using Mapster;
using Store.Core.Contracts;
using Store.WebAPI.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Collections;
using Store.Core.Entities;
using Store.Core.Queries;
using Store.Services.Shops;
using Store.WebAPI.Models.CategoryModel;

namespace Store.WebAPI.Endpoints;

public static class CategoryEndpoints
{
	public static WebApplication MapCategoriesEndpoint(
		this WebApplication app)
	{
		var builder = app.MapGroup("/api/categories");

		#region GET Method

		builder.MapGet("/", GetCategories)
			.WithName("GetCategories")
			.Produces<ApiResponse<IPagedList<CategoryDto>>>();

		builder.MapGet("/byManager", GetCategoriesByManager)
			.WithName("GetCategoriesByManager")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<IPagedList<CategoryDto>>>();

		builder.MapGet("/{id:guid}", GetCategoryById)
			.WithName("GetCategoryById")
			.Produces<ApiResponse<CategoryDto>>();

		builder.MapGet("/bySlug/{slug:regex(^[a-z0-9_-]+$)}", GetCategoryBySlug)
			.WithName("GetCategoryBySlug")
			.Produces<ApiResponse<CategoryDto>>();

		builder.MapGet("/RelatedCategories", GetRelatedCategories)
			.WithName("GetRelatedCategories")
			.Produces<ApiResponse<IList<CategoryDto>>>();


		builder.MapGet("/toggleShowOnMenu/{id:guid}", ToggleShowOnMenu)
			.WithName("ToggleCategoryShowOnMenu")
			.RequireAuthorization("RequireManagerRole")
			.Produces(204)
			.Produces(404);

		#endregion

		#region POST Method

		builder.MapPost("/", AddCategory)
			.WithName("AddCategory")
			.RequireAuthorization("RequireManagerRole")
			.Produces(201)
			.Produces(400)
			.Produces(409);

		#endregion

		#region PUT Method

		builder.MapPut("/{id:guid}", UpdateCategory)
			.WithName("UpdateCategory")
			.RequireAuthorization("RequireManagerRole")
			.Produces(204)
			.Produces(400)
			.Produces(409);

		#endregion

		#region DELETE Method

		builder.MapDelete("/toggleDelete/{id:guid}", ToggleDeleteCategory)
			.WithName("ToggleDeleteCategory")
			.RequireAuthorization("RequireManagerRole")
			.Produces(204)
			.Produces(404);

		builder.MapDelete("/{id:guid}", DeleteCategory)
			.WithName("DeleteCategory")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse>(204)
			.Produces<ApiResponse>(404);
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
			var condition = mapper.Map<CategoryQuery>(model);

			var products =
				await repository.GetPagedCategoriesForUserAsync(
					condition,
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

	private static async Task<IResult> GetCategoriesByManager(
		[AsParameters] CategoryManagerFilter model,
		[FromServices] ICategoryRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var condition = mapper.Map<CategoryQuery>(model);

			var products =
				await repository.GetPagedCategoriesAsync(
					condition,
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

	private static async Task<IResult> GetRelatedCategories(
		[AsParameters] CategoryRelateModel model,
		[FromServices] ICategoryRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var condition = mapper.Map<CategoryQuery>(model);

			var categoryItems = await repository.GetRelatedCategoryBySlugAsync(condition);

			var categoriesDto = mapper.Map<IList<CategoryDto>>(categoryItems);

			return Results.Ok(ApiResponse.Success(categoriesDto));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> GetCategoryBySlug(
		[FromRoute] string slug,
		[FromServices] ICategoryRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var category = await repository.GetCategoryBySlugAsync(slug, true);
			var categoryItem = mapper.Map<CategoryDto>(category);

			return category == null
				? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Danh mục đã ẩn hoặc không tồn tại."))
				: Results.Ok(ApiResponse.Success(categoryItem));
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
				? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Danh mục không tồn tại."))
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
			
			if (await repository.IsCategoryExistedAsync(Guid.Empty, model.Name))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.Conflict,
					$"Danh mục đã tồn tại với tên: `{model.Name}`"));
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
			if (await repository.IsCategoryExistedAsync(id, model.Name))
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.Conflict,
					$"Danh mục đã tồn tại với tên: `{model.Name}`"));
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
			if (await repository.ToggleShowOnMenuAsync(id).ConfigureAwait(false))
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

	private static async Task<IResult> DeleteCategory(
		[FromRoute] Guid id,
		[FromServices] ICategoryRepository repository)
	{
		try
		{
			var category = await repository.GetCategoryByIdAsync(id);
			if (category == null)
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotFound,
					$"Danh mục không tồn tại."));
			} 
			else if (!category.IsDeleted)
			{
				return Results.Ok(ApiResponse.Fail(
					HttpStatusCode.NotAcceptable,
					$"Danh mục chưa được đánh dấu xóa."));
			}

			await repository.DeleteCategoryAsync(id);

			return Results.Ok(ApiResponse.Success("Xóa danh mục thành công.", HttpStatusCode.NoContent));

		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}