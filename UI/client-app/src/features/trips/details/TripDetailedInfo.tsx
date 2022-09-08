import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Trip} from "../../../app/models/trip";
import {format} from "date-fns";

interface Props {
    trip: Trip
}

export default observer(function TripDetailedInfo({trip}: Props) {

    const tripDescription = `Surf trip to ${trip.city}! There are limited spots. We are going to be working, and surfng, and exploring nightlife on weekend nights.`
    return (
        <Segment.Group> 
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{trip.venue}, {trip.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={11}>
                        <span>{tripDescription}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})