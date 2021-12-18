import ACTypes from "../types";

const initialState = {
  map: [],
  point: [], // позиция по клику
  currentImg: null,
  currentPoint: {},
};

export const map = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.MAP:
      return { ...state, map: action.payload.map };

    case ACTypes.POINT:
      return { ...state, point: action.payload.point }; 

    case ACTypes.CURRENT_IMG_MAP:
      return { ...state, currentImg: action.payload.img };

    case ACTypes.CONFIRM_POINT:
      state.map = state.map.map((point) => {
        if (point?._id === action.payload.point._id) {
          return {
            ...point,
            confirmed: true,
          };
        }
        return point;
      });
      state.currentPoint = {};
      return state;

    case ACTypes.DELETE_POINT:
      state.map = state.map.filter((el) => el._id !== action.payload.id);
      return { ...state, map: state.map };

    case ACTypes.ADD_STAR_POINT:
      state.map = state.map.map((point) => {
        if (point._id === action.payload.pointId) {
          if (action.payload.sign === "-") {
            point.stars.filter((el) => el !== action.payload.userId);
          }
          if (action.payload.sign === "+") {
            point.stars = [...point.stars, action.payload.userId];
          }
        }
        return point;
      });
      return { ...state, map: state.map };

    default:
      return state;
  }
};
