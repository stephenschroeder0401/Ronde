import { TablePaginationUnstyledDisplayedRowsSlotProps } from "@mui/base";
import { CardDescriptionProps } from "semantic-ui-react";
import { isConstructorDeclaration } from "typescript";
import { Profile, TripAttendee } from "./profile";
import { User } from "./user";

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
    spots?: Spot[];
    stints?: Stint[];
    prices?: Price[];
    reservations?: Reservation[];
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

export interface Spot{
     id: number;
     title: string;
     description: string;
     isPrivate: boolean;
     maxGuests: number;
     roomId: number;
     img: string;
}

export interface Stint{
    stintId: number;
    startDate: Date;
    endDate: Date;
}


export interface Price{
    id: number;
    stintId: number;
    spotId: number;
    amount: number;
}

export interface Reservation{
    spotId: String | undefined;
    stintIds: String[];
    stints: Stint[];
    cost: number ;
    reservationStatusId: number;   
    userName: String | undefined;
    fullName: String | undefined;
}

export class Reservation implements Reservation {
     constructor(){
        Object.assign(this);
    }
}