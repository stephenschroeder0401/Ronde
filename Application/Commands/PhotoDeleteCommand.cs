using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Commands
{
    public class PhotoDeleteCommand : IRequest<Result<Unit>>
    {
        public string PublicId { get; set; }
    }
}
