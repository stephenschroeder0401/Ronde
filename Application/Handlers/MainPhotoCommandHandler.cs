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
    public class MainPhotoCommandHandler : IRequestHandler<MainPhotoCommand, Result<string>>
    {
        private readonly RondeContext _context;
        private readonly IUserAccessor _userAccessor;
        public MainPhotoCommandHandler(RondeContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<string>> Handle(MainPhotoCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            var curMainPhoto = user.Photos.FirstOrDefault(p => p.IsMain == true);
            
            if(curMainPhoto != null) curMainPhoto.IsMain = false;

            var newMainPhoto = user.Photos.FirstOrDefault(p => p.PublicId == request.PublicId);

            if (newMainPhoto == null) return null;

            newMainPhoto.IsMain = true;

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Result<string>.Success(newMainPhoto.PublicId);

            return Result<string>.Failure("Problem changing main photo");

        }
    }
}
