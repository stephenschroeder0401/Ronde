using Application.DTOs;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {

            string currentUsername = null;

            CreateMap<Trip, Trip>();
            
            CreateMap<Trip, TripDto>()
                    .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<Reservation, ReservationDto>()
                   .ForMember(d => d.UserName, o => o.MapFrom(r => r.AppUser.UserName));

            CreateMap<TripAttendee, AttendeeDto>()
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.AppUser.Id))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, 
                    o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count()))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count()))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.ReservationStatus.ReservationStatusId));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count()))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count()))
                .ForMember(d => d.Following, 
                    o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));


        }
    }
}
