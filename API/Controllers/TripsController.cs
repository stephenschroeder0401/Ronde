﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.DTOs;
using Application.Commands;
using Application.DTOs;
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
        [AllowAnonymous]
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

        [HttpPost("{id}/reservation/")]
        public async Task<IActionResult> CreateReservation(int id, ReservationRequest reservation)
        {
            return HandleResult(await Mediator.Send(new ReservationCommand { TripId = id, ReservationRequest = reservation}));
        }

        //this can go 
        [HttpPost("{id}/attend/{statusId}")]
        public async Task<IActionResult> Attend(int id, int statusId)
        {
            return HandleResult(await Mediator.Send(new AttendanceCommand { Id = id, ReservationStatusId = statusId}));
        }
    }
}
