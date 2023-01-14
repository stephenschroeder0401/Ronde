import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon, Header} from 'semantic-ui-react'
import {Trip} from "../../../app/models/trip";
import {format} from "date-fns";
import useScript from './useScript';

interface Props {
    trip: Trip
}

export default observer(function TripDetailedInfo({trip}: Props) {

    const tripDescription = trip.description
    return (
        <Segment.Group>
            <Segment attached>
                 <Grid verticalAlign='middle'>
                    <Grid.Column width={4}>
                    <Header
                      size='medium'
                      content="DEETS"
                      style={{color: 'grey'}}
                    /> 
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <span>{trip.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={16}>
                        <span>{tripDescription}</span>
                    </Grid.Column>
                </Grid>
            </Segment>  
        </Segment.Group>
    )
})