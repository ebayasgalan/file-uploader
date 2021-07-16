import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {navigate} from '@reach/router';

const StyledPhoto = styled.div`
  display: flex;
  justify-content: center;
  form {
    height: 400px;
    width: 350px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .buttons {
    button {
      :hover {
        cursor: pointer;
      }
      font-size: 16px;
      height: 30px;
      margin-right: 15px;
    }
  }
`;

const CreatePhoto = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState([]);
  const [description, setDescription] = useState('');
  const [favorite, setFavorite] = useState(false);

  function handleChange(e) {
    const inputName = e.target.name;
    switch(inputName) {
      case 'name': setName(e.target.value);
        break;
      case 'photo': setPhoto(e.target.files[0]);
        break;
      case 'description': setDescription(e.target.value);
        break;
      case 'favorite': setFavorite(e.target.value);
        break;
    }
  }

  function fileUpload(e){
    let file = photo;
    let formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('favorite', favorite);
    axios.post('/photo', formData)
      .then(res => navigate('/'))
      .catch(err => console.log(err));
  }

  return (
    <StyledPhoto>
      <form onSubmit={e => {
        e.preventDefault();
        fileUpload(e);
      }}>
        <h1>Create a new photo</h1>
          <label>Name:
            <input type="text" name='name' onChange={handleChange} />
          </label>
          <label>Description: 
            <textarea name='description' onChange={handleChange} />
          </label>
          <label>Favorite:
            <select type="boolean" name='favorite' onChange={handleChange}>
              <option value={false}>no</option>
              <option value={true}>yes</option>
            </select>
          </label>
          <label>
            <input required type="file" name='photo' onChange={handleChange}/>
          </label>
        <div className="buttons">
          <button type="submit">Submit</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </StyledPhoto>
  )
};

export default CreatePhoto;