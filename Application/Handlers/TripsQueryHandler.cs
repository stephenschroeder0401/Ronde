using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Queries;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistance;

namespace Application.Handlers
{
    public class TripsQueryHandler : IRequestHandler<TripsQuery, Result<List<Trip>>>
    {
        private readonly RondeContext _context;
        public TripsQueryHandler(RondeContext context)
        {
            _context = context;
        }
    
        public async Task<Result<List<Trip>>> Handle(TripsQuery request, CancellationToken ct)
        {
            return Result<List<Trip>>.Success(await _context.Trip.ToListAsync(ct));
        }
    }
}
