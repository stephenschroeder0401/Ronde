using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistance;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(RondeContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Trip.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var Trip = new List<Trip>
                {
                    new Trip
                    {
                        Title = "Past Trip 1",
                        StartDate = DateTime.Now.AddMonths(-2),
                        Description = "Trip 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Trip
                    {
                        Title = "Past Trip 2",
                        StartDate = DateTime.Now.AddMonths(-1),
                        Description = "Trip 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new TripAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Trip
                    {
                        Title = "Future Trip 1",
                        StartDate = DateTime.Now.AddMonths(1),
                        Description = "Trip 1 month in future",
                        Category = "music",
                        City = "London",
                        Venue = "Wembly Stadium",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new TripAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Trip
                    {
                        Title = "Future Trip 2",
                        StartDate = DateTime.Now.AddMonths(2),
                        Description = "Trip 2 months in future",
                        Category = "food",
                        City = "London",
                        Venue = "Jamies Italian",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new TripAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Trip
                    {
                        Title = "Future Trip 3",
                        StartDate = DateTime.Now.AddMonths(3),
                        Description = "Trip 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[1],
                                IsHost = true
                            },
                            new TripAttendee
                            {
                                AppUser = users[0],
                                IsHost = false
                            },
                        }
                    },
                    new Trip
                    {
                        Title = "Future Trip 4",
                        StartDate = DateTime.Now.AddMonths(4),
                        Description = "Trip 4 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "British Museum",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[1],
                                IsHost = true
                            }
                        }
                    },
                    new Trip
                    {
                        Title = "Future Trip 5",
                        StartDate = DateTime.Now.AddMonths(5),
                        Description = "Trip 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new TripAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Trip
                    {
                        Title = "Future Trip 6",
                        StartDate = DateTime.Now.AddMonths(6),
                        Description = "Trip 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "O2 Arena",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new TripAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Trip
                    {
                        Title = "Future Trip 7",
                        StartDate = DateTime.Now.AddMonths(7),
                        Description = "Trip 7 months in future",
                        Category = "travel",
                        City = "Berlin",
                        Venue = "All",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new TripAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Trip
                    {
                        Title = "Future Trip 8",
                        StartDate = DateTime.Now.AddMonths(8),
                        Description = "Trip 8 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<TripAttendee>
                        {
                            new TripAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new TripAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    }
                };

                await context.Trip.AddRangeAsync(Trip);
                await context.SaveChangesAsync();
            }
        }
    }
}
