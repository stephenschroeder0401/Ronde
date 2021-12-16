using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistance
{
    public class RondeContext : IdentityDbContext<AppUser>
    {
        public RondeContext (DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Trip> Trip { get; set; }
        public DbSet<TripAttendee> TripAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TripAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.TripId }));

            builder.Entity<TripAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Trips)
                .HasForeignKey(aa => aa.AppUserId);
        }
    }
}

//  dotnet ef migrations add InitialCreate232 --project Persistance --startup-project API
//  dotnet ef database update --project Persistance --startup-project API