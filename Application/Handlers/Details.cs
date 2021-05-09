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
    public class TripHandler : IRequestHandler<TripQuery, Trip>
    {
        private readonly RondeContext _context;

        public TripHandler(RondeContext context)
        {
            _context = context;
        }

        public async Task<Trip> Handle(TripQuery request, CancellationToken cancellationToken)
        {
            return await _context.Trip.FindAsync(request.Id);
        }

    }
}

