import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../store/song";

const EditSongForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams;
  // const user = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songs[songId]);

  //states
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [imageUrl, setImageUrl] = useState(song.imageUrl);

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
        title,
        description,
        imageUrl
    }
    try{
        await dispatch(songActions.editSong(payload))
          setErrors([])
          history.push(`/songs/${songId}`)
        }catch(e){
          const response = await e.json()
          setErrors(response.errors)
        }
        hideForm()
      }

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  //if song belongs to user then


  return (
    <section className="edit-form-section">
      <form onSubmit={handleSubmit}>
        <input
          className="edit-song-text"
          type="text"
          value={title}
          onChange={updateTitle}
        />
        <input
         className="edit-song-description"
         type="text"
         value={description}
         onChange={updateDescription}
        />
          <input
         className="edit-song-imageUrl"
         type="text"
         value={imageUrl}
         onChange={updateImageUrl}
        />

        <button type="submit">Update Song</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default EditSongForm;
