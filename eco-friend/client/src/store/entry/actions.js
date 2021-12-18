import ACTypes from "../types";

export const getAllEntries = (entries) => ({
  type: ACTypes.ALL_ENTRIES,
  payload: { entries },
});
export const createEntry = (entry) => ({
  type: ACTypes.ADD_ENTRY,
  payload: { entry },
});
export const editEntry = (id, author) => ({
  type: ACTypes.EDIT_ENTRY,
  payload: { id, author },
});
export const editEntryInfo = (entry) => ({
  type: ACTypes.EDIT_ENTRY_INFO,
  payload: { entry },
});
export const likeEntry = (id) => ({
  type: ACTypes.LIKE_ENTRY,
  payload: { id },
});
export const deleteEntry = (id) => ({
  type: ACTypes.DELETE_ENTRY,
  payload: { id },
});
export const saveCurrentImg = (img) => ({
  type: ACTypes.CURRENT_IMG,
  payload: { img },
});
export const getAllComments = (comments) => ({
  type: ACTypes.ALL_COMMENTS,
  payload: { comments },
});
export const createComment = (comment) => ({
  type: ACTypes.ADD_COMMENT,
  payload: { comment },
});
export const isLoadingComments = (status) => ({
  type: ACTypes.LOADING_COMMENTS,
  payload: { status },
});
export const deleteComment = (id) => ({
  type: ACTypes.DELETE_COMMENT,
  payload: { id },
});
export const changeUserImgInBlog = (userId, img) => ({
  type: ACTypes.CHANGE_USER_AVATAR_IN_BLOG,
  payload: { userId, img },
});
export const getAllEntriesThunk = () => async (dispatch) => {
  const response = await fetch("/entry", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const entries = await response.json();

  if (entries) dispatch(getAllEntries(entries));
};

export const createEntryThunk = (values, link) => async (dispatch) => {
  const response = await fetch("/entry/new", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values, link }),
  });
  const entry = await response.json();

  dispatch(createEntry(entry));
};
export const editEntryThunk = (values, link, id) => async (dispatch) => {
  const response = await fetch(`/entry/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values, link }),
  });
  const entry = await response.json();

  dispatch(editEntry(entry));
  dispatch(editEntryInfo(entry));
};
export const deleteEntryThunk = (id) => async (dispatch) => {
  const response = await fetch(`/entry/delete`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  await response.json();

  dispatch(deleteEntry(id));
};

export const likeEntryThunk = (id, author) => async (dispatch) => {
  const response = await fetch(`/entry/${id}/like`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
  });
  await response.json();
  dispatch(editEntry(id, author));
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

export const getAllCommentsThunk = (id) => async (dispatch) => {
  dispatch(isLoadingComments(true));
  const response = await fetch(`/entry/${id}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const comments = await response.json();

  if (comments) dispatch(getAllComments(comments));
  dispatch(isLoadingComments(false));
};

export const createCommentThunk = (values, entryId) => async (dispatch) => {
  const response = await fetch("/entry/comment/new", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values, entryId }),
  });
  const comment = await response.json();

  dispatch(createComment(comment));
};

export const deleteCommentThunk = (id) => async (dispatch) => {
  const response = await fetch(`/entry/comment/delete`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  await response.json();

  dispatch(deleteComment(id));
};
