using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class AddReservationStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReservationStatusId",
                table: "TripAttendees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReservationStatus",
                columns: table => new
                {
                    ReservationStatusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationStatus", x => x.ReservationStatusId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TripAttendees_ReservationStatusId",
                table: "TripAttendees",
                column: "ReservationStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_TripAttendees_ReservationStatus_ReservationStatusId",
                table: "TripAttendees",
                column: "ReservationStatusId",
                principalTable: "ReservationStatus",
                principalColumn: "ReservationStatusId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.InsertData(
               table: "ReservationStatus",
               columns: new[] { "Status" },
               values: new object[] {"Interested"});
            
            migrationBuilder.InsertData(
               table: "ReservationStatus",
               columns: new[] { "Status" },
               values: new object[] { "Accepted" });

            migrationBuilder.InsertData(
               table: "ReservationStatus",
               columns: new[] { "Status" },
               values: new object[] { "Denied" });

            migrationBuilder.InsertData(
               table: "ReservationStatus",
               columns: new[] { "Status" },
               values: new object[] { "Paid" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripAttendees_ReservationStatus_ReservationStatusId",
                table: "TripAttendees");

            migrationBuilder.DropTable(
                name: "ReservationStatus");

            migrationBuilder.DropIndex(
                name: "IX_TripAttendees_ReservationStatusId",
                table: "TripAttendees");

            migrationBuilder.DropColumn(
                name: "ReservationStatusId",
                table: "TripAttendees");
        }
    }
}
