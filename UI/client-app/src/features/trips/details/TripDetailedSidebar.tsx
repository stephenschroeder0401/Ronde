import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Trip } from '../../../app/models/trip'

interface Props{
    trip: Trip;
}

export default observer(function ActivityDetailedSidebar ({trip : {attendees, host}} : Props) {
    
    if(!attendees)  return null;

    console.log("ATTENDEES");
    console.log(attendees);


    let confirmed = attendees.filter(a => a.status == 4);
    let interested = attendees.filter(a => (a.status == 1 || a.status == 2 || a.status == 3))

    return (

        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                floated='right'
                secondary
                inverted
                color='teal'
            >
                <h3>HOST</h3>
            </Segment>
            <Segment attached floated='right'>
                <List relaxed divided>
                <Item style={{ position: 'relative' }} key={host?.username}>
                <Image size='tiny' src={host?.image || '/assets/user.png'} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header as='h3'>
                        <Link to={`/profiles/${host?.username}`}><span>{host?.displayName}</span></Link>
                    </Item.Header>
                </Item.Content> 
                </Item>
                </List>           
            </Segment>
        
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                floated='right'
                secondary
                inverted
                color='teal'
            >
                <h3>{confirmed!.length} {confirmed!.length == 1 ? 'PERSON' : 'PEPLE'} CONFIRMED</h3>
            </Segment>
            <Segment attached floated='right'>
                <List relaxed divided>
                    {confirmed!.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username}>
                        <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`/profiles/${attendee.username}`}><span>{attendee.displayName}</span></Link>
                            </Item.Header>
                            {attendee.following &&
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                        </Item.Content>
                        </Item>
                    ))}               

               
                </List>
            </Segment>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                floated='right'
                secondary
                inverted
                color='teal'
            >
                <h3>{interested!.length} {interested!.length == 1 ? 'PERSON' : 'PEOPLE'} INTERESTED</h3>
            </Segment>
            <Segment attached floated='right'>
                <List relaxed divided>
                    {interested!.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username}>
                        <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`/profiles/${attendee.username}`}><span>{attendee.displayName}</span></Link>
                            </Item.Header>
                            {attendee.following &&
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                        </Item.Content>
                        </Item>
                    ))}               

               
                </List>
            </Segment>
        </>

    )
})