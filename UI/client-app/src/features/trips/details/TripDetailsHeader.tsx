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
    filter: 'brightness(70%)'
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
    
    const images = ['..//assets/categoryImages/nosara2.jpg','..//assets/categoryImages/travel.jpg','..//assets/categoryImages/nosara1.jpg']

    function handleAttendance (requestStatus: number){
        
        switch (requestStatus) {
        case 0:
            setModalHeader("Cancel Request");
            setModalBody("This will notify the host that you would like to join this trip. "+
            "Payment will not be required until your request has been accepted. Would you like to proceed?");
            break;
        case 1: 
            setModalHeader("Request To Join Trip");
            setModalBody("This will notify the host that you would like to join this trip. "+
            "Payment will not be required until your request has been accepted. Would you like to proceed?");
            break;
        }

        setTripRequestStatus(requestStatus);
        setModalOpen(true);
    }

    function confirmAttendance (){
        console.log("confirm!");
        console.log(reservationStore.userReservation);
        reservationStore.userReservation.reservationStatusId = tripRequestStatus;
        createReservation(reservationStore.userReservation, selectedTrip!.id);
        setModalOpen(false);
    }


    return (
        <Segment.Group>
            <AttendanceModal body={modalBody} header={modalHeader} isOpen={modalOpen} confirm={() => confirmAttendance()} closeModal={()=> setModalOpen(false)}/>
            <Segment>
            
                {trip.userStatus == 2 &&
                    <Label size='large' style={{position: 'absolute', left: -18, top:-20}} ribbon color='blue' content='Congrats! You have been accepted. Proceed with your payment to confirm your spot!'/>}          
            
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={trip.title}
                                    style={{color: 'black'}}
                                />
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
                : trip.userStatus == 1? (
                    <Button loading={loading} color='red' onClick={() =>handleAttendance(0)}>Cancel Request</Button>
                ) 
                : trip.userStatus == 2 ? (
                    <>
                    <Button loading={loading} color='teal' onClick={() =>handleAttendance(0)}>Complete Payment</Button>
                    <Button loading={loading} color='red' onClick={() =>handleAttendance(0)}>Cancel Request</Button>
                    </>
                )
                : trip.userStatus == 4 ?(
                    <Button loading={loading} disabled={trip.isCancelled} onClick={() => console.log("request cancel")} color='red'>Request To Cancel</Button>
                )
                :   <Button loading={loading} color='teal' onClick={() =>handleAttendance(1)}>Requst To Join</Button>}
            </Segment>
        </Segment.Group>
    )
})
