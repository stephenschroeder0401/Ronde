import React from 'react';
import { Grid} from 'semantic-ui-react';
import { Trip } from '../../../app/models/trip';
import TripForm from './form/TripForm';
import TripDetails from './TripDetails';
import TripList from './TripList';


interface Props {
    trips: Trip[];
    selectedTrip: Trip | undefined;
    selectTrip: (id: number) => void;
    cancelSelectTrip: () => void;
    editMode: boolean;
    openForm: (id: number) => void;
    closeForm: () => void;
    createOrEdit: (trip: Trip) => void;
    deleteTrip: (id: number) => void;
    submitting: boolean;
}

export default function TripDashboard({trips, selectedTrip, editMode, openForm, closeForm,
    selectTrip, cancelSelectTrip, createOrEdit, submitting, deleteTrip}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
               <TripList trips={trips} selectTrip={selectTrip} deleteTrip={deleteTrip}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTrip && !editMode &&
               <TripDetails trip = {selectedTrip} cancelSelectTrip={cancelSelectTrip} openForm={openForm}/>}
               {editMode &&
               <TripForm selectedTrip={selectedTrip} closeForm={closeForm} createOrEdit={createOrEdit} submitting={submitting}></TripForm>}
            </Grid.Column>
        </Grid>
    )
}