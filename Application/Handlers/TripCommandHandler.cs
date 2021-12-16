using Application.Commands;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
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
    public class TripCommandHandler : IRequestHandler<TripCommand, Result<int>>
    {
        private readonly RondeContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public TripCommandHandler(RondeContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
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
            var user = await _context.Users.FirstOrDefaultAsync(x =>
              x.UserName == _userAccessor.GetUsername());

            var attendee = new TripAttendee
            {
                AppUser = user,
                Trip = trip,
                IsHost = true
            };

            trip.Attendees.Add(attendee);

            _context.Trip.Add(trip);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<int>.Failure("Failed to create trip");

            return Result<int>.Success(trip.Id);
        }

    }
}