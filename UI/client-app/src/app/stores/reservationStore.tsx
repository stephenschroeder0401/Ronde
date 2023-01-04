import { action, makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import agent from "../api/agent";
import { Trip, TripFormValues, Reservation } from "../models/trip";


export default class ReservationStore{
    title = 'Reservations';
    
    userReservation: Reservation = {
        spotId: '0',
        stintIds: [],
        cost: 0,
        reservationStatusId: 0,
    };


    constructor(){
        makeAutoObservable(this);
    }

    setReservation(res: Reservation){
          runInAction(() =>{
                this.userReservation = res;
            })
    }

}