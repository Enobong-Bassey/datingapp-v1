using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        // Define your DbSets here
        public DbSet<AppUser> Users { get; set; }
    }
}