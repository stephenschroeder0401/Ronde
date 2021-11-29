using Application.Core;
using Application.Queries;
using Domain;
using MediatR;
using Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace Application.Handlers
{    
    public class TripQueryHandler : IRequestHandler<TripQuery, Result<Trip>>
    {
        private readonly RondeContext _context;

        public TripQueryHandler(RondeContext context)
        {
            _context = context;
        }

        public async Task<Result<Trip>> Handle(TripQuery request, CancellationToken cancellationToken)
        {
            var trip = await _context.Trip.FindAsync(request.Id);

            return Result<Trip>.Success(trip);
        }

    }
}

