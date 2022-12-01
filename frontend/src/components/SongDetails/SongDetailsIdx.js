import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as songActions from "../../store/song";
import "./SongDetails.css";

function SongDetailsPage() {
  const dispatch = useDispatch();
//   const history = useHistory();

  const user = useSelector((state) => {
    return state.session.user;
  });
  const songs = useSelector((state) => {
    return Object.values(state.songs);
  });

  let { songId } = useParams();

  // songId = Number(songId);

  const song = songs[songId - 1];

  useEffect(() => {
    dispatch(songActions.getSongbyId(songId));
  }, [dispatch, songId]);

  //delete song button
  // const deleteSongButton = (e) => {
  //     e.preventDefault();

  //     if (song.userId === user.id) {
  //         dispatch(songActions.deleteSong(song.id));
  //         history.push('/songs');
  //     }
  // }

  let songDetails = null

  if (song) {
    songDetails = (
        song ?
            <div className="main-div-song">
              <h1 className="song-header">Songs</h1>

              <div className="song-row" key={song.id}>
                <div className="song-image-container">
                  <div className="song-image-content">
                    {/* <img className="song-image" src={song.imageUrl} alt={song.title} /> */}
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
            </div>

            : <></>
          );
        }

        return songDetails
  }


export default SongDetailsPage;
