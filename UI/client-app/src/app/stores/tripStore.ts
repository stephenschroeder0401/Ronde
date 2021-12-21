import { action, makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import agent from "../api/agent";
import { Trip, TripFormValues } from "../models/trip";
import {format} from "date-fns";
import { store } from "./store";
import UserStore from "./userStore";
import { Profile } from "../models/profile";
import { tokenToString } from "typescript";


export default class TripStore{
    title = 'Trips';
    
    tripRegistry = new Map<number, Trip>();
    selectedTrip: Trip | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get tripsByDate(){
        return Array.from(this.tripRegistry.values()).sort((a, b) => a.startDate!.valueOf() - b.startDate!.valueOf());
    }

    get groupedTrips(){
        return Object.entries(
            this.tripsByDate.reduce((trips, trip) =>{
                const date = format(trip.startDate!, 'dd MMM yyyy');
                trips[date] = trips[date] ? [...trips[date], trip] : [trip];
                return trips;
            }, {} as {[key: string]: Trip[]})
        )
    }

    loadTrips = async () => {
        this.setLoadingInitial(true);
        try{
            const trips = await agent.Trips.list();

            trips.forEach(trip =>{
                this.setTrip(trip);
            })
            this.setLoadingInitial(false);
        }
        catch{
            console.log(Error);
                this.setLoadingInitial(this.loadingInitial = false);
        }
    }

    private setTrip = (trip: Trip) =>{

        const user = store.userStore.user;

        console.log(user);

        if(user){
            trip.isGoing = trip.attendees!.some(
                a => a.username === user.userName
            )

            trip.isHost = trip.hostUsername === user.userName;
            trip.host = trip.attendees?.find(x => x.username === trip.hostUsername);
        }

        console.log(user?.userName);
        console.log(trip.hostUsername);

        trip.startDate = new Date(trip.startDate!);
        trip.endDate = new Date(trip.endDate!);
        this.tripRegistry.set(trip.id, trip);
    }

    loadTrip = async (id: number) => {
        let trip = this.getTrip(id);
        if(trip){
            this.selectedTrip = trip;
            return trip;
        }else{
            this.loadingInitial = true;
            try{
                trip = await agent.Trips.details(id);
                this.setTrip(trip);
                runInAction(() =>{
                    this.selectedTrip = trip;
                });

                this.setLoadingInitial(false);
                return trip;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getTrip = (id: number) => {
        return this.tripRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }


    createTrip = async (trip: TripFormValues) =>{
        
        const user = store.userStore.user;
        const attendee = new Profile(user!);

        try{
            let newId = await agent.Trips.create(trip);
            const newTrip = new Trip(trip);
            newTrip.hostUsername = user?.userName;
            newTrip.attendees = [attendee];
            this.setTrip(newTrip);
            runInAction(()=>{
                this.selectedTrip = newTrip;
            });
            return newId;
        }
        catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            });
        }
    }

    updateTrip = async (trip: TripFormValues) => {
        try{
            await agent.Trips.update(trip);
            runInAction(()=>{
                if(trip.id){
                    let updatedTrip = {...this.getTrip(trip.id), ...trip}
                    this.tripRegistry.set(trip.id, updatedTrip as Trip);
                    this.selectedTrip = updatedTrip as Trip;
                }
            })
        }
        catch(error){
            console.log(error);
        }
    }
    
    deleteTrip = async (id: number) => {
        this.loading = true;
        try{
            await agent.Trips.delete(id);
            runInAction(()=>{
                this.tripRegistry.delete(id);
                console.log(this.selectedTrip?.id);
                this.loading = false;
            });
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            });
        }
    }

    updateAttendance = async () =>{
        const user = store.userStore.user;
        this.loading = true;
        try{
            await agent.Trips.attend(this.selectedTrip!.id);
            runInAction(() =>{
                if(this.selectedTrip?.isGoing){
                    this.selectedTrip.attendees = this.selectedTrip.attendees?.filter(a => a.username !== user?.userName);
                    this.selectedTrip.isGoing = false;
                }
                else{
                    const attendee = new Profile(user!);
                    this.selectedTrip?.attendees?.push(attendee);
                    this.selectedTrip!.isGoing = true;
                }

                this.tripRegistry.set(this.selectedTrip!.id, this.selectedTrip!);
            })
        }catch(error){
            console.log(error);
        }
        finally{
            runInAction(() => this.loading = false);
        }
    }

    cancelTripToggle = async () =>{
        this.loading = true;
        try{
            await agent.Trips.attend(this.selectedTrip!.id);
            runInAction(() =>{
                this.selectedTrip!.isCancelled = !this.selectedTrip?.isCancelled;
                this.tripRegistry.set(this.selectedTrip!.id, this.selectedTrip!);
            });
        }
        catch(error){
            console.log(error);
        }
        finally{
            runInAction(() => this.loading = false);
        }
    }

}

