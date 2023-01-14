import { action, makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import agent from "../api/agent";
import { Trip, TripFormValues, Reservation } from "../models/trip";


export default class ReservationStore{
    title = 'Reservations';
    
    userReservation: Reservation = {
        spotId: '0',
        stintIds: [],
        stints: [],
        cost: 0,
        reservationStatusId: 0,
        userName: '',
        fullName: ''
    };


    constructor(){
        makeAutoObservable(this);
    }

    setReservation(res: Reservation){
        console.log("setting res");
        console.log(res);
          runInAction(() =>{
                this.userReservation = res;
                this.userReservation.cost = res.cost;
                this.userReservation.spotId = res.spotId
            })
    }

}