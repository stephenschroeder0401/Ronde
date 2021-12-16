using Application.Core;
using Application.DTOs;
using Domain;
using MediatR;


namespace Application.Queries
{
    public class TripQuery : IRequest<Result<TripDto>>
    {
        public int Id { get; set; }
    }
}




