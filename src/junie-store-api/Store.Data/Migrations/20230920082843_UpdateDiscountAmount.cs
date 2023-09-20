using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDiscountAmount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DiscountPercentage",
                table: "Orders",
                newName: "DiscountAmount");

            migrationBuilder.RenameColumn(
                name: "ShowOnMenu",
                table: "Discounts",
                newName: "IsDiscountPercentage");

            migrationBuilder.RenameColumn(
                name: "DiscountPercentage",
                table: "Discounts",
                newName: "DiscountAmount");

            migrationBuilder.AddColumn<bool>(
                name: "IsDiscountPercentage",
                table: "Orders",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDiscountPercentage",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "DiscountAmount",
                table: "Orders",
                newName: "DiscountPercentage");

            migrationBuilder.RenameColumn(
                name: "IsDiscountPercentage",
                table: "Discounts",
                newName: "ShowOnMenu");

            migrationBuilder.RenameColumn(
                name: "DiscountAmount",
                table: "Discounts",
                newName: "DiscountPercentage");
        }
    }
}
