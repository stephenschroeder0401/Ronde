using Application.Commands;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handlers
{
    public class UploadPhotoCommandHandler : IRequestHandler<UploadPhotoCommand, Result<Photo>>
    {
        private readonly RondeContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAcessor;

        public UploadPhotoCommandHandler(RondeContext context, IPhotoAccessor photoAccessor, IUserAccessor userAcessor)
        {
            _context = context;
            _photoAccessor = photoAccessor;
            _userAcessor = userAcessor;
        }

        public async Task<Result<Photo>> Handle(UploadPhotoCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAcessor.GetUsername());

            if (user == null) return null;

            var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

            var photo = new Photo
            {
                Url = photoUploadResult.Url,
                PublicId = photoUploadResult.PublicId,
            };

            if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

            user.Photos.Add(photo);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Result<Photo>.Success(photo);

            return Result<Photo>.Failure("Problem adding photo");
        }
    }
}
