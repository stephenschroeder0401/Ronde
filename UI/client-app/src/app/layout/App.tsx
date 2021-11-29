import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import TripDashboard from '../../features/trips/dashboard/TripsDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import TripForm from '../../features/trips/dashboard/form/TripForm';
import TripDetails from '../../features/trips/details/TripDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/notFound';
import ServerError from '../../features/errors/ServerError';

function App() {
  const location = useLocation();

return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar></ToastContainer>
      <Route exact path='/' component={HomePage}/>
      <Route
        exact path={'/(.+)'}
        render={() => (
          <>
            <NavBar/>
             <Container style={{marginTop: '7em'}}>
               <Switch>
                  <Route path='/trips' exact component={TripDashboard}/>
                  <Route path='/trips/:id' component={TripDetails}/>
                  <Route key={location.key} path={['/createtrip', '/manage/:id']} component={TripForm}/>
                  <Route path='/errors' component={TestErrors}/>
                  <Route path='/server-error' component={ServerError}/>
                  <Route component={NotFound}></Route>
               </Switch>
             </Container>
          </>
        )}
      />
      </>
  );
}

export default observer(App);
