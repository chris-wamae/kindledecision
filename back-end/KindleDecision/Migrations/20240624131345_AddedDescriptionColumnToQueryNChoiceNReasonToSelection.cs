using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KindleDecision.Migrations
{
    /// <inheritdoc />
    public partial class AddedDescriptionColumnToQueryNChoiceNReasonToSelection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0b3d4985-61db-422b-8d60-6aa3a72f8c2c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3951bfe3-5dde-47c1-b8e5-5842b3943bf0");

            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "Selections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Querys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Choices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "69d4d27f-59e6-489b-ae8f-466ecf7e9324", "5332a7aa-285d-4f8d-bb92-3a565cb547a4", "Administrator", "ADMINISTATOR" },
                    { "6f52df7f-ee1c-40d9-8a06-6ec79479c747", "70dcf28e-f281-4c08-b959-4a14c233e0f9", "User", "USER" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe - afbf - 59f706d72xd6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8d03db51-c1d1-4b17-9a2e-de72c20ac934", "AQAAAAEAACcQAAAAECcUonVdfPT+9udNRAhd1Fdfgn0qlLjaifQuQbLd5LmTlwELCUxf35pR46PZaaeiCQ==", "44f2a245-7679-4575-adfb-9a2958819923" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "69d4d27f-59e6-489b-ae8f-466ecf7e9324");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6f52df7f-ee1c-40d9-8a06-6ec79479c747");

            migrationBuilder.DropColumn(
                name: "Reason",
                table: "Selections");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Querys");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Choices");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0b3d4985-61db-422b-8d60-6aa3a72f8c2c", "0270e9b4-1efe-4ab6-9f92-37abb781485b", "Administrator", "ADMINISTATOR" },
                    { "3951bfe3-5dde-47c1-b8e5-5842b3943bf0", "3fab0533-2982-4549-8c3d-442ea3be1b08", "User", "USER" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe - afbf - 59f706d72xd6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "aaba310c-ec44-4446-9328-61edc3ab5051", "AQAAAAEAACcQAAAAEOGFNGiK4gNT+ConTqcKfBBRZLhvjKGBttEkFRbmYDE9vErXdOW4SYxHBaMKYkpofg==", "11c20d07-d0d0-49bb-8c26-61a4002f0d78" });
        }
    }
}
