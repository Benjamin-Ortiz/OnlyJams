import photo2 from "../../images/albumImg/Photo2.jpg"
import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as albumActions from "../../store/album"
import "./AlbumPage.css";

function AlbumPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => {return state.session.user;});

  const album = useSelector((state) => {return state.albums});

  let { albumId } = useParams();



useEffect(() => {

  if (albumId) {
    dispatch(albumActions.getAlbumById(albumId))
  }
}, [dispatch, albumId])

  const deleteAnAlbum = (albumId) => {
    dispatch(albumActions.removeAlbum(albumId))

    history.push("/albums");
}

  const editAAlbum = (albumId) => {
    history.push(`/albums/edit/${albumId}`);
}

const backButton = () => {
  history.push('/albums')
}
  return (
    <>
      <div className="main-div-album">
      <h1 className="album-header">{album.title}</h1>
      <div className="album-row">
        <div className="album-image-container">
          <div className="album-image-content">
            <img className="album-image" src={album.imageUrl} alt={album.title} />
          </div>
          { user &&
          album?.userId === user?.id && <>
                <button type="submit" className="album-edit-button" onClick={() => editAAlbum(albumId)}>
                    Edit album
                </button>
                  <button type="submit" className="album-delete-button" onClick={() => deleteAnAlbum(albumId)}>
                  Delete album
              </button>
              </>
                }
        </div>
        <div className="album-details">
          {/* <div className="album-title">
          {album.title}
          </div> */}
          <div className='album-artist'>{album?.User?.username}</div>
          <div className="album-description">{album.description}</div>
        </div>
      </div>
      <Route>
        <button className="back_button" onClick={() => backButton()}>Back</button>
      </Route>

    </div>
    </>
  )
      }

export default AlbumPage;
