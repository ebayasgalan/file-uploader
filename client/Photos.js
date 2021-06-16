import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Photo from './Photo';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    axios.get('/photo')
      .then(({data}) => {
        // need to assign to state 
        // console.log('data: ', data);
      })
  },[photos])
  return (photos.map(photo => {
    return <Photo name={photo.name} />
  }));
}

export default Photos;