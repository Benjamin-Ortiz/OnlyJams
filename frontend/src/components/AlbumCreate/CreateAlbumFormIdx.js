import "./CreateAlbumForm.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as albumActions from "../../store/album";
// useParams?




const CreateAlbumForm = ({ hideform }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const album = useSelector((state)=> state)

  //* States
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("https://onlyjamsbucket.s3.amazonaws.com/images/defaultCover.jpg")
 // const [imageUrl, setImageUrl] = useState("")


  //* Updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  // const updateUrl = (e) => setUrl(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  //*creates
  // const createTitle = e => setTitle(e.target.value);
  // const createDescription = e => setDescription(e.target.value);
   const createimageUrl = e => setImageUrl(e.target.value);
  // const createUrl = e => setUrl(e.target.value);

  useEffect(() => {

  }, [album])


  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push('Please a title');
    if (!description.length) errors.push('Please provide a description');
    setValidationErrors(errors);
  }, [title, description])



  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    const payload = {
     // id,
      userId: user.id,
      title,
      description,
      url,
      imageUrl,
    }

    //? find a way to make url === futurealbum id
    dispatch(albumActions.createAlbum(payload))
    //  history.push(`/albums/${song.songs.songs.id}`) //?work on for later
    history.push(`/albums`)

  };



  return (
    <form className="create-album-form" onSubmit={handleSubmit}>
      <h1 className="create-album-header">Create Album</h1>
      <ul className="album-form-errors">
        {validationErrors.map((error, idx) => {
          return <li key={idx}>{error}</li>;
        })}
      </ul>

      <label className="album-title-label">
      Album Title
        <input
          className="create-album-text"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="album-description-label">
      Album Description
        <input
          className="create-album-description-text"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label className="imageUrl-label">
        Image Url
        <input
          className="create-imageUrl-text"
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl}
          //onChange={(e) => setImageUrl(e.target.value)}

        />
      </label>

      <button className="button-create-album" type="submit">
        See You At the Billboard 100!
      </button>
    </form>
  );
};

export default CreateAlbumForm;
