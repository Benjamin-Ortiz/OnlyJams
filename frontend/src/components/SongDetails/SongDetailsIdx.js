import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as songActions from "../../store/song";
import "./SongDetails.css";

function SongDetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => {return state.session.user;});


  const song = useSelector((state) => {return state.songs});




  let { songId } = useParams();// when songId gets updated

useEffect(() => {

  if (songId) {
    dispatch(songActions.getSongById(songId))
  }
}, [dispatch, songId])

  const deleteASong = (songId) => {
    dispatch(songActions.removeSong(songId))

    history.push("/songs");
}

  const editASong = (songId) => {
    history.push(`/songs/edit/${songId}`);
}

const backButton = () => {
  history.push('/songs')
}

//if youre the owner, delete, edit show

// fix line


// { if (song.id === 6) {
//   return (
//     <>
//       <div className="main-div-song">
//       <h1 className="song-header">{song.title}</h1>
//       <div className="song-row">
//         <div className="song-image-container">
//           <div className="song-image-content">
//             <img className="song-image" src={photo2} alt={song.title} />
//           </div>
//           { song?.userId === user?.id && <>
//                 <button type="submit" className="song-edit-button" onClick={() => editASong(songId)}>
//                     Edit Song
//                 </button>
//                   <button type="submit" className="song-delete-button" onClick={() => deleteASong(songId)}>
//                   Delete Song
//               </button>
//               </>
//                 }
//         </div>
//         <div className="song-details">
//           <div className="song-title">
//           {song.title}
//             {/* <NavLink className="song-title-nav" to={`/songs/${song.id}`}>
//               // {song.title}
//             </NavLink> */}
//           </div>
//           <div className='song-artist'>{song?.User?.username}</div>
//           <div className="song-description">{song.description}</div>
//         </div>
//       </div>
//       <Route>
//         <button className="back_button" onClick={() => backButton()}>Back</button>
//       </Route>

//     </div>
//     </>
//   )
//   }
//  }


  return (
    <>
      <div className="main-div-song">
      <h1 className="song-header">{song.title}</h1>
      <div className="song-row">
        <div className="song-image-container">
          <div className="song-image-content">
            <img className="song-image" src={song.imageUrl} alt={song.title} />
          </div>
          { song?.userId === user?.id && <>
                <button type="submit" className="song-edit-button" onClick={() => editASong(songId)}>
                    Edit Song
                </button>
                  <button type="submit" className="song-delete-button" onClick={() => deleteASong(songId)}>
                  Delete Song
              </button>
              </>
                }
        </div>
        <div className="song-details">
          {/* <div className="song-title">
          {song.title}
          </div> */}
          <div className='song-artist'>{song?.User?.username}</div>
          <div className="song-description">{song.description}</div>
        </div>
      </div>
      <Route>
        <button className="back_button" onClick={() => backButton()}>Back</button>
      </Route>

    </div>
    </>
  )
      }

export default SongDetailsPage;
