import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import {Segment, Grid, Icon, Header, Menu, Item, Label, Checkbox, Image, GridColumn} from 'semantic-ui-react'
import {Reservation, Trip} from "../../../app/models/trip";
import {format} from "date-fns";
import { string } from 'yup/lib/locale';
import { style } from '@mui/system';
import moment from 'moment';
import { TripAttendee } from '../../../app/models/profile';
import { useStore } from '../../../app/stores/store';



interface Props {
    trip: Trip
}


export default observer(function TripSelection({trip : {spots, host, stints, prices}} : Props) {

    const {reservationStore, tripStore} = useStore();
    const [selectedSpot, setSelectedSpot] = useState(reservationStore.userReservation.spotId);

    const getConfirmedGuests = (spotId : string) =>{
        let currStints = reservationStore.userReservation.stintIds;
        let confirmed = tripStore.selectedTrip?.reservations?.filter(r => r.reservationStatusId == 4 && r.spotId == spotId && currStints.filter(cr => r.stintIds.includes(cr)).length > 0);


        let res = {...reservationStore.userReservation};

        if(confirmed && confirmed?.length > 0){
            confirmed.map(c => {
                if (c.spotId == res.spotId){
                    res.spotId = '0';
                    res.cost = 0;
                    reservationStore.setReservation(res);
                }})
            
            return confirmed?.map(c => c.fullName);
        }
        
        else return undefined;
        }


    useEffect(() => {
        
        const res = {...reservationStore.userReservation};
        res.spotId = selectedSpot;

        let spotPrices = prices?.filter(p => String(p.spotId) === selectedSpot);
        let activeStints = res.stintIds;

        let total = spotPrices!.reduce((totalPrice, spotPrice)  => {
            if(activeStints.includes(String(spotPrice.stintId)))
                return totalPrice + spotPrice.amount;
            else
                return totalPrice;
            }
            , 0);

        res.cost = total;

        reservationStore.setReservation(res);
        console.log(reservationStore.userReservation);

    }, [selectedSpot])
  

    return (
        <Segment.Group>
            <Segment>
               <Menu.Header
                    size='large'
                    content="SELECT YOUR SPOT"
                    style={{color: '#5A5A5A'}}/>
                 <Menu vertical style={{width:'100%'}}>
                    {spots!.map(spot => {
                        const confirmedGuests = getConfirmedGuests(String(spot.id));
                        return(
                        <Menu.Item disabled={reservationStore.userReservation.reservationStatusId > 0 || confirmedGuests != undefined} onClick={() => {setSelectedSpot(String(spot.id))}}
                            active={selectedSpot == String(spot.id)}
                            name={String(spot.id)}>
                            <Grid>
                            <Grid.Column width={10}>
                            <span style={{marginBottom:'0.2em'}}>
                                <h3>{spot.title}</h3>
                            </span>
                            <span style={{marginBottom:'0.2em'}}>
                                {spot.description}
                            </span>
                            {confirmedGuests != undefined ?
                            (
                                <>
                                <Header size='tiny' style={{marginTop:'0.7em', marginBottom:'0.2em'}}>Reserved:</Header>
                                {confirmedGuests.map(g => {
                                    return(
                                    <Label size="tiny" color='blue' style={{marginBottom:'0.2em'}}>
                                        {g}
                                    </Label>);
                                })
                                }
                                </>
                                ) : <></>
                            }
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Image style={{marginTop:'0.5em'}}  size='small' src={spot.img}/>
                            </Grid.Column>
                            </Grid> 
                        </Menu.Item>)
                        })}
                 </Menu>
            </Segment>
        </Segment.Group>
    )
})