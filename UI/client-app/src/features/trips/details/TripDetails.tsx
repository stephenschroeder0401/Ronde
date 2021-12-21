import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import TripDetailedChat from './TripDetailedChat';
import TripDetailedInfo from './TripDetailedInfo';
import TripDetailedSidebar from './TripDetailedSidebar';
import TripDetailedHeader from './TripDetailsHeader';

interface Props {
}

export default observer(function TripDetails ({} : Props) {

  const {tripStore} = useStore();
  const {selectedTrip: trip, loadTrip, loadingInitial} = tripStore;
  const {id} = useParams<{id: string}>();

  useEffect(() =>{
    if(id) loadTrip(+id);
  }, [id, loadTrip])
  
  if(loadingInitial || !trip) return <LoadingComponent/>;

  console.log(trip.attendees);
  return(
    <Grid>
      <Grid.Column width={10}>
        <TripDetailedHeader trip={trip}/>
        <TripDetailedInfo trip={trip} />
        <TripDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <TripDetailedSidebar trip={trip}/>
      </Grid.Column>
    </Grid>
  );
})
