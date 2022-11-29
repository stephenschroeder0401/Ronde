using Application.Commands;
using Application.Core;
using Application.Interfaces;
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
    public class AttendanceCommandHandler : IRequestHandler<AttendanceCommand, Result<Unit>>
    {
        private readonly RondeContext _context;
        private readonly IUserAccessor _userAccessor;

        public AttendanceCommandHandler(RondeContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(AttendanceCommand request, CancellationToken cancellationToken)
        {
            var trip = await _context.Trip.Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

            if (trip == null) return null;

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if(user == null) return null;

            var hostUsername = trip.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

            var attendance = trip.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

            if (request.AttendeeStatusId == 0 && attendance != null)
            {
                trip.Attendees.Remove(attendance);
            }
            else
            {

                var status = await _context.AttendeeStatus.FirstOrDefaultAsync(x => x.AttendeeStatusId == request.AttendeeStatusId);


                if (attendance != null && hostUsername == user.UserName)
                {
                    trip.IsCancelled = !trip.IsCancelled;
                }

                if (attendance != null && hostUsername != user.UserName)
                {
                    attendance.AttendeeStatus = status;
                }
                else if (attendance == null)
                {
                    attendance = new TripAttendee
                    {
                        AppUser = user,
                        Trip = trip,
                        TripId = trip.Id,
                        IsHost = false,
                        AttendeeStatus = status,
                    };
                    await _context.TripAttendees.AddAsync(attendance);
                }
            }

            var result = await _context.SaveChangesAsync() > 0;


            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            
        }
    }
}
