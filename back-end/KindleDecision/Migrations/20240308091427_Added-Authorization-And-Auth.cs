using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KindleDecision.Migrations
{
    /// <inheritdoc />
    public partial class AddedAuthorizationAndAuth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "678b9d31-1370-4416-a5f1-6e85c2a3222c", "559eb0c9-1f23-4d5f-97dd-f767707763c2", "User", "USER" },
                    { "fe009445-3430-441e-b93c-e2921f7e8ac9", "a91ba6ed-78b6-427b-a386-64027884219d", "Administrator", "ADMINISTATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "678b9d31-1370-4416-a5f1-6e85c2a3222c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe009445-3430-441e-b93c-e2921f7e8ac9");
        }
    }
}
