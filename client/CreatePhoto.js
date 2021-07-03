import React, {useState} from 'react';
import axios from 'axios';

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
    axios({
      url: '/photo',
      method: "POST",
      data: formData
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log('error: ', err);
    });
  }

  return (
    <>
    <form onSubmit={e => {
      e.preventDefault();
      fileUpload(e);
    }}>
      <h1>Welcome to photos app!</h1>
      <p>you can upload your photos and select your favorite one</p>
      <label htmlFor="name">Name:
        <input type="text" name='name' id="name" onChange={handleChange} />
      </label>
      <label htmlFor="description">Description: 
        <textarea name='description' onChange={handleChange} />
      </label>
      <label htmlFor="favorite">Favorite:
        <select type="boolean" name='favorite' id="favorite" onChange={handleChange}>
          <option value={true}>yes</option>
          <option value={false}>no</option>
        </select>
      </label>
      <label htmlFor="photo">
        {/* implement size checker later  */}
        <input required type="file" name='photo' id="photo" onChange={handleChange}/>
      </label>
      <button type="submit">Submit</button>
    </form>
    </>
  )
};

export default CreatePhoto;