import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';

interface Props {
}

export default observer(function TripDetails ({} : Props) {

  const {tripStore} = useStore();
  const {selectedTrip: trip, loadTrip, loadingInitial} = tripStore;
  const {id} = useParams<{id: string}>();

  useEffect(() =>{
    if(id) loadTrip(+id);
  }, [id, loadTrip])
  
  if(loadingInitial || !trip) return <LoadingComponent/>;

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
            <Button as={Link} to={`/manage/${trip.id}`}  basic color='blue' content='Edit'/>
            <Button as={Link} to='/trips'  basic color='grey' content='Cancel'/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
})
