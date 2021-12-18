import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Comment, Tooltip, Avatar, Divider } from "antd";
import classes from "./EntryComments.module.css";
import { CloseOutlined } from "@ant-design/icons";

import {
  getAllCommentsThunk,
  deleteCommentThunk,
} from "../../store/entry/actions";
import CreateComment from "./CreateComment";

const EntryComments = ({ entryId }) => {
  console.log("COMMENT entryId", entryId);
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.entry.comments);
  const isLoading = useSelector((store) => store.entry.loadingCommentStatus);
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    if (entryId) dispatch(getAllCommentsThunk(entryId));
  }, []);

  if (isLoading) {
    return (
      <div>
        <img style={{ width: 40 }} src="img/spinner/spinner.gif" alt="" />
      </div>
    );
  }

  return (
    <div className="Comment">
      {comments && (
        <div>
          {comments.map((oneComment) => (
            <div key={oneComment._id} className={classes.comments}>
              <Divider style={{ width: "50%" }} />
              <div className={classes.oneComment}>
                <Comment
                  className={classes.one_comment}
                  author={oneComment?.author?.name}
                  avatar={
                    oneComment?.author?.img ? (
                      <Avatar src={oneComment?.author?.img} alt="" />
                    ) : (
                      <Avatar src="img/person/default_avatar.jpeg" alt="" />
                    )
                  }
                  content={<p>{oneComment?.text}</p>}
                  datetime={
                    <Tooltip title="Published:">
                      <span>{String(oneComment?.date).slice(0,10)}</span>
                    </Tooltip>
                  }
                />
                {(user?.id === oneComment.author?._id || user?.role === 0) && (
                  <CloseOutlined
                    onClick={() => dispatch(deleteCommentThunk(oneComment._id))}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {user && (
        <CreateComment
          className={classes.create_comment_form}
          entryId={entryId}
        />
      )}
    </div>
  );
};
export default EntryComments;
