import React from 'react';
import react from 'react';
import { Button, Item, ItemExtra, Segment, Label} from 'semantic-ui-react';
import { Trip } from '../../../app/models/trip';


interface Props{
    trips: Trip[];
    selectTrip: (id: number) => void;
    deleteTrip: (id: number) => void;
    }

export default function TripList({trips, selectTrip, deleteTrip}: Props){
    return (
       <Segment>
           <Item.Group divided>
               {trips.map( trip => (
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
                                <Button onClick={() => selectTrip(trip.id)} floated='right' content="View" color="blue"/>
                                <Button onClick={() => deleteTrip(trip.id)} floated='right' content="Delete" color="red"/>
                                <Label basic content = {trip.category} />
                           </ItemExtra>
                       </Item.Content>
                   </Item>
                ))
                }
            </Item.Group>
       </Segment>
    )

}