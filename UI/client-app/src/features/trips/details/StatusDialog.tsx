import React from 'react'
import { Message } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function StatusDialog () {

const {reservationStore} = useStore();
    
return(
<>
    {reservationStore.userReservation.reservationStatusId == 1 ?
    <Message color='olive'>
        <Message.Header>Reservation Request Received!</Message.Header>
            <p>
                Thanks for reservation request! Your host will be getting back to you shortly if your request is accepted. 
            </p>
    </Message> : 
    reservationStore.userReservation.reservationStatusId == 2 ?
    <Message color='green'>
        <Message.Header>Reservation Request Accepted!</Message.Header>
            <p>
                Congrats! Your request has been accepted. However, <b>Your spot is not confirmed until your payment has been complete</b> Complete your payment to lock in your reservation! 
            </p>
    </Message>
    : null
    
}
  </>)


})