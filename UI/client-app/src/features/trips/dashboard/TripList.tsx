import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import react from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, ItemExtra, Segment, Label} from 'semantic-ui-react';
import { Trip } from '../../../app/models/trip';
import { useStore } from '../../../app/stores/store';


export default observer(function TripList(){

    const {tripStore} = useStore();
    const {deleteTrip, tripsByDate, loading}  = tripStore;

    const [target, setTarget] = useState('');

    function handleTripDelete(e: SyntheticEvent<HTMLButtonElement>, id:number){
        setTarget(e.currentTarget.name);
        deleteTrip(id);
    }

    return (
       <Segment>
           <Item.Group divided>
               {tripsByDate.map( trip => (
                   <Item key={trip.id}>
                       <Item.Content>
                           <Item.Header as='a'> {trip.title} </Item.Header>
                           <Item.Meta>{trip.startDate}</Item.Meta>
                           <Item.Description>
                               <div>{trip.description}</div>
                               <div>{trip.category}</div>
                               <div>{trip.city}</div>
                               <div>{trip.venue}</div>
                           </Item.Description>
                           <ItemExtra>
                                <Button as={Link} to={`/trips/${trip.id}`}  floated='right' content="View" color="blue"/>
                                <Button onClick={(e) =>handleTripDelete(e, trip.id)} name={trip.id} loading={loading && parseInt(target) === trip.id} floated='right' content="Delete" color="red"/>
                                <Label basic content = {trip.category} />
                           </ItemExtra>
                       </Item.Content>
                   </Item>
                ))
                }
            </Item.Group>
       </Segment>
    )

})