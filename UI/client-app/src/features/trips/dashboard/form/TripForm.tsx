import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {Button, Form, Segment} from 'semantic-ui-react';
import LoadingComponent from '../../../../app/layout/LoadingComponents';
import { Trip } from '../../../../app/models/trip';
import { useStore } from '../../../../app/stores/store';


export default observer(function TripForm(){

    const history = useHistory();
    const {tripStore} = useStore();
    const {selectedTrip, createTrip, updateTrip, loading, loadTrip} = tripStore;
    const {id}  = useParams<{id: string}>();

    const [trip, setTrip] = useState({
        id: 0,
        title: '',
        category: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        city: '',
        venue: ''
    });

    useEffect(() =>{
        if (id) loadTrip(+id).then(trip => setTrip(trip!));
    }, [id, loadTrip]);

    function handleSubmit(){
        trip.id > 0 ? updateTrip(trip).then(() => history.push(`/trips/${trip.id}`)) : createTrip(trip).then((tripId) => history.push(`/trips/${tripId?.data}`));
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setTrip({...trip, [name]: value})
    }

    if (loading) return <LoadingComponent content='Loading trip...'/>

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={trip.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder="Description" value={trip.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder="Category" value={trip.category} name='category' onChange={handleInputChange}/>
                <Form.Input type="date" placeholder="Date" value={trip.startDate} name='startDate' onChange={handleInputChange}/>
                <Form.Input placeholder="City" value={trip.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder="Venue" value={trip.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/trips' floated='right' positive type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
});