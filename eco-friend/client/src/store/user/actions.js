import ACTypes from "../types";

import { changeUserImgInBlog } from "../entry/actions";

export const isAuthCheck = (id) => ({
  type: ACTypes.AUTH,
  payload: { id: id },
});
export const checkUserRole = (id, role, name, rating, img) => ({
  type: ACTypes.USER_ROLE,
  payload: { id: id, role: role, name: name, rating: rating, img: img },
});
export const isLogout = () => ({ type: ACTypes.AUTH_LOGOUT });

export const saveCurrentImgUser = (img) => ({
  type: ACTypes.CURRENT_IMG_USER,
  payload: { img },
});

export const clearCurrentImg = () => ({ type: ACTypes.CURRENT_IMG_CLEAR });
export const closeWelcomeComponent = () => ({
  type: ACTypes.WECLOME_COMPONENT,
});

export const setImg = (img) => ({
  type: ACTypes.SET_IMG,
  payload: { img },
});

export const setRating = (rating) => ({
  type: ACTypes.SET_RATING,
  payload: { rating },
});
export const showUsersListAC = (userList) => ({
  type: ACTypes.SHOW_USERS_LIST,
  payload: { userList },
});

export const logoutThunk = () => async (dispatch) => {
  await fetch("/auth/logout", {
    method: "post",
  });
  dispatch(isAuthCheck(null));
  dispatch(isLogout());
};

export const signinThunk = (values) => async (dispatch, navigate) => {
  const response = await fetch("/auth/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const userId = await response.json();

  dispatch(isAuthCheck(userId));
  navigate("/");
};

export const signupThunk = (values) => async (dispatch, navigate) => {
  const response = await fetch("/auth/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const userId = await response.json();
  dispatch(isAuthCheck(userId));
  navigate("/");
};

export const checkUserAuthThunk = () => async (dispatch) => {
  const response = await fetch("/auth/check", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const user = await response.json();

  if (user) {
    dispatch(
      checkUserRole(user.id, user.role, user.name, user.rating, user.img)
    );
  }
};

export const deleteUserThunk = (id, userId) => async (dispatch) => {
  await fetch(`/auth/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
};

export const uploadUserImgThunk = (imgSelected) => async (dispatch) => {
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
  dispatch(saveCurrentImgUser(img));
};

export const changeUserProfilePicThunk = (id, link) => async (dispatch) => {
  await fetch("/user/img", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, link }),
  });
  dispatch(getImg(id));
  dispatch(changeUserImgInBlog(id, link));
};

export const getImg = (id) => async (dispatch) => {
  const response = await fetch("/user/check-img", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: id }),
  });
  const img = await response.json();

  if (img) dispatch(setImg(img));
};

export const getRating = (id) => async (dispatch) => {
  const response = await fetch("/user/check-rating", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: id }),
  });
  const rating = await response.json();
  dispatch(setRating(rating));
};

export const showUsersListThunk = () => async (dispatch) => {
  try {
    const res = await fetch(" http://localhost:3700/user");
    if (!res.ok) {
      throw new Error(res.statusText || res.status);
    }
    const userList = await res.json();
    dispatch(showUsersListAC(userList));
  } catch (err) {
    console.error(err);
    alert("Произошла ошибка...");
  }
};
