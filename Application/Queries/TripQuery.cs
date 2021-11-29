using Application.Core;
using Domain;
using MediatR;


namespace Application.Queries
{
    public class TripQuery : IRequest<Result<Trip>>
    {
        public int Id { get; set; }
    }
}




