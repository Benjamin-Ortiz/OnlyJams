import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as songActions from "../../store/song";
import CreateSongForm from "../CreateSong/CreateSongFormIdx";
import "./Songs.css";

//establish function component
function SongsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => {return state.songs});
  console.log(songs)



  useEffect(() => {
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  if (!user) return <Redirect to="/" />;

  if (!songs) return null;

  //! if user
  return (
    <div className="main-div-song">
      <h1 className="song-header">Songs</h1>
      {songs.songs &&
        songs.songs.map((song) => {
          return (
            <div className="song-row" key={song.id}>
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
