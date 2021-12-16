using Application.Core;
using Application.DTOs;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Queries
{
    public class TripsQuery : IRequest<Result<List<TripDto>>>
    {
    }
}
