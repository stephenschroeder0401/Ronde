using Application.Commands;
using Application.Queries;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("userfollowing")]
    [ApiController]
    public class UserFollowingController : BaseApiController
    {
        [HttpPost("{userId}")]
        public async Task<IActionResult> Follow(string userId)
        {
            return HandleResult(await Mediator.Send(new UserFollowingCommand{ TargetUserId = userId }));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new FollowersQuery { Username = username, Predicate = predicate }));
        }
    }
}
