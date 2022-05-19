using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class AddAttendeeStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AttendeeStatusId",
                table: "TripAttendees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AttendeeStatus",
                columns: table => new
                {
                    AttendeeStatusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendeeStatus", x => x.AttendeeStatusId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TripAttendees_AttendeeStatusId",
                table: "TripAttendees",
                column: "AttendeeStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_TripAttendees_AttendeeStatus_AttendeeStatusId",
                table: "TripAttendees",
                column: "AttendeeStatusId",
                principalTable: "AttendeeStatus",
                principalColumn: "AttendeeStatusId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.InsertData(
               table: "AttendeeStatus",
               columns: new[] { "Status" },
               values: new object[] {"Interested"});
            
            migrationBuilder.InsertData(
               table: "AttendeeStatus",
               columns: new[] { "Status" },
               values: new object[] { "Accepted" });

            migrationBuilder.InsertData(
               table: "AttendeeStatus",
               columns: new[] { "Status" },
               values: new object[] { "Denied" });

            migrationBuilder.InsertData(
               table: "AttendeeStatus",
               columns: new[] { "Status" },
               values: new object[] { "Paid" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripAttendees_AttendeeStatus_AttendeeStatusId",
                table: "TripAttendees");

            migrationBuilder.DropTable(
                name: "AttendeeStatus");

            migrationBuilder.DropIndex(
                name: "IX_TripAttendees_AttendeeStatusId",
                table: "TripAttendees");

            migrationBuilder.DropColumn(
                name: "AttendeeStatusId",
                table: "TripAttendees");
        }
    }
}
