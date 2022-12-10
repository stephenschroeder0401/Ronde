import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import {Segment, Grid, Icon, Header, Menu, Item, Label, Checkbox, Image} from 'semantic-ui-react'
import {Trip} from "../../../app/models/trip";
import {format} from "date-fns";
import { string } from 'yup/lib/locale';
import { style } from '@mui/system';
import moment from 'moment';
import { TripAttendee } from '../../../app/models/profile';



interface Props {
    trip: Trip
}


export default observer(function TripSelection({trip : {spots, host, stints, prices}} : Props) {

    const [selectedSpot, setSelectedSpot] = useState<string>();
    const [activeStints, setActiveStints] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0.00);

    useEffect(() => {

        console.log("EFFECT");
        console.log(selectedSpot);
        console.log(activeStints);
        
        let spotPrices = prices?.filter(p => String(p.spotId) === selectedSpot);

        console.log(spotPrices);

        let total = spotPrices!.reduce((totalPrice, spotPrice)  => {
            if(activeStints.includes(String(spotPrice.stintId)))
                return totalPrice + spotPrice.price;
            else
                return totalPrice;
            }
            , 0);

        console.log(total);    
        
        setTotalPrice(total);

    }, [selectedSpot, activeStints])
  

    return (
        <Segment.Group>
            <Segment>
                <Header style={{float: 'right', color: '#5A5A5A'}}
                    content={"TOTAL: $" + totalPrice}
                />
                <Menu.Header
                    size='large'
                    content="SELECT TRIP LEGS"
                    style={{color: '#5A5A5A'}}/>
                 <Menu>
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
            <Segment>
               <Menu.Header
                    size='large'
                    content="SELECT YOUR SPOT"
                    style={{color: '#5A5A5A'}}/>
                 <Menu vertical style={{width:'100%'}}>

                    {spots!.map(spot => {
                        return(
                        <Menu.Item onClick={() => {setSelectedSpot(String(spot.spotId))}}
                            active={selectedSpot == String(spot.spotId)}
                            name={String(spot.spotId)} style={{display: 'flex'}}>
                            <span style={{flexDirection: 'column'}}>
                            <Header size='large'>
                                TEST
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