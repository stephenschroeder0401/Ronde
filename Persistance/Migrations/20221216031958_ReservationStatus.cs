using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class ReservationStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StatusReservationStatusId",
                table: "Reservation",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_StatusReservationStatusId",
                table: "Reservation",
                column: "StatusReservationStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_ReservationStatus_StatusReservationStatusId",
                table: "Reservation",
                column: "StatusReservationStatusId",
                principalTable: "ReservationStatus",
                principalColumn: "ReservationStatusId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_ReservationStatus_StatusReservationStatusId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_StatusReservationStatusId",
                table: "Reservation");

            migrationBuilder.DropColumn(
                name: "StatusReservationStatusId",
                table: "Reservation");
        }
    }
}
