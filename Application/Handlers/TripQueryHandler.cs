using Application.Core;
using Application.DTOs;
using Application.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace Application.Handlers
{    
    public class TripQueryHandler : IRequestHandler<TripQuery, Result<TripDto>>
    {
        private readonly RondeContext _context;
        private readonly IMapper _mapper;

        public TripQueryHandler(RondeContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<TripDto>> Handle(TripQuery request, CancellationToken cancellationToken)
        {
            var trip = await _context.Trip.ProjectTo<TripDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            trip.Spots = new List<SpotDto>(){
               new SpotDto {SpotId = 1, RoomId = 1, Title="King Bed - Master Bedroom", 
                   Description = "$200 per Leg of the Trip <br/>King Bed in a private Room", IsPrivate = true, MaxGuests = 2 },
               new SpotDto { SpotId = 2, RoomId = 2, Description = "Queen Bunk (Bottom)", IsPrivate = false, MaxGuests = 1},
               new SpotDto { SpotId = 3, RoomId = 2, Description = "Single Bunk (Top)", IsPrivate = false, MaxGuests = 1 },
               new SpotDto { SpotId = 4, RoomId = 3, Description = "Single Bed", IsPrivate = false, MaxGuests = 1 },
               new SpotDto { SpotId = 5, RoomId = 3, Description = "Single Bed", IsPrivate = false, MaxGuests = 1 }};

            trip.Stints = new List<StintDto>() {
               new StintDto { StintId = 1, StartDate = DateTime.Parse("2022-01-20"), EndDate = DateTime.Parse("2022-01-23") },
               new StintDto { StintId = 2, StartDate = DateTime.Parse("2022-01-23"), EndDate = DateTime.Parse("2022-01-27") },
               new StintDto { StintId = 3, StartDate = DateTime.Parse("2022-01-27"), EndDate = DateTime.Parse("2022-01-30") },
            };

            trip.Prices = new List<PriceDto>
            {
               new PriceDto{ PriceId = 1, StintId = 1, SpotId = 1, Price = Decimal.Parse("200.00") },
               new PriceDto{ PriceId = 2, StintId = 2, SpotId = 1, Price = Decimal.Parse("200.00") },
               new PriceDto{ PriceId = 3, StintId = 3, SpotId = 1, Price = Decimal.Parse("200.00") },

               new PriceDto{ PriceId = 4, StintId = 1, SpotId = 2, Price = Decimal.Parse("125.00") },
               new PriceDto{ PriceId = 5, StintId = 2, SpotId = 2, Price = Decimal.Parse("125.00") },
               new PriceDto{ PriceId = 6, StintId = 3, SpotId = 2, Price = Decimal.Parse("125.00") },

               new PriceDto{ PriceId = 7, StintId = 1, SpotId = 3, Price = Decimal.Parse("75.00") },
               new PriceDto{ PriceId = 8, StintId = 2, SpotId = 3, Price = Decimal.Parse("75.00") },
               new PriceDto{ PriceId = 9, StintId = 3, SpotId = 3, Price = Decimal.Parse("75.00") },

               new PriceDto{ PriceId = 10, StintId = 1, SpotId = 4, Price = Decimal.Parse("100.00") },
               new PriceDto{ PriceId = 11, StintId = 2, SpotId = 4, Price = Decimal.Parse("100.00") },
               new PriceDto{ PriceId = 12, StintId = 3, SpotId = 4, Price = Decimal.Parse("100.00") },

               new PriceDto{ PriceId = 10, StintId = 1, SpotId = 5, Price = Decimal.Parse("100.00") },
               new PriceDto{ PriceId = 11, StintId = 2, SpotId = 5, Price = Decimal.Parse("100.00") },
               new PriceDto{ PriceId = 12, StintId = 3, SpotId = 5, Price = Decimal.Parse("100.00") },
            };


            return Result<TripDto>.Success(trip);
        }

    }
}

