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
using System.Linq;
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

            var prices = new List<PriceDto>();

            foreach(var spot in trip.Spots)
            {
                foreach(var stint in trip.Stints)
                {
                    var price = _context.SpotPrices.Where(sp => sp.Stint.StintId == stint.StintId && sp.Spot.Id == spot.Id).FirstOrDefault();
                    if (price != null)
                        prices.Add(new PriceDto() {Id = price.PriceId, SpotId = price.Spot.Id, StintId = price.Stint.StintId, Amount = price.Amount }) ;
                }
            }

            trip.Prices = prices;

            return Result<TripDto>.Success(trip);
        }

    }
}

