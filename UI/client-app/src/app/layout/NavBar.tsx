import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Menu, Image, DropdownItem, DropdownMenu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar(){
    const {userStore: {user, logout}} = useStore();
    
    return (
       <Menu inverted fixed='top' style={{height: "10px"}}>
            <Container>
               <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}></img>
                    Ronde
               </Menu.Item>              
               <Menu.Item position='right'>
                   <Image src={user?.image || '/assets/user.png'} avatar spaced='right'/>
                   <Dropdown pointing='top left' text={user?.displayName}>
                       <DropdownMenu>
                        <Dropdown.Item as={Link} to ={`/profiles/${user?.userName}`} text='My Profile' icon='user'/>
                        <Dropdown.Item onClick={logout} text='Log out' icon='power'/>
                        </DropdownMenu>
                   </Dropdown>
               </Menu.Item>
           </Container> 
       </Menu>
    )
});