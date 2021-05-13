using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Commands
{
    public class TripCommand : IRequest
    {
        public Trip Trip { get; set; }
    }

}
