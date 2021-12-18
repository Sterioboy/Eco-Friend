import ACTypes from "../types";
import { getRating } from "../user/actions";

export const getMap = (map) => ({
  type: ACTypes.MAP,
  payload: { map },
});

export const pointAC = (point) => ({ type: ACTypes.POINT, payload: { point } }); // позиция по клику

export const saveCurrentImg = (img) => ({
  type: ACTypes.CURRENT_IMG_MAP,
  payload: { img },
});

export const confirmPoint = (point) => ({
  type: ACTypes.CONFIRM_POINT,
  payload: { point },
});

export const deletePoint = (id) => ({
  type: ACTypes.DELETE_POINT,
  payload: { id },
});

export const changeStarPoint = (pointId, userId, sign) => ({
  type: ACTypes.ADD_STAR_POINT,
  payload: { sign, pointId, userId },
});

export const mapFetchThunk = () => async (dispatch) => {
  const response = await fetch("/map", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const map = await response.json();
  dispatch(getMap(map));
};

export const uploadImgThunk = (imgSelected) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", imgSelected);
  formData.append("upload_preset", "bh4tv9ap");

  const sendImg = await fetch(
    `https://api.cloudinary.com/v1_1/dwvm712y7/image/upload`,
    {
      method: "post",
      body: formData,
    }
  );
  const img = await sendImg.json();
  dispatch(saveCurrentImg(img));
};

export const createMarkerThunk = (marker) => async (dispatch) => {
  await fetch("/map", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marker),
  });

  const res = await fetch("/map", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  const map = await res.json();

  dispatch(getMap(map));
};

export const confirmPointDataThunk = (id) => async (dispatch) => {
  const response = await fetch(`/map/${id}`, {
    method: "put",
  });
  const point = await response.json();
  dispatch(confirmPoint(point));
};

export const deletePointThunk = (id) => async (dispatch) => {
  const response = await fetch(`/map/${id}`, {
    method: "delete",
  });
  await response.json();

  dispatch(deletePoint(id));
};

export const addStarToMapPointThunk = (pointId) => async (dispatch) => {
  const response = await fetch(`/map/point/${pointId}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  dispatch(getRating(result.authorOfPoint));
};
