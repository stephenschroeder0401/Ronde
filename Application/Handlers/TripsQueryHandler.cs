using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.DTOs;
using Application.Interfaces;
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
        private readonly IUserAccessor _userAccessor;
        public TripsQueryHandler(RondeContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }
    
        public async Task<Result<List<TripDto>>> Handle(TripsQuery request, CancellationToken ct)
        {
            var trips = await _context.Trip
                .ProjectTo<TripDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername()})
                .ToListAsync(ct);

            return Result<List<TripDto>>.Success(trips);
            
        }
    }
}
