using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixProductCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_Categories_CategoriesId",
                table: "ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_Products_ProductsId",
                table: "ProductCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategory",
                table: "ProductCategory");

            migrationBuilder.RenameTable(
                name: "ProductCategory",
                newName: "ProductCategories");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategory_ProductsId",
                table: "ProductCategories",
                newName: "IX_ProductCategories_ProductsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategories",
                table: "ProductCategories",
                columns: new[] { "CategoriesId", "ProductsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategories_Categories_CategoriesId",
                table: "ProductCategories",
                column: "CategoriesId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategories_Products_ProductsId",
                table: "ProductCategories",
                column: "ProductsId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategories_Categories_CategoriesId",
                table: "ProductCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategories_Products_ProductsId",
                table: "ProductCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategories",
                table: "ProductCategories");

            migrationBuilder.RenameTable(
                name: "ProductCategories",
                newName: "ProductCategory");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategories_ProductsId",
                table: "ProductCategory",
                newName: "IX_ProductCategory_ProductsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategory",
                table: "ProductCategory",
                columns: new[] { "CategoriesId", "ProductsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_Categories_CategoriesId",
                table: "ProductCategory",
                column: "CategoriesId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_Products_ProductsId",
                table: "ProductCategory",
                column: "ProductsId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
