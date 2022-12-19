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
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handlers
{
    public class ReservationCommandHandler : IRequestHandler<ReservationCommand, Result<Unit>>
    {
        private readonly RondeContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public ReservationCommandHandler(RondeContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;

    }

        public async Task<Result<Unit>> Handle(ReservationCommand request, CancellationToken cancellationToken)
        {
            var trip = await _context.Trip.Include(a => a.Attendees)
               .ThenInclude(u => u.AppUser)
               .SingleOrDefaultAsync(x => x.Id == request.TripId);

            if (trip == null) return null;

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user == null) return null;

            var hostUsername = trip.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

            var reservation = trip.Reservations?.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

            //Check if this is a cancellation
            if (request.ReservationRequest.ReservationStatusId == 0 && reservation != null)
            {
                trip.Reservations.Remove(reservation);
            }
            else
            {

                var status = await _context.ReservationStatus.FirstOrDefaultAsync(x => x.ReservationStatusId == request.ReservationRequest.ReservationStatusId);

                //If status is changing, update the reservation
                if (reservation != null)
                {
                    reservation.ReservationStatus = status;
                }
                else if (reservation == null)
                {
                    var stints = await _context.Stints.Where(s => request.ReservationRequest.StintIds.Contains(s.StintId)).ToListAsync();
                    var resStints = new List<ReservationStint>();

                    reservation = new Reservation
                    {
                        AppUser = user,
                        Trip = trip,
                        TripId = trip.Id,
                        ReservationStatus = status,
                        Cost = request.ReservationRequest.Cost,
                        SpotId = request.ReservationRequest.SpotId
                    };

                    foreach (var stint in stints) 
                    {
                        resStints.Add(new ReservationStint()
                        {
                            Reservation = reservation,
                            Stint = stint
                        });
                    }

                    reservation.Stints = resStints;

                    if (trip.Reservations == null)
                        trip.Reservations = new List<Reservation>() { reservation };
                    else
                        trip.Reservations.Add(reservation);
                }
            }

            var result = await _context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem creating reservation");
        }
    }
}
