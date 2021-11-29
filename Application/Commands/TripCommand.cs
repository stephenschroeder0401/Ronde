using Application.Core;
using Application.Handlers;
using Domain;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Commands
{
    public class TripCommand : IRequest<Result<int>>
    {
        public Trip Trip { get; set; }
    }

    public class TripCommandValidator : AbstractValidator<TripCommand>
    { 
        public TripCommandValidator()
        {
            RuleFor(x => x.Trip).SetValidator(new TripValidator());
        }
    }
}
