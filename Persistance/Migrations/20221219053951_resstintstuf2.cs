using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class resstintstuf2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_AspNetUsers_AppUserId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationStatus_ReservationStatusId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Spots_SpotId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Trip_TripId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Stints_Reservations_ReservationId",
                table: "Stints");

            migrationBuilder.DropIndex(
                name: "IX_Stints_ReservationId",
                table: "Stints");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reservations",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "Stints");

            migrationBuilder.RenameTable(
                name: "Reservations",
                newName: "Reservation");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_TripId",
                table: "Reservation",
                newName: "IX_Reservation_TripId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_SpotId",
                table: "Reservation",
                newName: "IX_Reservation_SpotId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_ReservationStatusId",
                table: "Reservation",
                newName: "IX_Reservation_ReservationStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_AppUserId",
                table: "Reservation",
                newName: "IX_Reservation_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reservation",
                table: "Reservation",
                column: "ReservationId");

            migrationBuilder.CreateTable(
                name: "ReservationStint",
                columns: table => new
                {
                    ReservationStintId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReservationId = table.Column<int>(type: "int", nullable: false),
                    StintId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationStint", x => x.ReservationStintId);
                    table.ForeignKey(
                        name: "FK_ReservationStint_Reservation_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "Reservation",
                        principalColumn: "ReservationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationStint_Stints_StintId",
                        column: x => x.StintId,
                        principalTable: "Stints",
                        principalColumn: "StintId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationStint_ReservationId_ReservationStintId",
                table: "ReservationStint",
                columns: new[] { "ReservationId", "ReservationStintId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReservationStint_StintId",
                table: "ReservationStint",
                column: "StintId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_AspNetUsers_AppUserId",
                table: "Reservation",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_ReservationStatus_ReservationStatusId",
                table: "Reservation",
                column: "ReservationStatusId",
                principalTable: "ReservationStatus",
                principalColumn: "ReservationStatusId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Spots_SpotId",
                table: "Reservation",
                column: "SpotId",
                principalTable: "Spots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Trip_TripId",
                table: "Reservation",
                column: "TripId",
                principalTable: "Trip",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_AspNetUsers_AppUserId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_ReservationStatus_ReservationStatusId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Spots_SpotId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Trip_TripId",
                table: "Reservation");

            migrationBuilder.DropTable(
                name: "ReservationStint");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reservation",
                table: "Reservation");

            migrationBuilder.RenameTable(
                name: "Reservation",
                newName: "Reservations");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_TripId",
                table: "Reservations",
                newName: "IX_Reservations_TripId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_SpotId",
                table: "Reservations",
                newName: "IX_Reservations_SpotId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_ReservationStatusId",
                table: "Reservations",
                newName: "IX_Reservations_ReservationStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_AppUserId",
                table: "Reservations",
                newName: "IX_Reservations_AppUserId");

            migrationBuilder.AddColumn<int>(
                name: "ReservationId",
                table: "Stints",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reservations",
                table: "Reservations",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Stints_ReservationId",
                table: "Stints",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_AspNetUsers_AppUserId",
                table: "Reservations",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationStatus_ReservationStatusId",
                table: "Reservations",
                column: "ReservationStatusId",
                principalTable: "ReservationStatus",
                principalColumn: "ReservationStatusId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Spots_SpotId",
                table: "Reservations",
                column: "SpotId",
                principalTable: "Spots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Trip_TripId",
                table: "Reservations",
                column: "TripId",
                principalTable: "Trip",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stints_Reservations_ReservationId",
                table: "Stints",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "ReservationId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
