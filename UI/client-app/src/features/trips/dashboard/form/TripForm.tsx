import React, { ChangeEvent, useState } from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';
import { Trip } from '../../../../app/models/trip';

interface Props{
    selectedTrip: Trip | undefined;
    closeForm: () => void;
    createOrEdit: (trip : Trip) => void;
    submitting: boolean;
}

export default function TripForm({selectedTrip, closeForm, createOrEdit, submitting} : Props){


    const initialState = selectedTrip ?? {
        id: 0,
        title: '',
        category: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        city: '',
        venue: ''
    }

    const [trip, setTrip] = useState(initialState);

    function handleSubmit(){
        trip.id = 1234;
        createOrEdit(trip);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setTrip({...trip, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={trip.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder="Description" value={trip.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder="Category" value={trip.category} name='category' onChange={handleInputChange}/>
                <Form.Input type="date" placeholder="Date" value={trip.startDate} name='startDate' onChange={handleInputChange}/>
                <Form.Input placeholder="City" value={trip.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder="Venue" value={trip.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' positive type='button' content='Cancel' onClick={closeForm}/>
            </Form>
        </Segment>
    )
}