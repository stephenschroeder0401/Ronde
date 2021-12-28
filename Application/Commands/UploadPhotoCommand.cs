using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Commands
{
    public class UploadPhotoCommand : IRequest<Result<Photo>>
    {
        public IFormFile File { get; set; }

    }
}
