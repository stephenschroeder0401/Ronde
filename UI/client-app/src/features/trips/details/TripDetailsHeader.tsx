import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Trip} from "../../../app/models/trip";
import AttendanceModal from "../../../app/common/modals/attendanceModal";
import {format} from "date-fns";
import { useStore } from '../../../app/stores/store';
import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";
import TripStore from '../../../app/stores/tripStore';
import { createReadStream } from 'fs';


const tripImageStyle = {
    filter: 'brightness(70%)',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
};

interface Props {
    trip: Trip
}


export default observer (function TripDetailedHeader({trip}: Props) {
    const {tripStore: {selectedTrip, createReservation, loading, cancelTripToggle}, reservationStore } = useStore();
    const [photosOpen, setPhotosOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalBody, setModalBody] = useState('');
    const [modalHeader, setModalHeader] = useState('');
    const [photoIdx, setPhotoIdx] = useState(0);
    const [tripRequestStatus, setTripRequestStatus] = useState(0);
    
    const images = ['..//assets/TahoeTrip/FullArea.jpg',
    '..//assets/TahoeTrip/FullArea.jpg',
    '..//assets/TahoeTrip/FullArea2.jpg',
    '..//assets/TahoeTrip/Kitchen.jpg',
    '..//assets/TahoeTrip/Kitchen2.jpg',
    '..//assets/TahoeTrip/Kitchen3.jpg',
    '..//assets/TahoeTrip/LivingRoom.jpg',
    '..//assets/TahoeTrip/Single.jpg',
    '..//assets/TahoeTrip/King.jpg',
    '..//assets/TahoeTrip/Bunks.jpg']

    return (
        <Segment.Group>
            <Segment>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={trip.title}
                                    style={{color: 'black', marginBottom:'1px'}}
                                />
                                <Header size='large' style={{color: 'grey', marginTop:'0.3em'}} sub content={format(trip.startDate!, 'MMMM dd yyyy') + ' - ' + format(trip.endDate!, 'MMMM dd yyyy')}/>
                            </Item.Content>
                      
            </Segment>
            <Segment>
                <Image size='huge' src={`..//assets/TahoeTrip/FullArea.jpg`} onClick={()=>setPhotosOpen(true)} fluid style={tripImageStyle}/>
                 {photosOpen && <Lightbox
                    mainSrc={images[photoIdx]}
                    nextSrc={images[(photoIdx + 1) % images.length]}
                    prevSrc={images[(photoIdx + images.length - 1) % images.length]}
                    onCloseRequest={()=>{setPhotosOpen(false)}}
                    onMovePrevRequest={() => setPhotoIdx((photoIdx - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIdx((photoIdx + 1) % images.length)}
                    />}

            </Segment>
            
        </Segment.Group>
    )
})
