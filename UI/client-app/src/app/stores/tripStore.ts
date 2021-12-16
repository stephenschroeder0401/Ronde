import { action, makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import agent from "../api/agent";
import { Trip } from "../models/trip";
import {format} from "date-fns";


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


    createTrip = async (trip: Trip) =>{

        this.loading = true;
        
        try{
            let newId = await agent.Trips.create(trip);
            runInAction(()=>{
                this.tripRegistry.set(trip.id, trip);
                this.selectedTrip = trip;
                this.editMode = false
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

    updateTrip = async (trip: Trip) => {
        try{
            await agent.Trips.update(trip);
            runInAction(()=>{
                this.tripRegistry.set(trip.id, trip);
                this.selectedTrip = trip;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            });
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

}

