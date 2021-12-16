using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using Application.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistance;

namespace Application.Handlers
{
    public class TripsQueryHandler : IRequestHandler<TripsQuery, Result<List<TripDto>>>
    {
        private readonly RondeContext _context;
        private readonly IMapper _mapper;
        public TripsQueryHandler(RondeContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    
        public async Task<Result<List<TripDto>>> Handle(TripsQuery request, CancellationToken ct)
        {
            var trips = await _context.Trip
                .ProjectTo<TripDto>(_mapper.ConfigurationProvider)
                .ToListAsync(ct);

            return Result<List<TripDto>>.Success(trips);
            
        }
    }
}
