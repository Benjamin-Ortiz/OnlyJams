import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as albumActions from "../../store/album";
import "./Albums.css";

//establish function component
function AlbumsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => {return state.albums});
  console.log(albums, "ALL ALBUMS")



  useEffect(() => {
    dispatch(albumActions.getAllAlbums());
  }, [dispatch]);

  if (!user) return <Redirect to="/" />;

  if (!albums) return null;

  //! if user
  return (
    <div className="main-div-album">
      <h1 className="album-header">Albums</h1>
      {albums.albums &&
        albums.albums.map((album) => {
          return (
            <div className="album-row" key={album.id}>
              <div className="album-image-container">
                <div className="album-image-content">
                  <img
                    className="album-image"
                    src={album.imageUrl}
                    alt={album.title}
                  />
                </div>
              </div>
              <div className="album-details">
                <div className="album-title">
                  <NavLink className="album-title-nav" to={`/albums/${album.id}`}>
                    {album.title}
                  </NavLink>
                </div>
                {/* <div className='album-artist'>{album.username}</div> */}
                <div className="album-description">{album.description}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AlbumsPage;
