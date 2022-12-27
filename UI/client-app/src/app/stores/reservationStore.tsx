import { action, makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import agent from "../api/agent";
import { Trip, TripFormValues, Reservation } from "../models/trip";
import {format} from "date-fns";
import { store } from "./store";
import UserStore from "./userStore";
import { Profile, TripAttendee } from "../models/profile";
import { tokenToString } from "typescript";
import { REPLCommand } from "repl";


export default class ReservationStore{
    title = 'Reservations';
    
    userReservation: Reservation;


    constructor(){
        makeAutoObservable(this);
        this.userReservation =  new Reservation;
    }

    setReservation(res: Reservation){
        this.userReservation = res;
    }

}