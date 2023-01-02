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
    const [activeStints, setActiveStints] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0.00);
    const {reservationStore} = useStore();


    useEffect(() => {
        
        let spotPrices = prices?.filter(p => String(p.spotId) === selectedSpot);

        console.log(spotPrices);
        console.log(selectedSpot);

        let total = spotPrices!.reduce((totalPrice, spotPrice)  => {
            if(activeStints.includes(String(spotPrice.stintId)))
                return totalPrice + spotPrice.amount;
            else
                return totalPrice;
            }
            , 0);

        setTotalPrice(total);
        reservationStore.userReservation.cost = total;
        reservationStore.userReservation.stintIds = activeStints;
        reservationStore.userReservation.spotId = selectedSpot;


    }, [selectedSpot, activeStints])
  

    return (
        <Segment.Group style={{position:'sticky', top:'8%'}}>
            <Segment >
                <Header style={{float: 'right', color: '#5A5A5A'}}
                    content={"TOTAL: $" + totalPrice}
                />
                <Menu.Header
                    size='large'
                    content="SELECT TRIP LEGS"
                    style={{color: '#5A5A5A'}}/>
                 <Menu vertical>
                    {
                    stints!.map(stint => {
                    let formatDateRange =  moment(stint.startDate).format("MM/DD") + " - " + 
                                            moment(stint.endDate).format("MM/DD");
                    
                    let days = moment(stint.endDate).diff(moment(stint.startDate), 'days');

                    return(
                        <Menu.Item name={String(stint.stintId)}  
                            active={activeStints.includes(String(stint.stintId))}
                            onClick={() => 
                                {activeStints.includes(String(stint.stintId)) ? 
                                setActiveStints(activeStints.filter(s => s != String(stint.stintId))) 
                                : setActiveStints([...activeStints, String(stint.stintId)])}}>
                            <Header as='h4'>{formatDateRange}<Label color={activeStints?.includes(String(stint.stintId)) ? "teal" : "grey"} size='medium' content= {days + " nights"}></Label></Header>
                        </Menu.Item>)})}
                    </Menu>
            </Segment>
        </Segment.Group>
    )
})