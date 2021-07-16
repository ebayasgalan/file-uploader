import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { navigate } from '@reach/router';

const StyledEditPhoto = styled.div`
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

const EditPhoto = ({pic}) => {
  const [name, setName] = useState(pic.name);
  const [photo, setPhoto] = useState(pic.url);
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

  const saveToDB = (id, key) => {
      let file = photo;
      let formData = new FormData();
      formData.append('image', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('favorite', favorite);
      formData.append('prevPicUrl', pic.url);
      axios.patch(`/photo/${id}/${key}`, formData)
        .then(res => navigate('/'))
        .catch(err => console.log(err)); 
  }

  return (
    <StyledEditPhoto>
      <form onSubmit={e => {
        e.preventDefault();
        saveToDB(pic._id, pic.key);
      }}>
        <h1>Edit Photo</h1>
        <label>Name:
          <input required type="text" name='name' onChange={handleChange} />
        </label>
        <label>Description: 
          <textarea required name='description' onChange={handleChange} />
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
          <button type="submit">Save</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </StyledEditPhoto>
  )
};

export default EditPhoto;