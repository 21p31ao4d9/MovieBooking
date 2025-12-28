using Microsoft.EntityFrameworkCore;

namespace MovieBookingApp.Models
{
    public class MovieBookingContext : DbContext
    {
        // DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Seat> Seats { get; set; }

        // Constructor for DI (connection string comes from API layer)
        public MovieBookingContext(DbContextOptions<MovieBookingContext> options) : base(options) { }

        // Model configuration + seeding
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Unique constraint
            modelBuilder.Entity<Movie>()
                .HasIndex(m => new { m.MovieName, m.TheatreName })
                .IsUnique();

            // Seed Users
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserID = 1,
                    FirstName = "Sophia",
                    LastName = "Admin",
                    Email = "admin@movie.com",
                    LoginID = "admin",
                    PasswordHash = "Admin@123",
                    ContactNumber = "9999999999",
                    Role = UserRole.Admin
                },
                new User
                {
                    UserID = 2,
                    FirstName = "John",
                    LastName = "Smith",
                    Email = "john@gmail.com",
                    LoginID = "johnsmith",
                    PasswordHash = "John@123",
                    ContactNumber = "9876543210",
                    Role = UserRole.User
                }
            );

            // Seed Movies
            modelBuilder.Entity<Movie>().HasData(
                new Movie
                {
                    MovieID = 1,
                    MovieName = "Avatar",
                    TheatreName = "PVR",
                    TotalTickets = 100,
                    AvailableTickets = 100,
                    Status = "Available"
                },
                new Movie
                {
                    MovieID = 2,
                    MovieName = "Inception",
                    TheatreName = "Inox",
                    TotalTickets = 80,
                    AvailableTickets = 80,
                    Status = "Available"
                }
            );

            // Seed Tickets
            modelBuilder.Entity<Ticket>().HasData(
                new Ticket
                {
                    TicketID = 1,
                    UserID = 2,
                    MovieID = 1,
                    Quantity = 2,
                    SeatNumbers = "A1,A2",
                    Status = "Confirmed"
                }
            );
        }
    }
}
