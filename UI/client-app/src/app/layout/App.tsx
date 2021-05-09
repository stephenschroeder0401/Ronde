import React, {useState, useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import { Trip } from '../models/trip';
import NavBar from './NavBar';
import TripDashboard from '../../features/trips/dashboard/TripsDashboard';
import agent from '../api/agent';
import { updateFunctionTypeNode } from 'typescript';

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const[submitting, setSubmitting] = useState(false);

  useEffect(() =>{
    agent.Trips.list().then( response => {
    setTrips(response);
    setLoading(false);
  })
},[]);

function handleSeletedTrip(id: number){
  setSelectedTrip(trips.find(x => x.id === id));
}

function handleCancelSelectTrip(){
  setSelectedTrip(undefined);
}

function handleFormOpen(id?: number){
  id ? handleSeletedTrip(id) : handleCancelSelectTrip();
  setEditMode(true);
}

function handleFormClose() {
  setEditMode(false);
}

function handleCreateOrEditTrip(trip: Trip){
  setSubmitting(true);
  if(trip.id){
    agent.Trips.update(trip).then(() =>{
      setTrips([...trips.filter(x => x.id !== trip.id), trip])
      setSelectedTrip(trip);
      setEditMode(false);
      setSubmitting(false);
    })}else {
      trip.id = 0
      agent.Trips.create(trip);
      setTrips([...trips, trip]);
      setEditMode(false);
      setSubmitting(false);
    }
}

function handleDeleteTrip(id: number){
  setTrips([...trips.filter(x => x.id !== id)]);
}


return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <TripDashboard 
          trips={trips}
          selectedTrip={selectedTrip}
          selectTrip={handleSeletedTrip}
          cancelSelectTrip={handleCancelSelectTrip}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditTrip}
          deleteTrip={handleDeleteTrip}
          submitting={submitting}/>
      </Container>
    </>
  );
}

export default App;
