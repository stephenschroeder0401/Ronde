using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class Reservations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "Trip",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    RoomId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TripId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.RoomId);
                    table.ForeignKey(
                        name: "FK_Rooms_Trip_TripId",
                        column: x => x.TripId,
                        principalTable: "Trip",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Stints",
                columns: table => new
                {
                    StintId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripId = table.Column<int>(type: "int", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stints", x => x.StintId);
                    table.ForeignKey(
                        name: "FK_Stints_Trip_TripId",
                        column: x => x.TripId,
                        principalTable: "Trip",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Spots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TripId = table.Column<int>(type: "int", nullable: true),
                    RoomId = table.Column<int>(type: "int", nullable: true),
                    IsPrivate = table.Column<bool>(type: "bit", nullable: false),
                    MaxGuests = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spots_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "RoomId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Spots_Trip_TripId",
                        column: x => x.TripId,
                        principalTable: "Trip",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reservation",
                columns: table => new
                {
                    ReservationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TripId = table.Column<int>(type: "int", nullable: true),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SpotId = table.Column<int>(type: "int", nullable: true),
                    Cost = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservation", x => x.ReservationId);
                    table.ForeignKey(
                        name: "FK_Reservation_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservation_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservation_Trip_TripId",
                        column: x => x.TripId,
                        principalTable: "Trip",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SpotPrices",
                columns: table => new
                {
                    PriceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StintId = table.Column<int>(type: "int", nullable: true),
                    SpotId = table.Column<int>(type: "int", nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpotPrices", x => x.PriceId);
                    table.ForeignKey(
                        name: "FK_SpotPrices_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SpotPrices_Stints_StintId",
                        column: x => x.StintId,
                        principalTable: "Stints",
                        principalColumn: "StintId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReservationStint",
                columns: table => new
                {
                    RsservationStintId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReservationId = table.Column<int>(type: "int", nullable: false),
                    StintId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationStint", x => x.RsservationStintId);
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
                name: "IX_Reservation_AppUserId",
                table: "Reservation",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_SpotId",
                table: "Reservation",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_TripId",
                table: "Reservation",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationStint_ReservationId_RsservationStintId",
                table: "ReservationStint",
                columns: new[] { "ReservationId", "RsservationStintId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReservationStint_StintId",
                table: "ReservationStint",
                column: "StintId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_TripId",
                table: "Rooms",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_SpotPrices_SpotId",
                table: "SpotPrices",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_SpotPrices_StintId",
                table: "SpotPrices",
                column: "StintId");

            migrationBuilder.CreateIndex(
                name: "IX_Spots_RoomId",
                table: "Spots",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Spots_TripId",
                table: "Spots",
                column: "TripId");

            migrationBuilder.CreateIndex(
                name: "IX_Stints_TripId",
                table: "Stints",
                column: "TripId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationStint");

            migrationBuilder.DropTable(
                name: "SpotPrices");

            migrationBuilder.DropTable(
                name: "Reservation");

            migrationBuilder.DropTable(
                name: "Stints");

            migrationBuilder.DropTable(
                name: "Spots");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Trip");
        }
    }
}
