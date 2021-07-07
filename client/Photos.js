import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoItem from './PhotoItem';
import { navigate } from '@reach/router';

const Photos = (props) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getAllPhotos();
  },[])

  const getAllPhotos = () => {
    axios.get('/photo')
      .then(({data}) => {
        setPhotos(data);
      })
      .catch(err => console.log('err: ', err));
  }

  return (
    <>
    <h1>Welcome to photos app!</h1>
    <p>you can upload your photos and select your favorite one</p>
    <button onClick={() => navigate('/create')}>Add New Photo</button>
    {photos.map((photo, i) => {
      return <PhotoItem key={i} photo={photo} fetchSingle={props.fetchSingle} />
    })}
    </>
  )
}

export default Photos;