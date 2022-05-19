import internal from "stream";
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