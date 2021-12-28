using Application.Commands;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("photos")]
    [ApiController]
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] UploadPhotoCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut]
        public async Task<IActionResult> SetMain([FromBody] MainPhotoCommand command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{Id}")] 
        public async Task<IActionResult> Delete(string Id)
        {
            return HandleResult(await Mediator.Send(new PhotoDeleteCommand { PublicId = Id }));
        }
    }
}
