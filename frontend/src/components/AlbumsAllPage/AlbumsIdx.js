
import photo2 from "../../images/albumImg/Photo2.jpg"
import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as albumActions from "../../store/album";
import "./Albums.css";

//establish function component
function AlbumsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => Object.values(state.albums.albums)); //returns obj
 //console.log(albums, "ALL ALBUMS")



  useEffect(() => {
    dispatch(albumActions.getAllAlbums());
  }, [dispatch]);

  // if (!user) return <Redirect to="/" />;

  //if (!(Object.keys(albums.albums).length)) return null;

  //! if user
  return (
    <div className="albums-main-div-album">
      <h1 className="albums-album-header">Albums</h1>
      {albums &&
        albums.map((album) => {

         { if (album.id === 6) {
          return (  <div className="albums-album-row" key={album.id}>
          <div className="albums-album-image-container">
            <div className="albums-album-image-content">
              <img
                className="albums-album-image"
                src={photo2}
                alt={album.title}
              />
            </div>
          </div>
          <div className="albums-album-details">
            <div className="albums-album-title">
              <NavLink className="albums-album-title-nav" to={`/albums/${album.id}`}>
                {album.title}
              </NavLink>
            </div>
            {/* <div className='album-artist'>{album.username}</div> */}
            <div className="albums-album-description">{album.description}</div>
          </div>
        </div>)
          }
         }

          //state.album.img url = photo2 url


          return (
            <div className="albums-album-row" key={album.id}>
              <div className="albums-album-image-container">
                <div className="albums-album-image-content">
                  <img
                    className="albums-album-image"
                    src={album.imageUrl}
                    alt={album.title}
                  />
                </div>
              </div>
              <div className="albums-album-details">
                <div className="albums-album-title">
                  <NavLink className="albums-album-title-nav" to={`/albums/${album.id}`}>
                    {album.title}
                  </NavLink>
                </div>
                {/* <div className='album-artist'>{album.username}</div> */}
                <div className="albums-album-description">{album.description}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AlbumsPage;
