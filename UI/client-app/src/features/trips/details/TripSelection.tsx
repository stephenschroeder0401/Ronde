import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import {Segment, Grid, Icon, Header, Menu, Item, Label, Checkbox, Image} from 'semantic-ui-react'
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

    const [selectedSpot, setSelectedSpot] = useState<string>();
    const {reservationStore} = useStore();


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
                        return(
                        <Menu.Item onClick={() => {setSelectedSpot(String(spot.id))}}
                            active={selectedSpot == String(spot.id)}
                            name={String(spot.id)} style={{display: 'flex'}}>
                            <span style={{flexDirection: 'column'}}>
                            <Header size='large'>
                                {spot.title}
                            </Header>
                            <Header size='small' style={{marginRight: 'auto'}}>
                                {spot.description}
                            </Header>
                            </span>
                            <Image style={{marginLeft: 'auto'}}size='medium' src="..//assets/categoryImages/nosara2.jpg"/>  
                        </Menu.Item>)
                        })}
                 </Menu>
            </Segment>
        </Segment.Group>
    )
})