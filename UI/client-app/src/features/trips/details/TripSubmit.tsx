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
import { Link, NavLink } from 'react-router-dom';
import AttendanceModal from '../../../app/common/modals/attendanceModal';



interface Props {
    trip: Trip
}


export default observer(function TripSubmit({trip} : Props) {

    const {tripStore: {selectedTrip, createReservation, loading, cancelTripToggle}, reservationStore, userStore } = useStore();
    const [activeStints, setActiveStints] = useState(reservationStore.userReservation.stintIds);
    const [modalBody, setModalBody] = useState('');
    const [modalHeader, setModalHeader] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [tripRequestStatus, setTripRequestStatus] = useState(0);
    const [userDateRange, setUserDateRange] = useState('select dates..');

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

        let minDate = moment('2100-01-01');
        let maxDate = moment('1900-01-01');
       
        trip.stints?.map(stint =>{
            if(activeStints.indexOf(stint.stintId.toString()) !== -1){
                if(moment(stint.startDate).isBefore(minDate))
                    minDate = moment(stint.startDate)
                        
                if(moment(stint.endDate).isAfter(maxDate))
                    maxDate = moment(stint.endDate)

            }
        })

        let formatDateRange = 'None selected..';
        
        if(activeStints.length > 0){
            if(activeStints.length == 2 && activeStints.indexOf('2') == -1){
                formatDateRange =  "01/20 - 01/23, 01/27 - 01/30"
            }
            else{
                formatDateRange =  minDate.format("MM/DD") + " - " + maxDate.format("MM/DD");
            }
        }
    
        setUserDateRange(formatDateRange);

    }, [activeStints])
  

    return (
        <Segment.Group style={{position:'sticky', top:'5px', zIndex: 100}}>
            <AttendanceModal body={modalBody} header={modalHeader} isOpen={modalOpen} confirm={() => confirmAttendance()} closeModal={()=> setModalOpen(false)}/>
            <Segment>
                <Grid >
                <Grid.Column width={16}>
                <Menu.Header
                    size='large'
                    content="SELECT TRIP LEGS"
                    style={{color: '#5A5A5A'}}/>
                 <Menu vertical style={{width:'100%'}}>
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
                </Grid>
            </Segment>
            <Segment clearing attached='bottom'>
                <Grid>
                <Grid.Column width={5} >
                {!userStore.user ? (
                <>
                <Button as={NavLink} to='/' positive content="Login/Register"></Button>   
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
                :   <Button disabled={reservationStore.userReservation.cost == 0} loading={loading} color='teal' onClick={() =>handleAttendance(1)}>Requst To Join</Button>}
                </Grid.Column>
                 <Grid.Column width={6}>
                    <div style={{display:'flex', flexDirection: 'column', marginLeft: '0.5rem'}}>
                    <Header size="medium" style={{float: 'left', color: '#5A5A5A', textAlign:'left', marginBottom:'0.2rem'}}
                            content={"Dates:"}
                    />
                    <span>
                        {userDateRange}
                    </span>
                    </div>
                     
                 </Grid.Column>
                 <Grid.Column width={5} >
                    <div style={{display:'flex', flexDirection: 'column', marginTop: '-0.1rem'}}>
                    <Header size="medium" style={{float: 'right', color: '#5A5A5A', textAlign:'left'}}
                            content={"Total: $" + reservationStore.userReservation.cost.toString() +".00"}
                    />
                    </div>
                 </Grid.Column>
                   
                </Grid>
            </Segment>
        </Segment.Group>
    )
})