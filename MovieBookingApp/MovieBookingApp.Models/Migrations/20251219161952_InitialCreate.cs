using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieBookingApp.Models.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    MovieID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MovieName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TheatreName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TotalTickets = table.Column<int>(type: "int", nullable: false),
                    AvailableTickets = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.MovieID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LoginID = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    TicketID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    MovieID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    SeatNumbers = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.TicketID);
                    table.ForeignKey(
                        name: "FK_Tickets_Movies_MovieID",
                        column: x => x.MovieID,
                        principalTable: "Movies",
                        principalColumn: "MovieID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "MovieID", "AvailableTickets", "MovieName", "Status", "TheatreName", "TotalTickets" },
                values: new object[,]
                {
                    { 1, 100, "Avatar", "Available", "PVR", 100 },
                    { 2, 80, "Inception", "Available", "Inox", 80 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "ContactNumber", "Email", "FirstName", "LastName", "LoginID", "PasswordHash", "Role" },
                values: new object[,]
                {
                    { 1, "9999999999", "admin@movie.com", "Sophia", "Admin", "admin", "Admin@123", 2 },
                    { 2, "9876543210", "john@gmail.com", "John", "Smith", "johnsmith", "John@123", 1 }
                });

            migrationBuilder.InsertData(
                table: "Tickets",
                columns: new[] { "TicketID", "MovieID", "Quantity", "SeatNumbers", "Status", "UserID" },
                values: new object[] { 1, 1, 2, "A1,A2", "Confirmed", 2 });

            migrationBuilder.CreateIndex(
                name: "IX_Movies_MovieName_TheatreName",
                table: "Movies",
                columns: new[] { "MovieName", "TheatreName" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_MovieID",
                table: "Tickets",
                column: "MovieID");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserID",
                table: "Tickets",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
