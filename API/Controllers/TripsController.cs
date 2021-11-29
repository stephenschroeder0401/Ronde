using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Commands;
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
        public async Task<IActionResult> Get()
        {
            return HandleResult(await Mediator.Send(new TripsQuery()));
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        { 
            return HandleResult(await Mediator.Send(new TripQuery { Id = id }));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> CreateTrip (Trip trip)
        {
            return HandleResult(await Mediator.Send(new TripCommand { Trip = trip }));

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTrip(int id, Trip trip)
        {
            trip.Id = id;
            return HandleResult(await Mediator.Send(new TripCommand { Trip = trip }));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            return HandleResult(await Mediator.Send(new DeleteTripCommand { Id = id }));
        }
    }
}
