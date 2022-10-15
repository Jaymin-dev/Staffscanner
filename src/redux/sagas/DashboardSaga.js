import { all, call, put, takeLatest } from "redux-saga/effects";
import { Axios } from "../../api/axios";
import { getSimplifiedError } from "../../utils/error";
import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  GET_IMAGES_REQUEST,
  GET_IMAGES_SUCCESS,
  GET_IMAGES_ERROR,
  ADD_FAVOURITE_POST_REQUEST,
  ADD_FAVOURITE_POST_SUCCESS,
  ADD_FAVOURITE_POST_ERROR,
  DELETE_FAVOURITE_POST_REQUEST,
  DELETE_FAVOURITE_POST_SUCCESS,
  DELETE_FAVOURITE_POST_ERROR,
  SET_VOTES_REQUEST,
  SET_VOTES_SUCCESS,
  SET_VOTES_ERROR,
  LIST_VOTES_REQUEST,
  LIST_VOTES_SUCCESS,
  LIST_VOTES_ERROR,
  GET_FAVOURITE_POST_SUCCESS,
  GET_FAVOURITE_POST_ERROR,
  GET_FAVOURITE_POST_REQUEST,
} from "../reducers/DashboardReducer";
import { NotificationManager } from "react-notifications";

async function uploadImg(payload) {
  return await Axios.post("images/upload", payload);
}
function* handleUploadImg({ payload }) {
  try {
    const response = yield call(uploadImg, payload);
    if (response) {
      yield put({
        type: IMAGE_UPLOAD_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: IMAGE_UPLOAD_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function getAllImage(payload) {
  return await Axios.get("images", { params: { ...payload } });
}
function* handleGetAllImages({ payload }) {
  try {
    const response = yield call(getAllImage, payload);
    if (response) {
      yield put({
        type: GET_IMAGES_SUCCESS,
        payload: response,
      });

      yield put({
        type: GET_FAVOURITE_POST_REQUEST,
      });
    }
  } catch (error) {
    yield put({
      type: GET_IMAGES_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function addFavouritePost(payload) {
  return await Axios.post("favourites/", payload);
}
function* handleAddFavouritePost({ payload }) {
  try {
    const response = yield call(addFavouritePost, payload);
    if (response) {
      debugger;
      yield put({
        type: ADD_FAVOURITE_POST_SUCCESS,
        payload: {
          favouriteId: response.id,
          image_id: payload.image_id,
        },
      });
    }
  } catch (error) {
    yield put({
      type: GET_IMAGES_REQUEST,
    });
    yield put({
      type: ADD_FAVOURITE_POST_ERROR,
      payload: getSimplifiedError(error),
    });
    NotificationManager.error("Something went wrong");
  }
}

async function deleteFavouritePost(payload) {
  const { id } = payload;
  return await Axios.delete(`favourites/${id}`);
}
function* handleDeleteFavouritePost({ payload }) {
  try {
    const response = yield call(deleteFavouritePost, payload);
    if (response) {
      yield put({
        type: DELETE_FAVOURITE_POST_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: GET_IMAGES_REQUEST,
    });
    yield put({
      type: DELETE_FAVOURITE_POST_ERROR,
      payload: getSimplifiedError(error),
    });
    NotificationManager.error("Something went wrong");
  }
}

async function setVotes(payload) {
  return await Axios.post(`votes`, payload);
}
function* handleSetVotes({ payload }) {
  try {
    const response = yield call(setVotes, payload);
    if (response) {
      yield put({
        type: SET_VOTES_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: SET_VOTES_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function listVotes(payload) {
  return await Axios.get(`votes`, payload);
}
function* handleListVotes({ payload }) {
  try {
    const response = yield call(listVotes, payload);
    if (response) {
      yield put({
        type: LIST_VOTES_SUCCESS,
      });
    }
  } catch (error) {
    yield put({
      type: LIST_VOTES_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function getFavouritePost(payload) {
  return await Axios.get(`favourites`, { params: { limit: 100, ...payload } });
}
function* handleGetFavouritePost({ payload }) {
  try {
    const response = yield call(getFavouritePost, payload);
    if (response) {
      yield put({
        type: GET_FAVOURITE_POST_SUCCESS,
        payload: response.map((d) => ({
          imageId: d.image_id,
          favouriteId: d.id,
        })),
      });
    }
  } catch (error) {
    yield put({
      type: GET_FAVOURITE_POST_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(IMAGE_UPLOAD_REQUEST, handleUploadImg),
  takeLatest(GET_IMAGES_REQUEST, handleGetAllImages),
  takeLatest(ADD_FAVOURITE_POST_REQUEST, handleAddFavouritePost),
  takeLatest(DELETE_FAVOURITE_POST_REQUEST, handleDeleteFavouritePost),
  takeLatest(SET_VOTES_REQUEST, handleSetVotes),
  takeLatest(LIST_VOTES_REQUEST, handleListVotes),
  takeLatest(GET_FAVOURITE_POST_REQUEST, handleGetFavouritePost),
]);
