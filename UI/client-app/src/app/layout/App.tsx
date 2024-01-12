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
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import React, { useEffect } from 'react';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/modalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';


function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() =>{
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content="Loading app..." />

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar></ToastContainer>
    <ModalContainer />
      <Route exact path='/' component={HomePage}/>
      <Route
        exact path={'/(.+)'}
        render={() => (
          <>
            <NavBar/>
             <Container style={{marginTop: '5em'}}> 
               <Switch>
                  {/* <Route path='/trips' exact component={TripDashboard}/> */}
                  
                  <Route path='/trips/:id' component={TripDetails}/>
                  <Route path='/trips'  component={TripDetails}/>
                  {/* <Route key={location.key} path={['/createtrip', '/manage/:id']} component={TripForm}/> */}
                  {/* <Route path='/profiles/:username' component={ProfilePage}/> */}
                  {/* <Route path='/errors' component={TestErrors}/> */}
                  {/* <Route path='/server-error' component={ServerError}/> */}
                  <Route path='/login' component={LoginForm}/>
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
