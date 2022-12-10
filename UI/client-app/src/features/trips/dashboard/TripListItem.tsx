import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Trip } from '../../../app/models/trip';
import { format } from "date-fns";
import TripListItemAttendee from './TripListItemAttendee';

interface Props{
    trip: Trip
}

export default function TripListItem({trip}: Props){

    return (
        <Segment.Group>
            <Segment>
                {trip.isCancelled && 
                    <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}}/>
                }
                <Item.Group>
                    <Item>
                    <Item.Image size ='tiny' circular src={trip.host?.image || '../assets/user.png'}/>
                    <Item.Content>
                        <Item.Header as={Link} to={`/trips/${trip.id}`}>
                            {trip.title}
                        </Item.Header>
                        <Item.Description>Hosted by <Link to={`/profiles/${trip.host?.username}`}>{trip.host?.displayName}</Link></Item.Description>
                        {trip.isHost && (
                            <Item.Description>
                                <Label basic color = 'orange'>
                                    You are hosting this trip
                                </Label>
                            </Item.Description>
                        )}
                        {trip.userStatus == 4 && (
                            <Item.Description>
                                <Label basic color = 'green'>
                                    You are going to this trip
                                </Label>
                            </Item.Description>
                        )}
                    </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/>{format(trip.startDate!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker'/>{trip.venue}
                </span>
            </Segment>
            <Segment secondary>
                <TripListItemAttendee attendees={trip.attendees}></TripListItemAttendee>
            </Segment>
            <Segment clearing>
                <span>{trip.description}</span>
                <Button
                    as={Link}
                    to={`/trips/${trip.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}