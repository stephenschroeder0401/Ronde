import { Profile, TripAttendee } from "./profile";

export interface Trip {
    id: number;
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername?: string;
    isCancelled: boolean;
    userStatus: number;
    isHost: boolean;
    host?: Profile;
    attendees?: TripAttendee[];
}

export class Trip implements Trip{
    constructor(init?: TripFormValues){
        Object.assign(this, init);
    }
}

export class TripFormValues{
    id?: number;
    title: string = '';
    category: string = '';
    description: string = '';
    startDate: Date | null = null;
    endDate: Date | null = null;
    city: string = '';
    venue: string = '';
    
    constructor(trip?: Trip){
        if(trip){
            this.id = trip.id;
            this.title = trip.title;
            this.category = trip.category;
            this.description = trip.description;
            this.startDate = trip.startDate;
            this.endDate = trip.endDate;
            this.venue = trip.venue;
            this.city = trip.city;
        }
    }
} 