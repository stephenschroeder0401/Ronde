using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.DTOs;
using Application.Commands;
using Application.Handlers;
using Application.Queries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static API.DTOs.MockDtos;

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
        public async Task<IActionResult> CreateTrip(Trip trip)
        {
            return HandleResult(await Mediator.Send(new TripCommand { Trip = trip }));

        }

        // PUT api/values/5
        [Authorize(Policy = "IsTripHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTrip(int id, Trip trip)
        {
            trip.Id = id;
            return HandleResult(await Mediator.Send(new TripCommand { Trip = trip }));
        }

        // DELETE api/values/5
        [Authorize(Policy = "IsTripHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            return HandleResult(await Mediator.Send(new DeleteTripCommand { Id = id }));
        }

        [HttpPost("{id}/attend/{statusId}")]
        public async Task<IActionResult> Attend(int id, int statusId)
        {
            return HandleResult(await Mediator.Send(new AttendanceCommand { Id = id, ReservationStatusId = statusId}));
        }

      /*  [HttpGet("{id}/spots")]
        public async Task<IActionResult> Spots(int id)
        {
            var spots = new List<SpotMock>
            {
               new SpotMock { SpotId=1, RoomId = 1, Description ="King Bed - Private", IsPrivate = true, MaxGuests = 2},
               new SpotMock { SpotId=2, RoomId = 2, Description ="Queen Bunk (Bottom)", IsPrivate = false, MaxGuests = 1},
               new SpotMock { SpotId=3, RoomId = 2, Description ="Single Bunk (Top)", IsPrivate = false, MaxGuests = 1},
               new SpotMock { SpotId=4, RoomId = 3, Description ="Single Bed", IsPrivate = false, MaxGuests = 1},
               new SpotMock { SpotId=5, RoomId = 3, Description ="Single Bed", IsPrivate = false, MaxGuests = 1},
            };

            return Ok(spots);
        }

        [HttpGet("{id}/stints")]
        public async Task<IActionResult> Stints(int id)
        {
            var spots = new List<StintMock>
            {
               new StintMock { TripId = 1, StintId = 1, StartDate = DateTime.Parse("2022-01-20"), EndDate = DateTime.Parse("2022-01-23") },
               new StintMock { TripId = 1, StintId = 2, StartDate = DateTime.Parse("2022-01-23"), EndDate = DateTime.Parse("2022-01-27") },
               new StintMock { TripId = 1, StintId = 3, StartDate = DateTime.Parse("2022-01-27"), EndDate = DateTime.Parse("2022-01-30") },
            };

            return Ok(spots);
        }


        [HttpGet("{id}/prices")]
        public async Task<IActionResult> Prices(int id)
        {
            var spots = new List<PriceMock>
            {
               new PriceMock { PriceId = 1, StintId = 1, SpotId = 1, Price = Decimal.Parse("200.00")},
               new PriceMock { PriceId = 2, StintId = 2, SpotId = 1, Price = Decimal.Parse("200.00")},
               new PriceMock { PriceId = 3, StintId = 3, SpotId = 1, Price = Decimal.Parse("200.00")},

               new PriceMock { PriceId = 4, StintId = 1, SpotId = 2, Price = Decimal.Parse("125.00")},
               new PriceMock { PriceId = 5, StintId = 2, SpotId = 2, Price = Decimal.Parse("125.00")},
               new PriceMock { PriceId = 6, StintId = 3, SpotId = 2, Price = Decimal.Parse("125.00")},

               new PriceMock { PriceId = 7, StintId = 1, SpotId = 3, Price = Decimal.Parse("75.00")},
               new PriceMock { PriceId = 8, StintId = 2, SpotId = 3, Price = Decimal.Parse("75.00")},
               new PriceMock { PriceId = 9, StintId = 3, SpotId = 3, Price = Decimal.Parse("75.00")},

               new PriceMock { PriceId = 10, StintId = 1, SpotId = 4, Price = Decimal.Parse("100.00")},
               new PriceMock { PriceId = 11, StintId = 2, SpotId = 4, Price = Decimal.Parse("100.00")},
               new PriceMock { PriceId = 12, StintId = 3, SpotId = 4, Price = Decimal.Parse("100.00")},

               new PriceMock { PriceId = 10, StintId = 1, SpotId = 5, Price = Decimal.Parse("100.00")},
               new PriceMock { PriceId = 11, StintId = 2, SpotId = 5, Price = Decimal.Parse("100.00")},
               new PriceMock { PriceId = 12, StintId = 3, SpotId = 5, Price = Decimal.Parse("100.00")},

            };

            return Ok(spots);
        }*/
    }
}
