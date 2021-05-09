using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistance;

namespace Application.Handlers
{
    public class List
    {
        public class Query : IRequest<List<Trip>> { }

        public class Handler : IRequestHandler<Query, List<Trip>>
        {
            private readonly RondeContext _context;
            private readonly ILogger _logger;
            public Handler(RondeContext context)
            {
                _context = context;
            }

            public async Task<List<Trip>> Handle(Query request, CancellationToken ct)
            {
                return await _context.Trip.ToListAsync();
            }
        }
    }
}
