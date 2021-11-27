import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function TripFilters(){
    return( 
    <>
    <Menu vertical size='large' style={{width: '100%', marginTop: 26}}>
        <Header icon='filter' attached color='teal' content='filters'/>
        <Menu.Item content='All Activities'></Menu.Item>
        <Menu.Item content="I'm going"></Menu.Item>
        <Menu.Item content="I'm hosting"></Menu.Item>
    </Menu>
    <Header />
    <Calendar />
    </>
    )
}