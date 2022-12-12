import { csrfFetch } from "./csrf";

const GET_ALBUM = "album/GET_ALBUM";
const ALL_ALBUMS = "album/ALL_ALBUMS";
const EDIT_ALBUM = "album/EDIT_ALBUM";
const ADD_ALBUM = "album/ADD_ALBUM";
const DELETE_ALBUM = "album/DELETE_ALBUM";

//todo GET
const getAlbum = (album) =>({
    type: GET_ALBUM,
    album
  })

export const getAlbumById = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`);

  if (res.ok) {
    const data = await res.json();

    dispatch(getAlbum(data));
  }
};

//todo GET ALL ALBUMS
const getAlbums = (albums) => ({
    type: ALL_ALBUMS,
    albums,
  });

export const getAllAlbums = () => async (dispatch) => {
  const res = await csrfFetch("/api/albums");

  if (res.ok) {
    const data = await res.json();

    dispatch(getAlbums(data.Albums));
    return res;
  }
};

//todo CREATE
const addAlbum = (album) => ({
    type: ADD_ALBUM,
    payload: album
  });

export const createAlbum = (data) => async (dispatch) => {
  const res = await csrfFetch("/api/albums", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const newAlbum = await res.json();

    dispatch(addAlbum(newAlbum));
    return res;
  }
};

//todo EDIT
const putAlbum = (album) => ({
    type: EDIT_ALBUM,
    payload: album,
  })

export const editAlbum = (payload) => async (dispatch) => {
    const {albumId, title, description, imageURL} = payload;

 // const response = await csrfFetch(`/api/albums/edit/${payload.id}`, {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedAlbum = await response.json();

    dispatch(putAlbum(updatedAlbum));
    return response;
  }
};

//todo DELETE
const deleteAlbum = (albumId) => ({
    type: DELETE_ALBUM,
    albumId,
  });

export const removeAlbum = (albumId) => async (dispatch) => {
  const album = await csrfFetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });

  if (album.ok) {
    dispatch(deleteAlbum(albumId));
  }
};

// REDUCER

let initialState = {
  albums:{
    albums: {}
  }
};

const albumReducer = (state = initialState, action) => {

  switch (action.type) {


    case GET_ALBUM:{
      const newState = {...action.album}
      newState.albums = {};
      return newState;
    }



    case ALL_ALBUMS:{
      const newState = {};

      newState.albums = action.albums;

      return newState;
    }

    case ADD_ALBUM:{
      let newState = {}

      newState = Object.assign({}, state);
      newState.albums = action.payload;

      return newState;
    }

    case EDIT_ALBUM:{


      const newState = Object.assign({}, state);
      newState.albums = action.payload;

      return newState;
}

    case DELETE_ALBUM:{

      const newState = {...state, ...state.albums}
       delete newState[action.albumId]
       return newState
    }

    default:
      return state
  }
};

export default albumReducer;
