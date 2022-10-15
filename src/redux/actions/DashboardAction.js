import {
  IMAGE_UPLOAD_REQUEST,
  GET_IMAGES_REQUEST,
  RESET_BLOCK_AUTH,
  RESET_FLAGS_AUTH,
  LOGOUT,
  ADD_FAVOURITE_POST_REQUEST,
  DELETE_FAVOURITE_POST_REQUEST,
  SET_VOTES_REQUEST,
  GET_FAVOURITE_POST_REQUEST,
} from "../reducers/DashboardReducer";

export const uploadImage = (payload) => ({
  type: IMAGE_UPLOAD_REQUEST,
  payload,
});

export const getAllImages = (payload) => ({
  type: GET_IMAGES_REQUEST,
  payload,
});

export const getFavouritePost = (payload) => ({
  type: GET_FAVOURITE_POST_REQUEST,
  payload,
});

export const addFavouritePost = (payload) => ({
  type: ADD_FAVOURITE_POST_REQUEST,
  payload,
});

export const deleteFavouritePost = (payload) => ({
  type: DELETE_FAVOURITE_POST_REQUEST,
  payload,
});

export const setVotes = (payload) => ({
  type: SET_VOTES_REQUEST,
  payload,
});

export const resetBlockAuth = (payload) => ({
  type: RESET_BLOCK_AUTH,
  payload,
});

export const resetFlagsAuth = (payload) => ({
  type: RESET_FLAGS_AUTH,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});
