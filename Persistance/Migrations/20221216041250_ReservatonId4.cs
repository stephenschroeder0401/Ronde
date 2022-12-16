using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class ReservatonId4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_AttendeeStatus_ReservationStatusAttendeeStatusId",
                table: "Reservation");

            migrationBuilder.RenameColumn(
                name: "ReservationStatusAttendeeStatusId",
                table: "Reservation",
                newName: "ReservationStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_ReservationStatusAttendeeStatusId",
                table: "Reservation",
                newName: "IX_Reservation_ReservationStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_ReservationStatus_ReservationStatusId",
                table: "Reservation",
                column: "ReservationStatusId",
                principalTable: "ReservationStatus",
                principalColumn: "ReservationStatusId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_ReservationStatus_ReservationStatusId",
                table: "Reservation");

            migrationBuilder.RenameColumn(
                name: "ReservationStatusId",
                table: "Reservation",
                newName: "ReservationStatusAttendeeStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_ReservationStatusId",
                table: "Reservation",
                newName: "IX_Reservation_ReservationStatusAttendeeStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_AttendeeStatus_ReservationStatusAttendeeStatusId",
                table: "Reservation",
                column: "ReservationStatusAttendeeStatusId",
                principalTable: "ReservationStatus",
                principalColumn: "ReservationStatusId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
