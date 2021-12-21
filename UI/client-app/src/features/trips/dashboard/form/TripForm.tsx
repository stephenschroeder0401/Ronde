import { Formik, Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {Button, FormField, Header, Label, Segment} from 'semantic-ui-react';
import LoadingComponent from '../../../../app/layout/LoadingComponents';
import { Trip, TripFormValues } from '../../../../app/models/trip';
import { useStore } from '../../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../../app/common/form/MyTextInput';
import MyTextArea from '../../../../app/common/form/MyTextArea';
import MySelectInput from '../../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../../app/common/options/categoryOptions';
import MyDateInput from '../../../../app/common/form/MyDateInput';


export default observer(function TripForm(){

    const history = useHistory();
    const {tripStore} = useStore();
    const {selectedTrip, createTrip, updateTrip, loading, loadTrip} = tripStore;
    const {id}  = useParams<{id: string}>();

    const [trip, setTrip] = useState<TripFormValues>(new TripFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        startDate: Yup.string().required(),
        endDate: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    });

    useEffect(() =>{
        if (id) loadTrip(+id).then(trip => setTrip(new TripFormValues(trip)));
    }, [id, loadTrip]);

    function handleFormSubmit(trip: TripFormValues){
        trip.id != undefined && trip.id > 0 ? 
        updateTrip(trip).then(() => history.push(`/trips/${trip.id}`)) 
        : createTrip(trip).then((tripId) => history.push(`/trips/${tripId}`));
    }


    if (loading) return <LoadingComponent content='Loading trip...'/>

    return(
        <Segment clearing>
            <Header content='Trip Details' sub color='teal'/>
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={trip} onSubmit={(values) => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder="Title"  name='title'/>
                        <MyTextArea rows={3} placeholder="Description" name='description'/>
                        <MySelectInput options={categoryOptions} placeholder="Category" name='category'/>
                        <MyDateInput
                            placeholderText='Date' 
                            name='startDate'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy'
                        />
                         <MyDateInput
                            placeholderText='Date' 
                            name='endDate'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy'
                        />
                        <Header content='Location Details' sub color='teal'/>
                        <MyTextInput placeholder="City" name='city'/>
                        <MyTextInput placeholder="Venue"  name='venue' />
                        <Button disabled={ isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/trips' floated='right' positive type='button' content='Cancel'/>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
});