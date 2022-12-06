import "./CreateSongForm.css";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from "../../store/song";
//import { createSong } from "../../store/song";
//album actions?



const CreateSongForm = ({ hideform }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const song = useSelector((state)=> state)

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
  // const updateUrl = (e) => setUrl(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  //*creates
  // const createTitle = e => setTitle(e.target.value);
  // const createDescription = e => setDescription(e.target.value);
  // const createimageUrl = e => setimageUrl(e.target.value);
  // const createUrl = e => setUrl(e.target.value);

  useEffect(() => {
    // console.log(song, "-=-=-=-=-=");
  }, [song])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);

    // console.log(user);

    const payload = {
     // id,
      userId: user.id,
      title,
      description,
      url,
      imageUrl,
    }

    //? find a way to make url === futuresong id
    dispatch(songActions.createSong(payload))
    //  history.push(`/songs/${song.songs.songs.id}`) //?work on for later
    history.push(`/songs`)
    history.go(0)

  };

  // console.log(song, "+++++");

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Song Description
        <input
          className="create-song-text"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Image Url
        <input
          className="create-imageUrl-text"
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>

      <button className="button-create-song" type="submit">
        Make The Next Hit!
      </button>
    </form>
  );
};

export default CreateSongForm;
