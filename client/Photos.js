import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoItem from './PhotoItem';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    axios.get('/photo')
      .then(({data}) => {
        // need to assign to state 
        console.log('data: ', data);
        setPhotos(data);
      })
  },[])
  return (photos.map((photo, i) => {
    return <PhotoItem key={i} url={photo.url} />
  }));
}

export default Photos;