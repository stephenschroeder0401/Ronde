import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar(){

    return (
       <Menu inverted fixed='top'>
           <Container>
               <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}></img>
                    Ronde
               </Menu.Item>
               <Menu.Item as={NavLink} to='/trips' name="Trips"/>
               <Menu.Item as={NavLink} to='/errors' name="Errors"/>
               <Menu.Item>
                   <Button as={NavLink} to='/createTrip' positive content="Create Trip"></Button>
               </Menu.Item>
           </Container>
       </Menu>
    )
}