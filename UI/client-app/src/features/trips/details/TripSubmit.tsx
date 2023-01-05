import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import {Segment, Grid, Icon, Header, Menu, Item, Label, Checkbox, Image, Button} from 'semantic-ui-react'
import {Reservation, Trip} from "../../../app/models/trip";
import {format} from "date-fns";
import { string } from 'yup/lib/locale';
import { style } from '@mui/system';
import moment from 'moment';
import { TripAttendee } from '../../../app/models/profile';
import { useStore } from '../../../app/stores/store';
import { runInAction } from 'mobx';
import { Link } from 'react-router-dom';
import AttendanceModal from '../../../app/common/modals/attendanceModal';



interface Props {
    trip: Trip
}


export default observer(function TripSubmit({trip} : Props) {

    const {tripStore: {selectedTrip, createReservation, loading, cancelTripToggle}, reservationStore } = useStore();
    const [activeStints, setActiveStints] = useState(reservationStore.userReservation.stintIds);
    const [modalBody, setModalBody] = useState('');
    const [modalHeader, setModalHeader] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [tripRequestStatus, setTripRequestStatus] = useState(0);

    console.log("RES");
    console.log(reservationStore.userReservation);
    console.log(activeStints);

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
        case 2:
            setModalHeader("Complete Payment");
            setModalBody("Your request has been accepted! "+
            `Please complete your payment of $${reservationStore.userReservation.cost}.00 via Venmo to your host, Stephen Schroeder. Username: @Stephen-Schroeder-3. Last 4 digits of phone number: 9113`);
        }

        setTripRequestStatus(requestStatus);
        setModalOpen(true);
    }

     function confirmAttendance (){
        reservationStore.userReservation.reservationStatusId = tripRequestStatus;
        if (tripRequestStatus != 2)
            createReservation(reservationStore.userReservation, selectedTrip!.id);
        setModalOpen(false);
    } 



    useEffect(() => {

        const res = {...reservationStore.userReservation};
        
        let spotPrices = trip.prices?.filter(p => String(p.spotId) === res.spotId);
        res.stintIds = activeStints;

        let total = spotPrices!.reduce((totalPrice, spotPrice)  => {
            if(activeStints.includes(String(spotPrice.stintId)))
                return totalPrice + spotPrice.amount;
            else
                return totalPrice;
            }
            , 0);

        res.cost = total;
        
        reservationStore.setReservation(res);
        console.log(reservationStore.userReservation)

    }, [activeStints])
  

    return (
        <Segment.Group style={{position:'sticky', top:'8%'}}>
            <AttendanceModal body={modalBody} header={modalHeader} isOpen={modalOpen} confirm={() => confirmAttendance()} closeModal={()=> setModalOpen(false)}/>
            <Segment>
                <Grid >
                <Grid.Column width={10}>
                <Menu.Header
                    size='large'
                    content="SELECT TRIP LEGS"
                    style={{color: '#5A5A5A'}}/>
                 <Menu vertical style={{width:"14rem"}}>
                    {
                    trip.stints!.map(stint => {
                    let formatDateRange =  moment(stint.startDate).format("MM/DD") + " - " + 
                                            moment(stint.endDate).format("MM/DD");
                    
                    let days = moment(stint.endDate).diff(moment(stint.startDate), 'days');

                    return(
                        <Menu.Item disabled={reservationStore.userReservation.reservationStatusId > 0} name={String(stint.stintId)}  
                            active={reservationStore.userReservation.stintIds.includes(String(stint.stintId))}
                            onClick={() => 
                                {activeStints.includes(String(stint.stintId)) ? 
                                setActiveStints(activeStints.filter(s => s != String(stint.stintId))) 
                                : setActiveStints([...activeStints, String(stint.stintId)])}}>
                            <b>{formatDateRange}</b><Label color={activeStints?.includes(String(stint.stintId)) ? "teal" : "grey"} size='medium' content= {days + " nights"}></Label>
                        </Menu.Item>)})}
                    </Menu>
                    </Grid.Column>
                    <Grid.Column width={6}>
                   
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment clearing attached='bottom'>
                <Grid>
                <Grid.Column width={8}>
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
                : reservationStore.userReservation.reservationStatusId == 1? (
                    <Button loading={loading} color='red' onClick={() =>handleAttendance(0)}>Cancel Request</Button>
                ) 
                : reservationStore.userReservation.reservationStatusId == 2 ? (
                    <>
                    <Button loading={loading} color='blue' onClick={() =>handleAttendance(2)}>Complete Payment</Button>
                    </>
                )
                : reservationStore.userReservation.reservationStatusId == 4 ?(
                    <Button loading={loading} disabled={trip.isCancelled} onClick={() => console.log("request cancel")} color='red'>Request To Cancel</Button>
                )
                :   <Button loading={loading} color='teal' onClick={() =>handleAttendance(1)}>Requst To Join</Button>}
                </Grid.Column>
                <Grid.Column width={8} style={{display:'flex', justifyContent: 'center'}}>
                <Header size="large" style={{float: 'right', color: '#5A5A5A', textAlign:'center'}}
                            content={"TOTAL: $" + reservationStore.userReservation.cost.toString()}
                />
                </Grid.Column>
                
                </Grid>
            </Segment>
        </Segment.Group>
    )
})