//store thunk/action song functions
import { csrfFetch } from "./csrf";

//actions, all CRUD
const GET_SONG = "song/GET_SONG";
const GET_SONGS = "song/GET_SONGS";
const EDIT_SONG = 'song/EDIT_SONG';
const ADD_SONG = "song/ADD_SONG";
// const REMOVE_SONG = 'song/removeSong';

//action functions

const getSong = (song) => ({
  type: GET_SONG, //assigned action
  payload: song
})

const getSongs = (songs) => ({
  type: GET_SONGS, //assigned action
  payload: songs, //payload
})

const addSong = (song) => ({
  type: ADD_SONG,
  payload: song
});

const putSong = (song) => ({
    type: EDIT_SONG,
        payload:song
})

// const removeSong = (song) => ({
//     type: REMOVE_SONG,
//     payload: song
// })

//todo Thunk
export const getSongbyId = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`);

  if (response.ok) {
    const data = await response.json();



    dispatch(getSong(data));
    return response;
  }
};

export const getAllSongs = () => async (dispatch) => {
  const response = await csrfFetch("/api/songs");

  if (response.ok) {
    const data = await response.json(); //returns array

    dispatch(getSongs(data.Songs));
    return response;
  }
};

export const createSong = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const newSong = await response.json();

    dispatch(addSong(newSong));
    return response;
  }
};

export const editSong = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/songs/:songId", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const updatedSong = await response.json();

    dispatch(putSong(updatedSong));
    return response;
  }
}



//reducer, connects front to backend by packaging all the thunk action functions
// seeders = states, migration files = actions
let intialState = {};

const songReducer = (state = intialState, action) => {
  //switch between actions, always NEEDS to return something
  //complex version of an if statement
  let newState;

  switch (action.type) {
    case GET_SONG:
       newState = Object.assign({}, state);
       newState.songs = action.payload;
        // [action.song.id]: action.song,
        return newState


    case GET_SONGS:

      newState = Object.assign({}, state);
      newState.songs = action.payload;

      return newState;



    case ADD_SONG:
      newState = Object.assign({}, state);
      newState.songs = action.payload;

      return newState;


      case EDIT_SONG:
        newState = Object.assign({}, state);
        newState.songs = action.payload;

        return newState;




    default:
      return state; //in case no action takes place, state is returned
  }
};

export default songReducer;
