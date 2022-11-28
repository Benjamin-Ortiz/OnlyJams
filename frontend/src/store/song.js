//store thunk/action song functions
import { csrfFetch } from "./csrf";

//actions, all CRUD
const GET_SONG = 'song/getSong';
const GET_SONGS = 'song/getSongs';
// const UPDATE_SONG = 'song/updateSong';
// const ADD_SONG = 'song/addSong';
// const REMOVE_SONG = 'song/removeSong';


//action functions
// const getSong = (song) => {
//     type: GET_SONG, //assigned action
//     song //payload
// }


const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    }
};

// const updateSong = (songs) => {
//     type: UPDATE_SONG,
//         songs
// }

// const addSong = (songs) => {
//     type: ADD_SONG,
//         songs
// }

// const removeSong = (songs) => {
//     type: REMOVE_SONG,
//         songs
// }


//todo Thunk
// export const getSongbyId = (id) => async dispatch => {
//     const response = await csrfFetch(`/api/songs/${id}`);

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(getSong(data));
//         return response;
//     }
// }

export const getAllSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs');

    if (response.ok) {
        const data = await response.json();
        dispatch(getSongs(data.Songs));
        return response;
    }
}



//reducer, connects front to backend by packaging all the thunk action functions
// seeders = states, migration files = actions
let newState = {};

const songReducer = (state = newState, action) => {

    //switch between actions, always NEEDS to return something
    //complex version of an if statement
    switch (action.type) {

        case GET_SONG:
            return {
                ...state,
                [action.song.id] : action.song
            };
        case GET_SONGS:
            newState = {};
            action.songs.forEach(song => {
                newState[song.id] = song;
            });
            return newState;

        default:
            return state; //in case no action takes place, state is returned
    }
}

export default songReducer;
