import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Trip} from "../../../app/models/trip";
import {format} from "date-fns";
import { useStore } from '../../../app/stores/store';
import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";


const tripImageStyle = {
    filter: 'brightness(70%)'
};

interface Props {
    trip: Trip
}


export default observer (function TripDetailedHeader({trip}: Props) {
    const {tripStore: {updateAttendance, loading, cancelTripToggle} } = useStore();
    const [photosOpen, setPhotosOpen] = useState(false);
    const [photoIdx, setPhotoIdx] = useState(0);
    
    const images = ['..//assets/categoryImages/nosara2.jpg','..//assets/categoryImages/travel.jpg','..//assets/categoryImages/nosara1.jpg']

    return (
        <Segment.Group>
            <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={trip.title}
                                    style={{color: 'black'}}
                                />
                                {/* <p>
                                    Hosted by <strong><Link to={`/profiles/${trip.host?.username}`}>{trip.host?.displayName}</Link></strong>
                                </p> */}
                            </Item.Content>
                        </Item>
                        <Item>
                            <Item.Content>
                                <Header size='large' style={{color: 'grey'}} sub content={format(trip.startDate!, 'MMMM dd yyyy') + ' - ' + format(trip.endDate!, 'MMMM dd yyyy')}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
            </Segment>
            <Segment>
                <Image src={`..//assets/categoryImages/travel.jpg`} onClick={()=>setPhotosOpen(true)} fluid style={tripImageStyle}/>
                 {photosOpen && <Lightbox
                    mainSrc={images[photoIdx]}
                    nextSrc={images[(photoIdx + 1) % images.length]}
                    prevSrc={images[(photoIdx + images.length - 1) % images.length]}
                    onCloseRequest={()=>{setPhotosOpen(false)}}
                    onMovePrevRequest={() => setPhotoIdx((photoIdx - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIdx((photoIdx + 1) % images.length)}
                    />}

            </Segment>
            <Segment basic attached='top' style={{padding: '0'}}>
                {trip.isCancelled &&
                    <Label style={{position: 'absolute', zIndex:1000, left: -14, top:20}} ribbon color='red' content='Cancelled'/>
                }          
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
