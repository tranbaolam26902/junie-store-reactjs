using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixFeedbackPictures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeedbackImages");

            migrationBuilder.CreateTable(
                name: "FeedbackPictures",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FeedbackId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false, defaultValue: "")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackPictures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Feedback_Pictures",
                        column: x => x.FeedbackId,
                        principalTable: "Feedback",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackPictures_FeedbackId",
                table: "FeedbackPictures",
                column: "FeedbackId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeedbackPictures");

            migrationBuilder.CreateTable(
                name: "FeedbackImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FeedbackId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false, defaultValue: "")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Feedback_Images",
                        column: x => x.FeedbackId,
                        principalTable: "Feedback",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackImages_FeedbackId",
                table: "FeedbackImages",
                column: "FeedbackId");
        }
    }
}
