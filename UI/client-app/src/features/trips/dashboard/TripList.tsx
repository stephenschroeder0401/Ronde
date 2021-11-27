import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import react from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, ItemExtra, Segment, Label, Header} from 'semantic-ui-react';
import { Trip } from '../../../app/models/trip';
import { useStore } from '../../../app/stores/store';
import TripListItem from './TripListItem';


export default observer(function TripList(){

    const {tripStore} = useStore();
    const {groupedTrips}  = tripStore;

    return (
        <>
            {groupedTrips.map(([group, trips]) =>(
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>                   
                            {trips.map( (trip) => (
                            <TripListItem key={trip.id} trip={trip}/>
                        ))}                   
                </Fragment>
            ))}
        </>
    )

})