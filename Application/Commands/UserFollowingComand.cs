using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Commands
{
    public class UserFollowingCommand: IRequest<Result<int>>
    {
        public string TargetUserId { get; set; }
    }
}
