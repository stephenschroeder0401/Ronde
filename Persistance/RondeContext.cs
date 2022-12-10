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

        public DbSet<Trip> Trip { get; set; }
        public DbSet<TripAttendee> TripAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }
        public DbSet<AttendeeStatus> AttendeeStatus { get; set; }
        public DbSet<SpotPrice> SpotPrices { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Stint> Stints { get; set; }
        public DbSet<Spot> Spots { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TripAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.TripId }));

            builder.Entity<TripAttendee>(t => {
                t.HasOne(u => u.AppUser)
                .WithMany(a => a.Trips)
                .HasForeignKey(aa => aa.AppUserId);

                t.HasOne(s => s.AttendeeStatus);
                });

            builder.Entity<UserFollowing>(b =>
            {
                b.HasIndex(p => new { p.ObserverId, p.TargetId }).IsUnique();

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<SpotPrice>().Property(sp => sp.Amount).HasPrecision(10, 2);
            builder.Entity<Trip>().Property(sp => sp.Cost).HasPrecision(10, 2);
        }
    }
}

//  dotnet ef migrations add InitialCreate232 --project Persistance --startup-project API
//  dotnet ef database update --project Persistance --startup-project API