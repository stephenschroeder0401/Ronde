using Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistance
{
    public class RondeContext : DbContext
    {
        public RondeContext (DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //this was instructional by the tutorial on how to create a migration for seed data.. may want to remove
            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value 101"},
                    new Value { Id = 2, Name = "Value 102" },
                    new Value { Id = 3, Name = "Value 103" }
                ); 
        }
    }
}
