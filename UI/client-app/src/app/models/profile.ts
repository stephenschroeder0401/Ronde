import internal from "stream";
import { Trip } from "./trip";
import { User } from "./user";

export interface Profile {
    userId: string;
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: Photo[];
    followersCount: number;
    followingCount: number;
    following: boolean;
}

export class Profile implements Profile{
    constructor(user: User){
        this.username = user.userName;
        this.displayName = user.displayName;
        this.image = user.image
    }
}

export interface Photo{
    publicId: string;
    url: string;
    isMain: boolean;
}

export interface TripAttendee{
    userId: string;
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: Photo[];
    followersCount: number;
    followingCount: number;
    following: boolean;
    status: number
}

export class TripAttendee implements TripAttendee{
    constructor(profile: Profile, status: number){
        this.userId = profile.userId;
        this.username = profile.username;
        this.displayName = profile.displayName;
        this.image = profile.image
        this.bio = profile.bio;
        this.photos = profile.photos;
        this.followersCount = profile.followersCount;
        this.followingCount = profile.followingCount;
        this.following = profile.following;
        this.status = status;
    }
}
/* export interface TripAttendee {
    profile: Profile;
    status: number;
}

export class TripAttendee{
    constructor(profile: Profile, status: number){
        this.profile = profile;
        this.status = status;
    }
} */