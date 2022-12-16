using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Commands
{
    public class AttendanceCommand : IRequest<Result<Unit>>
    {
        public int Id { get; set; }

        public int ReservationStatusId { get; set; }

    }
}
