using Application.Commands;
using Application.Core;
using Application.Interfaces;
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
    public class UserFollowingCommandHandler : IRequestHandler<UserFollowingCommand, Result<int>>
    {
        private readonly RondeContext _context;
        private readonly IUserAccessor _userAccessor;

        public UserFollowingCommandHandler(RondeContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<int>> Handle(UserFollowingCommand request, CancellationToken cancellationToken)
        {
            bool result;
            var updatedId = 0;

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            var currentFollowing = await _context.UserFollowings
                .FirstOrDefaultAsync(x => x.ObserverId == user.Id && x.TargetId == request.TargetUserId);
            
            if(currentFollowing != null)
            {                 
                _context.UserFollowings.Remove(currentFollowing);

                result = await _context.SaveChangesAsync() > 0;
            }
            else
            {
                var targetUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.TargetUserId);

                var newUserFollowing = new UserFollowing { Observer = user, Target = targetUser };

                _context.UserFollowings.Add(newUserFollowing);

                result = await _context.SaveChangesAsync() > 0;

                updatedId = newUserFollowing.UserFollowingId;
                
            }

            if (!result) return Result<int>.Failure("Failed to update user following");

            return Result<int>.Success(updatedId);
        }
    }
}
