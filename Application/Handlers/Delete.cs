using MediatR;
using Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handlers
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public RondeContext _context { get; set; }
            public Handler(RondeContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var trip = await _context.Trip.FindAsync(request.Id);

                _context.Remove(trip);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
