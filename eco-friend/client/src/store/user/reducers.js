import ACTypes from "../types";

const initialState = {
  user: null,
  currentImg: null,
  isOpenWelcomeComponent: true,
  userList: [],
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.AUTH:
      return { ...state, user: { id: action.payload.id } };

    case ACTypes.USER_ROLE:
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          role: action.payload.role,
          rating: action.payload.rating,
          img: action.payload.img,
        },
      };

    case ACTypes.AUTH_LOGOUT:
      return { ...state, user: null };

    case ACTypes.CURRENT_IMG_USER:
      return {
        ...state,
        user: { ...state.user, img: action.payload.img },
        currentImg: action.payload.img,
      };

    case ACTypes.CURRENT_IMG_CLEAR:
      return { ...state, currentImg: null };

    case ACTypes.SET_IMG:
      return { ...state, user: { ...state.user, img: action.payload.img } };

    case ACTypes.SET_RATING:
      return {
        ...state,
        user: { ...state.user, rating: action.payload.rating },
      };

    case ACTypes.WECLOME_COMPONENT:
      return { ...state, isOpenWelcomeComponent: false };

    case ACTypes.SHOW_USERS_LIST:
      return { ...state, userList: action.payload.userList };

    default:
      return state;
  }
};
