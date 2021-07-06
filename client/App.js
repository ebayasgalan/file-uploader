import React, {useState} from 'react';
import CreatePhoto from './CreatePhoto';
import Photos from './Photos';
import SinglePhoto from './SinglePhoto';
import EditPhoto from './EditPhoto';
import {Router} from '@reach/router';
import axios from 'axios';

const HomePage = (props) => (
  <>
    <CreatePhoto />
    <Photos fetchSingle={props.fetchSingle} />
  </>
)

const App = () => {
  const [singleData, setSingleData] = useState();
  const fetchSingle = (id) => {
    axios.get(`/photo/${id}`)
      .then(({data}) => {
        console.log('from single: ', data);
        setSingleData(data);
      })
      .catch(err => console.log(err));
  }

  return (
    <Router>
      <HomePage fetchSingle={fetchSingle} path="/" /> 
      {singleData ? <SinglePhoto pic={singleData} path="single" /> : null}
      <EditPhoto pic={singleData} path="edit" /> 
    </Router>
  )
};

export default App;