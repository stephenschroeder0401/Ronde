import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() =>{
    axios.get('https://localhost:44323/api/values').then( response => {
    setActivities(response.data);
  })
},[]);


  return (
    <div>
      <Header as='h2' icon='users' content='Ronde'/>
        <List>
          {activities.map((activity : any) => (
            <List.Item key={activity}>
              {activity}
            </List.Item>
          ))}
        </List>
      </div>
  );
}

export default App;
