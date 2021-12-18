import ACTypes from "../types";

const initialState = {
  entries: [],
  currentEntryId: "",
  currentImg: null,
  comments: [],
  loadingCommentStatus: true,
};

export const entry = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.ALL_ENTRIES:
      return { ...state, entries: action.payload.entries };

    case ACTypes.ADD_ENTRY:
      state.entries = [action.payload.entry, ...state.entries];
      return { ...state, entries: state.entries, currentImg: null };

    case ACTypes.EDIT_ENTRY:
      state.entries = state.entries.map((post) => {
        if (post?._id === action.payload.id) {
          return {
            ...post,
            likes:
              post.likes.indexOf(action.payload.author) === -1
                ? [...post.likes, action.payload.author]
                : post.likes.filter((el) => el !== action.payload.author),
          };
        }
        return post;
      });
      state.currentEntryId = "";
      return state;

    case ACTypes.EDIT_ENTRY_INFO:
      const entry = action.payload.entry.updatedEntry;
      state.entries = state.entries.map((post) => {
        if (post?._id === entry._id) {
          return {
            ...post,
            text: entry.text,
            img: entry.img,
            category: entry.category,
          };
        }
        return post;
      });
      state.currentEntryId = "";

      return { ...state, entries: state.entries };

    case ACTypes.DELETE_ENTRY:
      state.entries = state.entries.filter(
        (el) => el._id !== action.payload.id
      );
      return { ...state, entries: state.entries };

    case ACTypes.LIKE_ENTRY:
      return {
        ...state,
        currentEntryId: action.payload.id,
      };

    case ACTypes.CURRENT_IMG:
      return { ...state, currentImg: action.payload.img };

    case ACTypes.ALL_COMMENTS:
      return { ...state, comments: action.payload.comments };

    case ACTypes.ADD_COMMENT:
      state.comments = [...state.comments, action.payload.comment];
      return { ...state, comments: state.comments };

    case ACTypes.DELETE_COMMENT:
      state.comments = state.comments.filter(
        (el) => el._id !== action.payload.id
      );
      return { ...state, comments: state.comments };

    case ACTypes.LOADING_COMMENTS:
      return { ...state, loadingCommentStatus: action.payload.status };

    case ACTypes.CHANGE_USER_AVATAR_IN_BLOG:
      state.entries = state.entries.map((entry) => {
        if (entry.author._id === action.payload.userId) {
          return {
            ...entry,
            author: { ...entry.author, img: action.payload.img },
          };
        }
        return entry;
      });
      return { ...state, entries: state.entries };

    default:
      return state;
  }
};
