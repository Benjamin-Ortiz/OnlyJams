import photo1 from "../../images/homePageCSS/sadeLiveBanner.jpeg";
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
  const albums = useSelector((state) => {
    return state.albums;
  });
  console.log(albums, "HOME PAGE");
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
      <div className="main-banner">
        {/* <Navigation />
  <ProfileButton /> */}
        <img src={photo1} class="main-banner-photo"></img>
      </div>

      <div className="stack-trend-and-contiainer">
        <div className="trending-header">Check Out These Albums</div>
        {/* <h1 className="album-header">Check Out These Albums</h1> */}
        <div className="main-div-album">
          <div className="albums-container">
            {albums.albums &&
              albums.albums.map((album) => {
                // if length is > 8 stop loop
                return (
                  <div className="album-image-container">
                    <div className="album-image-content">
                      <img
                        className="album-image"
                        src={album.imageUrl}
                        alt={album.title}
                      />
                      <div className="album-title">
                        <NavLink
                          className="album-title-nav"
                          to={`/albums/${album.id}`}
                        >
                          {album.title}
                        </NavLink>
                      </div>
                    </div>
                    <div className="album-details">
                      {/* <div className='album-artist'>{album.username}</div> */}
                      {/* <div className="album-description">{album.description}</div> */}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
