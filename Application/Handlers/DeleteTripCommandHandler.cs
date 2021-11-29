using Application.Commands;
using Application.Core;
using MediatR;
using Persistance;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handlers
{
    public class DeleteTripCommandHandler : IRequestHandler<DeleteTripCommand, Result<Unit>>
    {
        public RondeContext _context { get; set; }
        public DeleteTripCommandHandler(RondeContext context)
        {
            _context = context;
        }
    
        public async Task<Result<Unit>> Handle(DeleteTripCommand request, CancellationToken cancellationToken)
        {
            var trip = await _context.Trip.FindAsync(request.Id);
    
            if (trip == null) return null;
    
            _context.Remove(trip);
    
            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete trip");
    
            return Result<Unit>.Success(Unit.Value);
        }
    }
}

