// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginForm";
import SignupFormPage from "./components/SignupFormPage/SignupFrom";
import SongDetailsPage from "./components/SongDetails/SongDetailsIdx";

import * as sessionActions from "./store/session";
import * as songActions from './store/song';

import Navigation from "./components/Navigation/NavigationIdx";
import SongsPage from './components/Songs/SongsIdx';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/songs/:songId'>
              <SongDetailsPage />
            </Route>
          <Route exact path='/songs'>
            <SongsPage />
          </Route>
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
