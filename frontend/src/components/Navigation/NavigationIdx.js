// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import DemoUser from "../DemoUser/DemoUserIdx"
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const addSongNav = (e) => {
    e.preventDefault();
    history.push("/songs/create");
  };

  const addAlbumNav = (e) => {
    e.preventDefault();
    history.push("/albums/create");
  };

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="nav-links-logged-in">
        <div className="profile-button">
        <ProfileButton user={sessionUser} />
        </div>
        <button className="nav-add-song" onClick={addSongNav}>
          Upload Your Song!
        </button>
        <button className="nav-add-album" onClick={addAlbumNav}>
          Upload Your album!
        </button>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="nav-links-logged">
        <div className="log-in">
        <NavLink className='log-in-button' to="/login">Log In</NavLink>
        </div>
        <div className="sign-up">
        <NavLink className='sing-up-button' to="/signup">Sign Up</NavLink>
        </div>

        <DemoUser />
      </div>
    );
  }

  return (
    <div className="home-button">
      <NavLink className='home-butt' exact to="/">
        Home
      </NavLink>

      <div className="create-buttons">
      <NavLink className="nav-to-songs-link" to="/songs">
        Discover All Songs!
      </NavLink>

      <NavLink className="nav-to-albums-link" to="/albums">
        Top 100 Albums!
      </NavLink>
      </div>





      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
