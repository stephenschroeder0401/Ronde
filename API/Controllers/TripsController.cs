using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Handlers;
using Application.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("trips")]
    [ApiController]
    public class TripsController : BaseApiController
    {
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<List<Trip>>> Get()
        {
            return await Mediator.Send(new List.Query());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> Get(int id)
        {
            var q = new TripQuery();
            q.Id = id;
            return Ok(await Mediator.Send(new TripQuery{ Id = id }));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> CreateTrip (Trip trip)
        {
            return Ok(await Mediator.Send(new Create.Command { Trip = trip }));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTrip(int id, Trip trip)
        {
            trip.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Trip = trip }));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
