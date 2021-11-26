import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import TripList from './TripList';

export default observer (function TripDashboard(){

    const {tripStore} = useStore();
    const {loadTrips, tripRegistry} = tripStore;

    useEffect(() =>{
      if(tripRegistry.size <= 1) loadTrips();
  },[tripRegistry.size]);
  
  
  if(tripStore.loadingInitial) return <LoadingComponent inverted={true} content='Loading app'/>
    
    const {selectedTrip, editMode} = tripStore;

    return(
        <Grid>
            <Grid.Column width='10'>
               <TripList/>
            </Grid.Column>
            <Grid.Column width='6'>
               <h2>Trip filters</h2>
            </Grid.Column>
        </Grid>
    )
})