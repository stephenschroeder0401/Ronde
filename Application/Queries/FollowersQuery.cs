using Application.Core;
using Application.Profiles;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Queries
{
    public class FollowersQuery : IRequest<Result<List<Profile>>>
    {
        public string Predicate { get; set; }
        public string Username { get; set; }
    }
}
