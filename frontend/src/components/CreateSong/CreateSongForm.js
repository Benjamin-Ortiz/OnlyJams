import "./CreateSongForm.css";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import * as songActions from "../../store/song";
import { createSong } from "../../store/song";
//album actions?

const CreateSongForm = ({ hideform }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  // const {albumId} = useParams();
  // const albums = useSelector(state => Object.values(state.albums));
  // const album = useSelector(state => Object.values(state.albums[albumId]));

  //* States
  const [errorMessages, setErrorMessages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //* Updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  //*creates
  // const createTitle = e => setTitle(e.target.value);
  // const createDescription = e => setDescription(e.target.value);
  // const createimageUrl = e => setimageUrl(e.target.value);
  // const createUrl = e => setUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);

    const payload = {
      userId: user.id,
      title,
      description,
      url,
      imageUrl,
    }



    let createASong;
    try{

      createASong = await dispatch(createSong(payload))
      setErrorMessages([])
      history.push(`/songs/${createASong.id}`)
    }catch(e){
      const response = await e.json()
      setErrorMessages(response.errors)
    }

    // return dispatch(songActions.createSong(newSong))
    //   .then(() => dispatch(songActions.getAllSongs()))
    //   .catch(async (rejected) => {
    //     const data = await rejected.json();
    //     if (data && data.errors) setErrorMessages(data.errors);
    //     history.push(`/songs/`)
    //   });




  };


  return (
    <form className="create-song-form" onSubmit={handleSubmit}>
      <h1 className="create-song-header">Create Song</h1>
      <ul>
        {errorMessages.map((error, idx) => {
          return <li key={idx}>{error}</li>;
        })}
      </ul>

      <label>
        Song Title
        <input
          className="create-song-text"
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={updateTitle}
        />
      </label>

      <label>
        Song Description
        <input
          className="create-song-text"
          type="text"
          placeholder="Song Description"
          value={description}
          onChange={updateDescription}
        />
      </label>

      <label>
        URL
        <input
          className="create-url-text"
          type="text"
          placeholder="URL"
          value={url}
          onChange={updateUrl}
        />
      </label>

      <label>
        Image Url
        <input
          className="create-imageUrl-text"
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl}
        />
      </label>
      <button className="button-create-song" type="submit">
        Make The Next Hit!
      </button>
    </form>
  );
};

export default CreateSongForm;
