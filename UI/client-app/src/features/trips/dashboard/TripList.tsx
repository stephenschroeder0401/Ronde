import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import TripListItem from './TripListItem';


export default observer(function TripList(){

    const {tripStore} = useStore();
    const {groupedTrips}  = tripStore;

    return (
        <>
            {groupedTrips.map(([group, trips]) =>(
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>                   
                            {trips.map( (trip) => (
                            <TripListItem key={trip.id} trip={trip}/>
                        ))}                   
                </Fragment>
            ))}
        </>
    )

})