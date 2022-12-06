// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginForm";
import SignupFormPage from "./components/SignupFormPage/SignupFormIdx";
import CreateSongForm from "./components/CreateSong/CreateSongFormIdx";
import SongDetailsPage from "./components/SongDetails/SongDetailsIdx";
import EditSongForm from "./components/EditSong/EditSongIdx";

import * as sessionActions from "./store/session";
import * as songActions from "./store/song";

import Navigation from "./components/Navigation/NavigationIdx";
import SongsPage from "./components/Songs/SongsIdx";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch(songActions.getAllSongs());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/songs/edit/:songId">
            <EditSongForm />
          </Route>

          <Route exact path="/songs/create">
            <CreateSongForm />
          </Route>

          <Route exact path="/songs/:songId">
            <SongDetailsPage />
          </Route>

          <Route exact path="/songs">
            <SongsPage />
          </Route>

          {/* <Route exact path="/artists/:userId/:songId">
            <SongDetailsPage />
          </Route> */}

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
