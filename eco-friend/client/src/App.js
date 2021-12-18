import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { checkUserAuthThunk, getImg, getRating } from "./store/user/actions";
import { mapFetchThunk } from "./store/map/actions";
import { getAllEntriesThunk } from "./store/entry/actions";

import "./App.css";
import "antd/dist/antd.css";

import Header from "./components/Header/Header";
import Blog from "./components/Blog/Blog";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Map from "./components/Map/Map";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Logout from "./components/Auth/Logout";
import UserProfile from "./components/Account/UserProfile";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.user?.id);

  useEffect(() => {
    dispatch(mapFetchThunk());
    dispatch(checkUserAuthThunk());
    dispatch(getAllEntriesThunk());
    dispatch(getImg(userId));
    dispatch(getRating(userId));
  });
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/signup" element={!userId && <Signup />} />
        <Route path="/signin" element={!userId && <Signin />} />
        <Route path="/logout" element={userId && <Logout />} />
        <Route path="/account" element={userId && <UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
