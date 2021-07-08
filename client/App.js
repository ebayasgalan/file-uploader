import React, {useState} from 'react';
import CreatePhoto from './CreatePhoto';
import Photos from './Photos';
import SinglePhoto from './SinglePhoto';
import EditPhoto from './EditPhoto';
import {Router} from '@reach/router';
import axios from 'axios';

const App = () => {
  const [singleData, setSingleData] = useState();
  const fetchSingle = (id) => {
    axios.get(`/photo/${id}`)
      .then(({data}) => {
        setSingleData(data);
      })
      .catch(err => console.log(err));
  }

  return (
    <Router>
      <Photos fetchSingle={fetchSingle} path="/" />
      <CreatePhoto path="/create" />
      {singleData ? <SinglePhoto pic={singleData} path="single" /> : null}
      <EditPhoto pic={singleData} path="edit" /> 
    </Router>
  )
};

export default App;