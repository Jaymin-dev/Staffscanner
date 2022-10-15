import Cookies from "js-cookie";

export const IMAGE_UPLOAD_REQUEST = "IMAGE_UPLOAD_REQUEST";
export const IMAGE_UPLOAD_SUCCESS = "IMAGE_UPLOAD_SUCCESS";
export const IMAGE_UPLOAD_ERROR = "IMAGE_UPLOAD_ERROR";

export const GET_IMAGES_REQUEST = "GET_IMAGES_REQUEST";
export const GET_IMAGES_SUCCESS = "GET_IMAGES_SUCCESS";
export const GET_IMAGES_ERROR = "GET_IMAGES_ERROR";

export const GET_FAVOURITE_POST_REQUEST = "GET_FAVOURITE_POST_REQUEST";
export const GET_FAVOURITE_POST_SUCCESS = "GET_FAVOURITE_POST_SUCCESS";
export const GET_FAVOURITE_POST_ERROR = "GET_FAVOURITE_POST_ERROR";

export const ADD_FAVOURITE_POST_REQUEST = "ADD_FAVOURITE_POST_REQUEST";
export const ADD_FAVOURITE_POST_SUCCESS = "ADD_FAVOURITE_POST_SUCCESS";
export const ADD_FAVOURITE_POST_ERROR = "ADD_FAVOURITE_POST_ERROR";

export const DELETE_FAVOURITE_POST_REQUEST = "DELETE_FAVOURITE_POST_REQUEST";
export const DELETE_FAVOURITE_POST_SUCCESS = "DELETE_FAVOURITE_POST_SUCCESS";
export const DELETE_FAVOURITE_POST_ERROR = "DELETE_FAVOURITE_POST_ERROR";

export const SET_VOTES_REQUEST = "SET_VOTES_REQUEST";
export const SET_VOTES_SUCCESS = "SET_VOTES_SUCCESS";
export const SET_VOTES_ERROR = "SET_VOTES_ERROR";

export const LIST_VOTES_REQUEST = "LIST_VOTES_REQUEST";
export const LIST_VOTES_SUCCESS = "LIST_VOTES_SUCCESS";
export const LIST_VOTES_ERROR = "LIST_VOTES_ERROR";

export const LOGOUT = "LOGOUT";

export const RESET_BLOCK_AUTH = "RESET_BLOCK_AUTH";

export const RESET_FLAGS_AUTH = "RESET_FLAGS_AUTH";

const block = {
  loading: false,
  error: "",
  success: false,
};

const initialState = {
  imgUpload: { ...block },
  allImages: { data: [], ...block },
  logout: { ...block },
  addFavouritePost: { ...block },
  deleteFavouritePost: { ...block },
  votesSet: { ...block },
  votesList: { ...block },
};

export const DashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, imgUpload: { ...state.imgUpload, loading: true } };
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        imgUpload: {
          ...state.imgUpload,
          loading: false,
          success: true,
          error: "",
        },
      };
    case IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        imgUpload: { ...state.imgUpload, loading: false, error: payload },
      };

    case GET_IMAGES_REQUEST:
      return { ...state, allImages: { ...state.allImages, loading: true } };
    case GET_IMAGES_SUCCESS:
      return {
        ...state,
        allImages: {
          ...state.allImages,
          data: payload,
          success: true,
          error: "",
        },
      };
    case GET_IMAGES_ERROR:
      return {
        ...state,
        allImages: { ...state.allImages, loading: false, error: payload },
      };

    case GET_FAVOURITE_POST_REQUEST:
      return { ...state, allImages: { ...state.allImages, loading: true } };
    case GET_FAVOURITE_POST_SUCCESS:
      if (payload.length > 0) {
        const addFavObj = state.allImages.data.map((d) => {
          const imageIds = payload.map((d) => d.imageId);
          return {
            ...d,
            isFavourite: imageIds.includes(d.id),
            favouriteId:
              payload.find((v) => v.imageId === d.id)?.favouriteId || null,
          };
        });
        return {
          ...state,
          allImages: {
            ...state.allImages,
            data: addFavObj,
            loading: false,
            success: true,
            error: "",
          },
        };
      }
      return {
        ...state,
        allImages: {
          ...state.allImages,
          loading: false,
          success: true,
          error: "",
        },
      };
    case GET_FAVOURITE_POST_ERROR:
      return {
        ...state,
        allImages: { ...state.allImages, loading: false, error: payload },
      };

    case ADD_FAVOURITE_POST_REQUEST:
      return {
        ...state,
        addFavouritePost: { ...state.addFavouritePost, loading: true },
      };
    case ADD_FAVOURITE_POST_SUCCESS:
      const updateImagesData = state.allImages.data.map((i) => {
        if (i.id === payload.image_id)
          return {
            ...i,
            isFavourite: true,
            favouriteId: payload.favouriteId,
          };

        return {
          ...i,
        };
      });
      return {
        ...state,
        allImages: {
          ...state.allImages,
          data: updateImagesData,
        },
        addFavouritePost: {
          ...state.addFavouritePost,
          loading: false,
          success: true,
          error: "",
        },
      };
    case ADD_FAVOURITE_POST_ERROR:
      return {
        ...state,
        addFavouritePost: {
          ...state.addFavouritePost,
          loading: false,
          error: payload,
        },
      };

    case DELETE_FAVOURITE_POST_REQUEST:
      const deleteImagesFavData = state.allImages.data.map((i) => {
        if (i.favouriteId === payload.id)
          return {
            ...i,
            isFavourite: false,
            favouriteId: null,
          };
        return {
          ...i,
        };
      });
      return {
        ...state,
        allImages: {
          ...state.allImages,
          data: deleteImagesFavData,
        },
        deleteFavouritePost: { ...state.deleteFavouritePost, loading: true },
      };
    case DELETE_FAVOURITE_POST_SUCCESS:
      return {
        ...state,
        deleteFavouritePost: {
          ...state.deleteFavouritePost,
          loading: false,
          success: true,
          error: "",
        },
      };
    case DELETE_FAVOURITE_POST_ERROR:
      return {
        ...state,
        deleteFavouritePost: {
          ...state.deleteFavouritePost,
          loading: false,
          error: payload,
        },
      };

    case SET_VOTES_REQUEST:
      return {
        ...state,
        votesSet: { ...state.votesSet, loading: true },
      };
    case SET_VOTES_SUCCESS:
      return {
        ...state,
        votesSet: {
          ...state.votesSet,
          loading: false,
          success: true,
          error: "",
        },
      };
    case SET_VOTES_ERROR:
      return {
        ...state,
        votesSet: {
          ...state.votesSet,
          loading: false,
          error: payload,
        },
      };

    case LIST_VOTES_REQUEST:
      return {
        ...state,
        votesList: { ...state.votesList, loading: true },
      };
    case LIST_VOTES_SUCCESS:
      return {
        ...state,
        votesList: {
          ...state.votesList,
          loading: false,
          success: true,
          error: "",
        },
      };
    case LIST_VOTES_ERROR:
      return {
        ...state,
        votesList: {
          ...state.votesList,
          loading: false,
          error: payload,
        },
      };

    case LOGOUT:
      Cookies.remove("token", { path: "/" });
      return {
        ...initialState,
        logout: {
          success: true,
        },
      };

    //reset block with flag and data
    case RESET_BLOCK_AUTH:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...initialState[payload.blockType],
        },
      };

    //reset only flags(block)
    case RESET_FLAGS_AUTH:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...block,
        },
      };

    default:
      return state;
  }
};
