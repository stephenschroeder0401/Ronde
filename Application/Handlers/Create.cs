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
    public class Create
    {
        public class Command : IRequest
        {
            public Trip Trip { get; set; } 
        }

        public class Handler : IRequestHandler<Command>
        {
            public RondeContext _context { get; }
            public Handler(RondeContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Trip.Add(request.Trip);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
