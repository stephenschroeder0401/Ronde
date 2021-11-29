using Application.Commands;
using Application.Core;
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
    public class TripCommandHandler : IRequestHandler<TripCommand, Result<int>>
    {
        public RondeContext _context;
        public IMapper _mapper;

        public TripCommandHandler(RondeContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<int>> Handle(TripCommand request, CancellationToken cancellationToken)
        {
            var trip = request.Trip;

            return trip.Id == 0 ? AddTrip(trip).Result : EditTrip(trip).Result;
        }

        private async Task<Result<int>> EditTrip(Trip updatedTrip)
        {
            var trip = await _context.Trip.FindAsync(updatedTrip.Id);

            if (trip == null) return null;

            _mapper.Map(updatedTrip, trip);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Failed to update Trip");

            return Result<int>.Success(trip.Id);

        }

        private async Task<Result<int>> AddTrip(Trip trip)
        {
            _context.Trip.Add(trip);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Failed to create trip");

            return Result<int>.Success(trip.Id);
        }

    }
}