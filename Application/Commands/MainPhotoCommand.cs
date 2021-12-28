using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Commands
{
    public class MainPhotoCommand : IRequest<Result<string>>
    {
        public string PublicId { get; set; }
    }
}
