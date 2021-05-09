using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Queries
{
    public abstract class BaseRequest : IRequest<Trip>
    {
    }
}
