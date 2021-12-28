using Application.Commands;
using Application.Core;
using Application.Interfaces;
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
    public class PhotoDeleteCommandHandler : IRequestHandler<PhotoDeleteCommand, Result<Unit>>
    {
        private readonly RondeContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;

        public PhotoDeleteCommandHandler(RondeContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
        {
            _context = context;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(PhotoDeleteCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(u => u.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user == null) return null;

            var photo = user.Photos.FirstOrDefault(x => x.PublicId == request.PublicId);

            if (photo == null) return null;

            if (photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo");

            var result = await _photoAccessor.DeletePhoto(photo.PublicId);

            if (result == null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary");

            user.Photos.Remove(photo);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("Problem deleting photo from API");


        }
    }
}
