import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as songActions from "../../store/song";
import "./Songs.css";

//establish function component
function SongsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const pageSongs = useSelector((state) => Object.values(state.songs.songs));




  useEffect(() => {
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  //if (!pageSongs.length) return null;


  //! if user

  return (
    <div className="main-div-song">
      <h1 className="song-header">Songs</h1>

      {pageSongs &&
        pageSongs.map((song, index) => {
          return (
            <div key={song.id} className="song-row" >
              <div className="song-image-container">
                <div className="song-image-content">
                  <img
                    className="song-image"
                    src={song.imageUrl}
                    alt={song.title}
                  />
                </div>
              </div>
              <div className="song-details">
                <div className="song-title">
                  <NavLink className="song-title-nav" to={`/songs/${song.id}`}>
                    {song.title}
                  </NavLink>
                </div>
                {/* <div className='song-artist'>{song.username}</div> */}
                <div className="song-description">{song.description}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SongsPage;
