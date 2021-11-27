import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';

export default function HomePage(){
    return (
      <Segment inverted textAlign='center' vertical className='masthead'>
          <Container text>
            <Header as='h1' inverted>
                <Image size='massive' src='../assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Ronde
            </Header>
            <Header as='h2' content='Welcome to Ronde' inverted></Header>
            <Button as={Link} to='/trips' inverted>
                Take me to Trips
            </Button>
          </Container>
      </Segment>
    )
} 