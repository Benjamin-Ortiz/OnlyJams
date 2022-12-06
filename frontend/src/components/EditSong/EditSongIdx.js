import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../store/song";

const EditSongForm = ({hideForm}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  // const user = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songs[songId]);

  //states
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  //updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  useEffect(() => {
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      songId,
      title,
      description,
      imageUrl,
    };

    try {
      await dispatch(songActions.editSong(payload));
      setErrors([]);
      history.push(`/songs/${songId}`);
    } catch (e) {
      const response = await e.json();
      setErrors(response.errors);
    }
    hideForm();
  };

  const cancelFunction = (e) => {
    e.preventDefault();

    history.push(`/songs/${songId}`);
  };

  //if song belongs to user then

  return (
    <form className="create_Song_form" onSubmit={handleSubmit}>
      <h1>Update Song</h1>

      <ul>
        {errors.map((error, id) => (
          <li key={id}>{error}</li>
        ))}
      </ul>

      <input
        className="edit-song-text"
        type="text"
        value={title}
        onChange={updateTitle}
        placeholder = 'Title'
      />
      <input
        className="edit-song-description"
        type="text"
        value={description}
        onChange={updateDescription}
        placeholder = 'Description'
      />
      <input
        className="edit-song-imageUrl"
        type="text"
        value={imageUrl}
        onChange={updateImageUrl}
        placeholder = 'Image Url'
      />

      <button type="submit">Update Song</button>
      <button type="button" onClick={cancelFunction}>
        Cancel
      </button>
    </form>
  );
};

export default EditSongForm;
