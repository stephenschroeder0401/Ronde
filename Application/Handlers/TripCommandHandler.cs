using Application.Commands;
using AutoMapper;
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
    public class TripCommandHandler : IRequestHandler<TripCommand>
    {
        public RondeContext _context;
        public IMapper _mapper;
    
        public TripCommandHandler(RondeContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Unit> Handle(TripCommand request, CancellationToken cancellationToken)
        {
            var trip = request.Trip;

            return trip.Id == 0 ? AddTrip(trip).Result : EditTrip(trip).Result;
        }

        private async Task<Unit> EditTrip(Trip updatedTrip)
        {
            var trip = await _context.Trip.FindAsync(updatedTrip.Id);

            _mapper.Map(updatedTrip, trip);

            await _context.SaveChangesAsync();

            return Unit.Value;

        }

        private async Task<Unit> AddTrip(Trip trip)
        {
            _context.Trip.Add(trip);

            await _context.SaveChangesAsync();

            return Unit.Value;

        }
    }
}