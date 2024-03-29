﻿using Application.Profiles;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTOs
{
    public class TripDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public string HostUsername { get; set; }
        public ICollection<Spot>  Spots { get; set; }
        public ICollection<Stint> Stints { get; set; }
        public ICollection<PriceDto>  Prices { get; set; }
        public ICollection<ReservationDto> Reservations { get; set; }
    }
}
