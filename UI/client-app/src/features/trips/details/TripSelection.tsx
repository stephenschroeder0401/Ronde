import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import {Segment, Grid, Icon, Header, Menu, Item, Label, Checkbox, Image} from 'semantic-ui-react'
import {Trip} from "../../../app/models/trip";
import {format} from "date-fns";
import { string } from 'yup/lib/locale';
import { style } from '@mui/system';



interface Props {
    trip: Trip
}


export default observer(function TripSelection({trip : {spots, host, stints}} : Props) {

    const [activeItems, setActiveItem] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0.00);

    console.log(spots);

    return (
        <Segment.Group>
            <Segment>
                <Header style={{float: 'right', color: '#5A5A5A'}}
                    content={"TOTAL: $" + totalPrice}
                />
                <Menu.Header
                    size='large'
                    content="SELECT TRIP LEGS"
                    style={{color: '#5A5A5A'}}/>
                 <Menu>
                    <Menu.Item name='leg1'  
                        active={activeItems.includes('leg1')}
                        onClick={() => {activeItems.includes('leg1') ? 
                            setActiveItem(activeItems.filter(s => s != 'leg1')) 
                            : setActiveItem([...activeItems,'leg1'])}}>
                        <Header as='h4'>01/20 - 01/23  <Label color={activeItems.includes('leg1') ? "teal" : "grey"} size='medium' content="3 nights"></Label></Header>
                    </Menu.Item>
                     <Menu.Item name='leg2'  
                        active={activeItems.includes('leg2')}
                        onClick={() => {activeItems.includes('leg2') ? 
                            setActiveItem(activeItems.filter(s => s != 'leg2')) 
                            : setActiveItem([...activeItems,'leg2'])}}>
                        <Header as='h4'>01/23 - 01/27<Label color={activeItems.includes('leg2') ? "teal" : "grey"} size='medium' content="4 nights"></Label></Header>
                    </Menu.Item>
                    <Menu.Item name='leg1'  
                        active={activeItems.includes('leg3')}
                        onClick={() => {activeItems.includes('leg3') ? 
                            setActiveItem(activeItems.filter(s => s != 'leg3')) 
                            : setActiveItem([...activeItems,'leg3'])}}>
                        <Header as='h4'>01/27 - 01/30<Label color={activeItems.includes('leg3') ? "teal" : "grey"} size='medium' content="3 nights"></Label></Header>
                    </Menu.Item>
                    </Menu>
            </Segment>
            <Segment>
               <Menu.Header
                    size='large'
                    content="SELECT YOUR SPOT"
                    style={{color: '#5A5A5A'}}/>
                 <Menu vertical style={{width:'100%'}}>

                    {spots!.map(spot => {
                        return(
                        <Menu.Item name={"spot"+ spot.spotId} style={{display: 'flex'}}>
                            <span style={{flexDirection: 'column'}}>
                            <Header size='large'>
                                TEST
                            </Header>
                            <Header size='small' style={{marginRight: 'auto'}}>
                                {spot.description}
                            </Header>
                            </span>
                            <Image style={{marginLeft: 'auto'}}size='medium' src="..//assets/categoryImages/nosara2.jpg"/>  
                        </Menu.Item>)
                        })}
                 </Menu>
            </Segment>
        </Segment.Group>
    )
})