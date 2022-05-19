using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using Application.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class FollowersQueryHandler : IRequestHandler<FollowersQuery, Result<List<Profiles.Profile>>>
    {
        private readonly RondeContext _context;

        private readonly IUserAccessor _userAccessor;

        private readonly IMapper _mapper;

        public FollowersQueryHandler(RondeContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<List<Profiles.Profile>>> Handle(FollowersQuery request, CancellationToken cancellationToken)
        {
            var profiles = new List<Profiles.Profile>();

            switch (request.Predicate)
            {
                case "followers":
                    profiles = await _context.UserFollowings.Where(x => x.Target.UserName == request.Username)
                        .Select(u => u.Observer)
                        .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider, 
                            new { currentUsername = _userAccessor.GetUsername()})
                        .ToListAsync();
                    break;

                case "following":
                    profiles = await _context.UserFollowings.Where(x => x.Observer.UserName == request.Username)
                        .Select(u => u.Target)
                        .ProjectTo<Profiles.Profile>(_mapper.ConfigurationProvider,
                            new { currentUsername = _userAccessor.GetUsername() })
                        .ToListAsync();
                    break;
            }

            return Result<List<Profiles.Profile>>.Success(profiles);
        }
    }
}
