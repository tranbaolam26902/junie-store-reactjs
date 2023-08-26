﻿using System.Net;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Store.Core.Collections;
using Store.Core.Entities;
using Store.Core.Queries;
using Store.Services.Shops;
using Store.WebAPI.Identities;
using Store.WebAPI.Models;
using Store.WebAPI.Models.ProductModel;
using Store.WebAPI.Models.SupplierModel;

namespace Store.WebAPI.Endpoints;

public static class SuppliersEndpoints
{
	public static WebApplication MapSupplierEndpoints(
		this WebApplication app)
	{
		var builder = app.MapGroup("/api/suppliers");

		#region GET Method

		builder.MapGet("/", GetPagedSuppliersAsync)
			.WithName("GetPagedSuppliersAsync")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<SupplierDto>>();

		#endregion

		#region POST Method

		builder.MapPost("/", AddSupplierAsync)
			.WithName("AddSupplierAsync")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<SupplierDto>>();

		#endregion

		#region PUT Method

		builder.MapPut("/{supplierId:guid}", UpdateSupplierAsync)
			.WithName("UpdateSupplierAsync")
			.RequireAuthorization("RequireManagerRole")
			.Produces<ApiResponse<SupplierDto>>();

		#endregion
		return app;
	}

	private static async Task<IResult> GetPagedSuppliersAsync(
		HttpContext context,
		[AsParameters] SupplierFilterModel model,
		[FromServices] ISupplierRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var suppliers =
				await repository.GetPagedSuppliersAsync(
					model.Keyword,
					model,
					p => p.ProjectToType<SupplierDto>());

			var paginationResult = new PaginationResult<SupplierDto>(suppliers);

			return Results.Ok(ApiResponse.Success(paginationResult));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> AddSupplierAsync(
		HttpContext context,
		SupplierEditModel model,
		[FromServices] ISupplierRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var supplier = mapper.Map<Supplier>(model);
			supplier.IsDeleted = false;

			await repository.AddOrUpdateSupplierAsync(supplier);

			return Results.Ok(ApiResponse.Success(
				mapper.Map<SupplierDto>(supplier), HttpStatusCode.Created));

		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}

	private static async Task<IResult> UpdateSupplierAsync(
		[FromRoute] Guid supplierId,
		SupplierEditModel model,
		[FromServices] ISupplierRepository repository,
		[FromServices] IMapper mapper)
	{
		try
		{
			var supplier = await repository.GetSupplierByIdAsync(supplierId);
			if (supplier == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
					$"Supplier is not found with id: {supplierId}"));
			}

			mapper.Map(model, supplier);

			await repository.AddOrUpdateSupplierAsync(supplier);

			return Results.Ok(ApiResponse.Success(mapper.Map<SupplierDto>(supplier), HttpStatusCode.Created));
		}
		catch (Exception e)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, e.Message));
		}
	}
}