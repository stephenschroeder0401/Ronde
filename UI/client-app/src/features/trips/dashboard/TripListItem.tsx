import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Trip } from '../../../app/models/trip';
import { format } from "date-fns";

interface Props{
    trip: Trip
}

export default function TripListItem({trip}: Props){


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                    <Item.Image size ='tiny' circular src='../assets/user.png'/>
                    <Item.Content>
                        <Item.Header as={Link} to={`/trips/${trip.id}`}>
                            {trip.title}
                        </Item.Header>
                        <Item.Description>Hosted by Steve</Item.Description>
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
                Attendees go here
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