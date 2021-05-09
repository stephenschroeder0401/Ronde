using Application.Queries;
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

    public abstract class BaseHandler : IRequestHandler<BaseRequest, Trip>
    {
        public Task<Trip> Handle(BaseRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
