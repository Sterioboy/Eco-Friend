import React, { useEffect, useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showUsersListThunk } from "../../store/user/actions";
import Carousel from "./Carousel/Carousel";
import LeaderProfile from "./LeaderProfile/LeaderProfile";
import PublicationsProfile from "./LeaderProfile/PublicationsProfile/PublicationsProfile";
import classes from "./Leaderboard.module.css";

import "./Leaderboard.css";

const Leaderboard = () => {
  const data = useSelector((store) => store.auth.userList);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [showPublications, setShowPublications] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();
  const quantity = data.length;

  useEffect(() => {
    setFilter(
      data.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  }, [value, data]);

  useEffect(() => {
    dispatch(showUsersListThunk(data));
  }, []);

  const LeaderProfileHandler = (user) => {
    setOpenProfile(user);
    setValue("");
    setShowPublications(false);
    setShowInfo(user._id === openProfile._id ? (value) => !value : true);
  };

  return (
    <div className={classes.backLeaderboard}>
      <div className="top">
        <Carousel />
      </div>
      <div className="d-flex ">
        <div className=" w-50 p-2 m-1 colorTextPeople">
          <Form className="d-flex justify-content-between">
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2 w-50 h-25 "
              aria-label="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="colorTextPeople" heigth="25px">
              <p>
                We already have: <b className={classes.p}>{quantity}</b> people
              </p>
            </div>
          </Form>
          <ListGroup className="d-flex mt-1 w-100 scroll">
            {filter
              .sort((a, b) => (a.rating < b.rating ? 1 : -1))
              .map((user) => (
                <ListGroup.Item
                  key={user._id}
                  action
                  variant="success"
                  id="list-example"
                  class="list-group"
                  onClick={() => LeaderProfileHandler(user)}
                >
                  <div
                    className=" d-flex justify-content-between mt-1 colorTextItem "
                    data-bs-spy="scroll"
                  >
                    <div>{user.name}</div>
                    <span className="">{user.rating} points</span>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>
        <div className=" w-50 p-2 m-1 scroll-rigth ">
          {showInfo ? (
            <>
              {openProfile && (
                <LeaderProfile
                  openProfile={openProfile}
                  setShowPublications={setShowPublications}
                />
              )}
              {showPublications && (
                <PublicationsProfile authorId={openProfile._id} />
              )}
            </>
          ) : (
            <div className="gifBox">
              <div>
                <img
                  src="https://media0.giphy.com/media/RnEApCzxC0800zvWol/giphy.gif?cid=6c09b9520c9zk7vnln2m4ofsqar5msfq8ivcvjfc68704zen&rid=giphy.gif&ct=s"
                  width="300"
                  alt="img"
                />
                <p className={classes.leaders_text}>

                  Our eco-friends! We are proud of them!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
