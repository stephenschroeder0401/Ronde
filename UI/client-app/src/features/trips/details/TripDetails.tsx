import { observer } from 'mobx-react-lite';
import React, {MutableRefObject, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Image, Rail, Ref, Sticky } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import TripSelection from './TripSelection';
import TripDetailedInfo from './TripDetailedInfo';
import TripDetailedSidebar from './TripDetailedSidebar';
import TripDetailedHeader from './TripDetailsHeader';
import TripSubmit from './TripSubmit';
import StatusDialog from './StatusDialog';

interface Props {
}

export default observer(function TripDetails (this: any, {} : Props) {



  const {tripStore} = useStore();
  const {selectedTrip: trip, loadTrip, loadingInitial} = tripStore;
  const {id} = useParams<{id: string}>();

  useEffect(() =>{
    //if(id)   
    loadTrip(1);
  }, [id, loadTrip])

  
  if(loadingInitial || !trip) return <LoadingComponent/>;

  return(
    <Grid>
      <Grid.Column width={16}>
        <TripDetailedHeader trip={trip}/>
        <TripSubmit trip={trip} />
        <TripDetailedInfo trip={trip} />
        <TripSelection  trip={trip} />
      </Grid.Column>
      <Grid.Column width={5}>
        <TripDetailedSidebar trip={trip}/>
      </Grid.Column> *
    </Grid>
  );
})
