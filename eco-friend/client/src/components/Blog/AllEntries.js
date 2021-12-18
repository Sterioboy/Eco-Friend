import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, Avatar, Button, Badge, Tooltip, Input } from "antd";
import {
  SmileTwoTone,
  CaretDownOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import classes from "./AllEntries.module.css";

import {
  likeEntryThunk,
  likeEntry,
  deleteEntryThunk,
} from "../../store/entry/actions";
import EditEntry from "./EditEntry";
import EntryComments from "./EntryComments";
import CreateEntry from "./CreateEntry";
import EntryText from "./EntryText";
const { Meta } = Card;
const { Search } = Input;

const AllEntries = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenText, setIsOpenText] = useState({ id: "" });
  const [isOpenComments, setIsOpenComments] = useState({ id: "" });
  const [isOpenEditEntryForm, setIsOpenEditEntryForm] = useState({ id: "" });
  const [isEmptyPrevComment, setIsEmptyPrevComment] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState("");

  const entries = useSelector((store) => store.entry.entries);
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {}, []);

  const onLike = (entryid, userid) => {
    dispatch(likeEntryThunk(entryid, userid));
    dispatch(likeEntry(entryid));
  };

  const clickOpenComments = (id) => {
    setIsOpenComments("");
    setIsOpenComments({ [id]: true });
    setIsEmptyPrevComment(true);
  };

  const changeState = () => {
    setIsOpen(!isOpen);
  };

  const openEditEntryForm = (entryid) => {
    setIsOpenEditEntryForm({ id: entryid });
  };

  return (
    <div className={classes.AllEntries}>
      <CreateEntry />
      <Search
        className={classes.Search}
        placeholder="input category"
        allowClear
        onChange={(e) => {
          setIsOpenCategory(e.target.value);
        }}
        style={{ width: 200 }}
      />
      {!isOpen && (
        <div className="d-grid gap-2">
          <button variant="secondary" size="lg" onClick={changeState}>
            Open Blog <CaretDownOutlined />
          </button>
        </div>
      )}
      {isOpen && !isOpenCategory && (
        <>
          {entries?.map((entry) => (
            <>
              {isOpenEditEntryForm.id !== entry._id ? (
                <>
                  <Card
                    className={classes.card}
                    key={entry._id}
                    style={{ maxWidth: 900 }}
                    cover={
                      <div className={classes.images}>
                        {entry.likes.length > 5 && (
                          <img
                            className={classes.front_img}
                            variant="top"
                            src="https://walidsodki.com/unisale/animations/ecofriendly.gif"
                            alt=" "
                          />
                        )}
                        <img
                          className={classes.main_img}
                          style={{ width: 300 }}
                          variant="top"
                          src={entry?.img}
                          alt=" "
                        />
                      </div>
                    }
                  >
                    <Meta
                      avatar={
                        entry.author?.img ? (
                          <Badge count={entry.author.rating}>
                            <Avatar
                              src={entry.author?.img}
                              
                            />
                          </Badge>
                        ) : (
                          <Badge count={entry.author?.rating}>
                            <Avatar src="/img/person/default_avatar.jpeg" />{" "}
                          </Badge>
                        )
                      }
                      title={
                        <div className={classes?.title}>
                          <Tooltip title="see more">
                            <div
                              onClick={() => {
                                setIsOpenCategory(entry.category);
                                console.log(entry.category);
                                console.log("isOpenCategory", isOpenCategory);
                              }}
                            >
                              {entry.category}
                            </div>
                          </Tooltip>

                          <div>
                            {user?.id === entry.author?._id && (
                              <EditOutlined
                                onClick={() => openEditEntryForm(entry._id)}
                              />
                            )}
                            {(user?.id === entry.author?._id ||
                              user?.role === 0) && (
                              <CloseOutlined
                                onClick={() =>
                                  dispatch(deleteEntryThunk(entry._id))
                                }
                              />
                            )}
                          </div>
                        </div>
                      }
                      description={
                        <div>
                          <div className={classes.cardDescription}>
                            {isOpenText.id !== entry._id && (
                              <Tooltip title="click to read more">
                                <p
                                  onClick={() =>
                                    setIsOpenText({ id: entry._id })
                                  }
                                >
                                  {entry.text.slice(0, 50)}...
                                </p>
                              </Tooltip>
                            )}
                            {isOpenText.id === entry._id && (
                              <EntryText
                                setIsOpenText={setIsOpenText}
                                text={entry.text}
                              />
                            )}
                            <p>Author: {entry.author?.name} </p>
                            Posted: {String(entry?.date).slice(0, 10)}
                            <p>Likes: {entry.likes?.length} </p>
                          </div>
                          <div className={classes.like_btn}>
                            <Button
                              className={classes.button_comment}
                              type="link"
                              variant="primary"
                              onClick={() => clickOpenComments(entry._id)}
                            >
                              Comments
                            </Button>
                            {user && (
                              <SmileTwoTone
                                style={{ fontSize: 20, width: 50 }}
                                onClick={() => onLike(entry._id, user.id)}
                              />
                            )}
                          </div>
                        </div>
                      }
                    />
                  </Card>
                  <div>
                    {isEmptyPrevComment && isOpenComments[entry._id] && (
                      <EntryComments
                        key={`comment-${entry._id}`}
                        entryId={entry._id}
                      />
                    )}
                  </div>
                </>
              ) : (
                <EditEntry
                  entry={entry}
                  setIsOpenEditEntryForm={setIsOpenEditEntryForm}
                />
              )}
            </>
          ))}
        </>
      )}

      {isOpen && isOpenCategory && (
        <>
          {entries?.map((entry) => {
            if (entry.category === isOpenCategory) {
              return (
                <div>
                  {isOpenEditEntryForm.id !== entry._id ? (
                    <>
                      <Card
                        className={classes.card}
                        key={entry._id}
                        style={{ maxWidth: 900 }}
                        cover={
                          <div className={classes.images}>
                            {entry.likes.length > 5 && (
                              <img
                                className={classes.front_img}
                                variant="top"
                                src="https://walidsodki.com/unisale/animations/ecofriendly.gif"
                                alt=" "
                              />
                            )}
                            <img
                              className={classes.main_img}
                              style={{ width: 300 }}
                              variant="top"
                              src={entry?.img}
                              alt=" "
                            />
                          </div>
                        }
                      >
                        <Meta
                          avatar={
                            entry.author?.img ? (
                              <Badge count={entry.author.rating}>
                                <Avatar
                                  src={entry.author?.img}
                                />
                              </Badge>
                            ) : (
                              <Badge count={entry.author?.rating}>
                                <Avatar src="/img/person/default_avatar.png" />{" "}
                              </Badge>
                            )
                          }
                          title={
                            <div className={classes?.title}>
                              <Tooltip title="see more">
                                <div
                                  onClick={() =>
                                    setIsOpenCategory(entry.category)
                                  }
                                >
                                  {entry.category}
                                </div>
                              </Tooltip>

                              <div>
                                {user?.id === entry.author?._id && (
                                  <EditOutlined
                                    onClick={() => openEditEntryForm(entry._id)}
                                  />
                                )}
                                {(user?.id === entry.author?._id ||
                                  user?.role === 0) && (
                                  <CloseOutlined
                                    onClick={() =>
                                      dispatch(deleteEntryThunk(entry._id))
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          }
                          description={
                            <div>
                              <div className={classes.cardDescription}>
                                {isOpenText.id !== entry._id && (
                                  <Tooltip title="click to read more">
                                    <p
                                      onClick={() =>
                                        setIsOpenText({ id: entry._id })
                                      }
                                    >
                                      {entry.text.slice(0, 50)}...
                                    </p>
                                  </Tooltip>
                                )}
                                {isOpenText.id === entry._id && (
                                  <EntryText
                                    setIsOpenText={setIsOpenText}
                                    text={entry.text}
                                  />
                                )}
                                <p>Author: {entry.author?.name} </p>
                                Posted: {String(entry?.date).slice(0, 10)}
                                <p>Likes: {entry.likes?.length} </p>
                              </div>
                              <div className={classes.like_btn}>
                                <Button
                                  className={classes.button_comment}
                                  type="link"
                                  variant="primary"
                                  onClick={() => clickOpenComments(entry._id)}
                                >
                                  Comments
                                </Button>
                                {user && (
                                  <SmileTwoTone
                                    style={{ fontSize: 20, width: 50 }}
                                    onClick={() => onLike(entry._id, user.id)}
                                  />
                                )}
                              </div>
                            </div>
                          }
                        />
                      </Card>
                      <div>
                        {isEmptyPrevComment && isOpenComments[entry._id] && (
                          <EntryComments
                            key={`comment-${entry._id}`}
                            entryId={entry._id}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <EditEntry
                      entry={entry}
                      setIsOpenEditEntryForm={setIsOpenEditEntryForm}
                    />
                  )}
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default AllEntries;
