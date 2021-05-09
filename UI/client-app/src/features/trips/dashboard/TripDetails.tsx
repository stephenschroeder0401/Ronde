import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Trip } from '../../../app/models/trip'

interface Props {
    trip: Trip;
    cancelSelectTrip: () => void;
    openForm: (id: number) => void;
}

export default function TripDetails ({trip, cancelSelectTrip, openForm} : Props) {

return(
  <Card>
    <Image src={`/assets/categoryImages/${trip.category}`} />
    <Card.Content>
      <Card.Header>{trip.title}</Card.Header>
      <Card.Meta>
        <span>{trip.startDate}</span>
      </Card.Meta>
      <Card.Description>
        {trip.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths='2'>
          <Button onClick={() => openForm(trip.id)} basic color='blue' content='Edit'/>
          <Button onClick={cancelSelectTrip} basic color='grey' content='Cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>
);
}
