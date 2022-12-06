import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as songActions from "../../store/song";
import * as albumActions from "../../store/album";

const EditAlbumForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  // const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[albumId]);

  //states
  const [validationErrors, setValidationErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //updates
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  useEffect(() => {
    dispatch(albumActions.getAllAlbums());
  }, [dispatch]);

  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push("Please a title");
    if (!description.length) errors.push("Please provide a description");
    setValidationErrors(errors);
  }, [title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    const payload = {
      albumId,
      title,
      description,
      imageUrl,
    };

    try {
      await dispatch(albumActions.editAlbum(payload));
      setValidationErrors([]);
      history.push(`/albums/${albumId}`);
    } catch (e) {
      const response = await e.json();
      setValidationErrors(response.validationErrors);
    }
  };

  const cancelFunction = (e) => {
    e.preventDefault();

    history.push(`/albums/${albumId}`);
  };

  //if album belongs to user then

  return (
    <form className="create_album_form" onSubmit={handleSubmit}>
      <h1>Update Album</h1>

      <ul>
        {validationErrors.map((error, id) => (
          <li key={id}>{error}</li>
        ))}
      </ul>

      <input
        className="edit-album-text"
        type="text"
        value={title}
        onChange={updateTitle}
        placeholder="Title"
      />
      <input
        className="edit-album-description"
        type="text"
        value={description}
        onChange={updateDescription}
        placeholder="Description"
      />
      <input
        className="edit-album-imageUrl"
        type="text"
        value={imageUrl}
        onChange={updateImageUrl}
        placeholder="Image Url"
      />

      <button type="submit">Update Album</button>
      <button type="button" onClick={cancelFunction}>
        Cancel
      </button>
    </form>
  );
};

export default EditAlbumForm;
