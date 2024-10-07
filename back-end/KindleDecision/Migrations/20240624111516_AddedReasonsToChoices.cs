using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KindleDecision.Migrations
{
    /// <inheritdoc />
    public partial class AddedReasonsToChoices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1fc67b7a-0f38-4043-8846-72a31bbb66f9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cf6ddcfd-665f-4705-8139-be72fbf34572");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0b3d4985-61db-422b-8d60-6aa3a72f8c2c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3951bfe3-5dde-47c1-b8e5-5842b3943bf0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1fc67b7a-0f38-4043-8846-72a31bbb66f9", "e1f0cead-2eb8-43e2-b6d7-df1bb9aa07b5", "Administrator", "ADMINISTATOR" },
                    { "cf6ddcfd-665f-4705-8139-be72fbf34572", "5444a205-90fc-4aec-83fb-35808e859681", "User", "USER" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe - afbf - 59f706d72xd6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3b177a01-5596-41d8-867e-65a847331e33", "AQAAAAEAACcQAAAAEMGeeEVodawGk/xLC03bbE7dKATFpMGAVQUPdKtOm7yT3CLkaRKsOvmAIbFIRXUJdw==", "ec3d2532-e3cd-468b-8586-93eb90b1b2e4" });
        }
    }
}
