//store thunk/action song functions
import { csrfFetch } from "./csrf";

//actions, all CRUD
const GET_SONG = "song/getSong";
const GET_SONGS = "song/getSongs";
// const EDIT_SONG = 'song/editSong';
const ADD_SONG = "song/addSong";
// const REMOVE_SONG = 'song/removeSong';

//action functions

const getSong = (song) => ({
  type: GET_SONG, //assigned action
  song, //payload
})

const getSongs = (songs) => ({
  type: GET_SONGS, //assigned action
  songs, //payload
})

const addSong = (song) => ({
  type: ADD_SONG,
  song
});

// const editSong = (songs) => {
//     type: EDIT_SONG,
//         songs
// }

// const removeSong = (songs) => {
//     type: REMOVE_SONG,
//         songs
// }

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
    const data = await response.json();
    dispatch(getSongs(data.Songs));
    return response;
  }
};

// export const addSpot = (data) => async(dispatch)=>{
//   const response = await csrfFetch(`/api/spots`,{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   if(response.ok){
//     const spot = await response.json()
//     console.log(dispatch(add(spot)))
//     dispatch(add(spot))
//     return spot
//   }
//   return response
// }

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

//reducer, connects front to backend by packaging all the thunk action functions
// seeders = states, migration files = actions
let intialState = {};

const songReducer = (state = intialState, action) => {
  //switch between actions, always NEEDS to return something
  //complex version of an if statement

  switch (action.type) {
    case GET_SONG: {
      return {
        ...state,
        [action.song.id]: action.song,
      };
    }

    case GET_SONGS: {
      const newState = {};
      action.songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    }


    case ADD_SONG:{
      return {
        ...state,
        [action.song.id]: action.song,
      };
    }


    default:
      return state; //in case no action takes place, state is returned
  }
};

export default songReducer;
