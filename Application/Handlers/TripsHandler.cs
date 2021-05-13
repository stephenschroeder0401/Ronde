using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Queries;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistance;

namespace Application.Handlers
{
    public class Handler : IRequestHandler<TripsQuery, List<Trip>>
    {
        private readonly RondeContext _context;
        public Handler(RondeContext context)
        {
            _context = context;
        }
    
        public async Task<List<Trip>> Handle(TripsQuery request, CancellationToken ct)
        {
            return await _context.Trip.ToListAsync();
        }
    }
}
