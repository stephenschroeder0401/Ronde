import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Trip} from "../../../app/models/trip";
import {format} from "date-fns";
import { useStore } from '../../../app/stores/store';

const tripImageStyle = {
    filter: 'brightness(30%)'
};

const tripImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    trip: Trip
}

export default observer (function TripDetailedHeader({trip}: Props) {
    const {tripStore: {updateAttendance, loading, cancelTripToggle} } = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {trip.isCancelled &&
                    <Label style={{position: 'absolute', zIndex:1000, left: -14, top:20}} ribbon color='red' content='Cancelled'/>
                }
                <Image src={`..//assets/categoryImages/travel.jpg`} fluid style={tripImageStyle}/>
                <Segment style={tripImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={trip.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(trip.startDate!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${trip.host?.username}`}>{trip.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                
                {trip.isHost ? (
                <>
                <Button 
                    color={trip.isCancelled ? 'green' : 'red'} 
                    floated='left'
                    basic
                    content={trip.isCancelled ? 'Re-activate Trip' : 'Cancel Trip'}
                    onClick={cancelTripToggle}
                    loading={loading}   
                />    
                <Button as={Link} disabled={trip.isCancelled} to={`/manage/${trip.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
                </>) 
                : trip.isGoing ? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                )
                :(
                    <Button loading={loading} disabled={trip.isCancelled} onClick={updateAttendance} color='teal'>Request To Join Trip</Button>
                )}
            </Segment>
        </Segment.Group>
    )
})
