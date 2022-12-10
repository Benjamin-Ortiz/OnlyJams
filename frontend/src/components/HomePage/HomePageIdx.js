import photo1 from "../../images/homePageCSS/sadeLiveBanner.jpeg";
import photo2 from "../../images/albumImg/Photo2.jpg"
import React, { useEffect } from "react";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as albumActions from "../../store/album";
import * as songActions from "../../store/song";
import Navigation from "../Navigation/NavigationIdx";
import ProfileButton from "../Navigation/ProfileButton";

import "./HomePage.css";

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const albums = useSelector((state) => Object.values(state.albums.albums)); //returns obj
  const albumId = useParams();

  useEffect(() => {
    dispatch(albumActions.getAllAlbums());
  }, [dispatch]);

  const goToAlbum = (e) => {
    e.preventDefault();

    dispatch(albumActions(albumActions.getAlbumById(albumId)));
    history.push(`/albums/${albumId}`);
  };

  return (
    <>
      <div className="home-main-banner">
        {/* <Navigation />
  <ProfileButton /> */}
        <img src={photo1} className="home-main-banner-photo"></img>
      </div>

      <div className="home-stack-trend-and-contiainer">
        <div className="home-trending-header">Check Out These Albums</div>
        {/* <h1 className="album-header">Check Out These Albums</h1> */}
        <div className="home-main-div-album">
          <div className="home-albums-container">
            {albums &&
              albums.map((album, i, top8) => {
                // if length is > 8 stop .map loop
                //element, index, array

                {if (i<9) {
                  { if (album.id === 6) {
                    return (
                     <div key={album.id} className="home-album-image-container">
                       <div className="home-album-image-content">
                         <a href={`/albums/${album.id}`}>
                           <img
                           className="home-album-image"
                           src={photo2}
                           alt={album.title}

                           />
                         </a>




                         <div className="home-album-title">
                           <NavLink
                             className="home-album-title-nav"
                             to={`/albums/${album.id}`}
                           >
                             {album.title}
                           </NavLink>
                         </div>
                       </div>
                       <div className="home-album-details">
                         {/* <div className='album-artist'>{album.username}</div> */}
                         {/* <div className="album-description">{album.description}</div> */}
                       </div>
                     </div>
                   );

                 }
               }



                 return (
                   <div key={album.id} className="home-album-image-container">
                     <div className="home-album-image-content">
                     <a href={`/albums/${album.id}`}>
                           <img
                           className="home-album-image"
                           src={album.imageUrl}
                           alt={album.title}

                           />
                         </a>

                       <div className="home-album-title">
                         <NavLink
                           className="home-album-title-nav"
                           to={`/albums/${album.id}`}
                         >
                           {album.title}
                         </NavLink>
                       </div>
                     </div>
                     <div className="home-album-details">
                       {/* <div className='album-artist'>{album.username}</div> */}
                       {/* <div className="album-description">{album.description}</div> */}
                     </div>
                   </div>
                 );

                }
              }




              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
