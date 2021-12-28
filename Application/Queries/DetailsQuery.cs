using Application.Core;
using Application.Profiles;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Queries
{
    public class DetailsQuery : IRequest<Result<Profile>>
    {
        public string Username { get; set; }
    }


}
