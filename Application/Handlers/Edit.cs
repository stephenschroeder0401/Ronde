using AutoMapper;
using Domain;
using MediatR;
using Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handlers
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Trip Trip { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public RondeContext _context;
            public IMapper _mapper;

            public Handler(RondeContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var trip = await _context.Trip.FindAsync(request.Trip.Id);

                _mapper.Map(request.Trip, trip);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }


        }
    }
}