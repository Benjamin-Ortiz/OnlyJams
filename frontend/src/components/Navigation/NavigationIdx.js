// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { addSong } from "../../store/song";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const addSongNav = (e) => {
    e.preventDefault();
    history.push("/songs/create");
  };

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="nav-links-logged-in">
        <button className="nav-add-song" onClick={addSongNav}>
          Upload Your Song!
        </button>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="nav-links-logged">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div>
      <NavLink className="nav-to-songs-link" to="/songs">
        Discover All Songs!
      </NavLink>

      <NavLink exact to="/">
        Home
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
