using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Queries
{
    public class TripQuery : IRequest<Trip>
    {
        public int Id { get; set; }
    }
}




