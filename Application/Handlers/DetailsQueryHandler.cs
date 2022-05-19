using Application.Core;
using Application.Profiles;
using Application.Queries;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Profiles;
using AutoMapper;
using Profile = Application.Profiles.Profile;
using Application.Interfaces;

namespace Application.Handlers
{
    public class DetailsQueryHandler : IRequestHandler<DetailsQuery, Result<Profile>>
    {
        private readonly RondeContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public DetailsQueryHandler(RondeContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Profile>> Handle(DetailsQuery request, CancellationToken cancellationToken)
        {

            var test = request;

            var user = await _context.Users
                .ProjectTo<Profile>(_mapper.ConfigurationProvider, 
                    new { currentUsername = _userAccessor.GetUsername()})
                .SingleOrDefaultAsync(x => x.Username == request.Username);

            if (user == null) return null;


            return Result<Profiles.Profile>.Success(user);
        }
    }
}
