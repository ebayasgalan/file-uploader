import React, {useState, useEffect} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import { navigate } from '@reach/router';
import EditPhoto from './EditPhoto';

const SinglePhoto = ({pic}) => {
  const [isEditing, setIsEditing] = useState(false);

  const cancelButtonHandler = () => {
    setIsEditing(false);
  }

  const deletePhoto = (id, key) => {
    axios.delete(`/photo/${id}/${key}`)
      .then((res) => {
        navigate('/');
      })
      .catch(err => {
        console.log('err: ', err);
      })
  }

  return( 
    <>
    {isEditing ? <EditPhoto pic={pic} cancel={cancelButtonHandler} /> : (
      <div>
        <Link to="/">Back</Link>
        <h2>Name: {pic.name}</h2>
        <img src={pic.url} alt="a photo" />
        <p>Description: {pic.description}</p>
        <p>favorite: {pic.favorite.toString()}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => deletePhoto(pic._id, pic.key)}>Delete</button>
      </div>
    )
    }
    </>
  )
}

export default SinglePhoto;