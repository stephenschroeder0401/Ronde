import React, {useState, useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import TripDashboard from '../../features/trips/dashboard/TripsDashboard';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponents';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import TripForm from '../../features/trips/dashboard/form/TripForm';
import TripDetails from '../../features/trips/dashboard/TripDetails';

function App() {
  const location = useLocation();

return (
    <>
      <Route exact path='/' component={HomePage}/>
      <Route
        path={'/(.*)'}
        render={() => (
          <>
            <NavBar/>
             <Container style={{marginTop: '7em'}}>
               <Route path='/trips' exact component={TripDashboard}/>
               <Route path='/trips/:id' component={TripDetails}/>
               <Route key={location.key} path={['/createtrip', '/manage/:id']} component={TripForm}/>
             </Container>
          </>
        )}
      />
      </>
  );
}

export default observer(App);
