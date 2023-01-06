import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button, Modal, Grid } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';


export default observer(function HomePage(){
  const {userStore, modalStore} = useStore();
    return (
      <Segment inverted textAlign='center' vertical className='masthead'>
        <Grid>
          <Grid.Column width={16}>
          <Container text>
            <Header as='h1' inverted>
                <Image size='massive' src='../assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Ronde
            </Header>
            {userStore.isLoggedIn ? (
              <>
                  <Header as='h2' content='Welcome to Ronde' inverted></Header>
                  <Button as={Link} to='/trips' inverted>
                    Go to trips
                  </Button>
              </>
            ) : ( 
              <>
                <Button onClick={() => modalStore.openModal(<LoginForm/>)} inverted>
                  Login
                 </Button>
                  <Button onClick={() => modalStore.openModal(<RegisterForm />)} inverted>
                  Register
                 </Button>
                 </>)}
          </Container>
          </Grid.Column>
          </Grid>
      </Segment>
    )
})