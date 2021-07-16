import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoItem from './PhotoItem';
import styled from 'styled-components';
import { navigate } from '@reach/router';

const StyledPhotos = styled.div`
  .topPart {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      :hover {
        cursor: pointer;
      }
      height: 35px;
      width: fit-content;
    }
  }
  .photos {
    justify-content: center;
  }
`;

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
    <StyledPhotos>
      <div className="topPart">
        <h1>Welcome to photos app!</h1>
        <p>you can upload your photos and select your favorite one</p>
        <button onClick={() => navigate('/create')}>Add New Photo</button>
      </div>
      <div className="photos">
        {photos.map((photo, i) => {
          return <PhotoItem key={i} photo={photo} fetchSingle={props.fetchSingle} />
        })}
      </div>
    </StyledPhotos>
  )
}

export default Photos;