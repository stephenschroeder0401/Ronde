using Application.Core;
using Application.DTOs;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Commands
{
    public class ReservationCommand : IRequest<Result<Unit>>
    {
        public int TripId { get; set; }
        public ReservationRequest ReservationRequest {get; set;}
    }
}
