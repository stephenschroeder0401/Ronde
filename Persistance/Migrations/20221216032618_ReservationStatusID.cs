using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class ReservationStatusID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RsservationStintId",
                table: "ReservationStint",
                newName: "ReservationStintId");

            migrationBuilder.RenameIndex(
                name: "IX_ReservationStint_ReservationId_RsservationStintId",
                table: "ReservationStint",
                newName: "IX_ReservationStint_ReservationId_ReservationStintId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReservationStintId",
                table: "ReservationStint",
                newName: "RsservationStintId");

            migrationBuilder.RenameIndex(
                name: "IX_ReservationStint_ReservationId_ReservationStintId",
                table: "ReservationStint",
                newName: "IX_ReservationStint_ReservationId_RsservationStintId");
        }
    }
}
