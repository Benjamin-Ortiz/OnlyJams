//store thunk/action song functions
import { csrfFetch } from "./csrf";

//actions, all CRUD
const GET_SONG = "song/GET_SONG";
const GET_SONGS = "song/GET_SONGS";
const EDIT_SONG = 'song/EDIT_SONG';
const ADD_SONG = "song/ADD_SONG";
const DELETE_SONG = 'song/DELETE_SONG';



 //todo GET
const getSong = (song) => ({
  type: GET_SONG, //assigned action
 song
})

export const getSongById = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`);

  if (response.ok) {
    const data = await response.json();

    dispatch(getSong(data));
  }
};

//TODO GET ALL SONGS

const getSongs = (songs) => ({
  type: GET_SONGS, //assigned action
  songs, //payload
})

export const getAllSongs = () => async (dispatch) => {
  const response = await csrfFetch("/api/songs");

  if (response.ok) {
    const data = await response.json(); //returns array

    dispatch(getSongs(data.Songs));
    return response;
  }
};

//todo CREATE

const addSong = (song) => ({
  type: ADD_SONG,
  payload: song
});

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


//todo EDIT

const putSong = (song) => ({
    type: EDIT_SONG,
        payload:song
})

export const editSong = (payload) => async (dispatch) => {
  const {songId,title,description,imageUrl,} = payload;

  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const updatedSong = await response.json();

    dispatch(putSong(updatedSong));
    return response;
  }
}

//todo DELETE
const deleteSong = (songId) =>({
  type:DELETE_SONG,
  songId
})

export const removeSong = (songId) => async (dispatch) => {
  const song = await csrfFetch(`/api/songs/${songId}`, {
      method: "DELETE"
  });

  if (song.ok) {
      dispatch(deleteSong(songId));
  }
}


//? REDUCER

let intialState = {
  songs: {
    songs:{}
  }
};

const songReducer = (state = intialState, action) => {
  //switch between actions, always NEEDS to return something
  //complex version of an if statement


  switch (action.type) {

    case GET_SONG: {
      const newState = {...action.song}
      newState.songs = {};
      return newState;
    }


    case GET_SONGS: {
      const newState = {};

      newState.songs = action.songs;

      return newState;
    }




    case ADD_SONG: {
      let newState = {}

      newState = Object.assign({}, state);
      newState.songs = action.payload;

      return newState;
    }


      case EDIT_SONG: {


     const newState = Object.assign({}, state);
     newState.songs = action.payload;

     return newState;
      }



        case DELETE_SONG: {

          const newState = {...state, ...state.songs}
           delete newState[action.songId]
           return newState
        }



    default:
      return state; //in case no action takes place, state is returned
  }
};

export default songReducer;
