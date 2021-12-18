import React from "react";
import { Link } from "react-router-dom";

const WelcomeComponent = () => {
  return (
    <div>
      <h3>Welcome</h3>
      <p>
        if you want to comment and add points to the map, please{" "}
        <Link to="/signip"> signin</Link> or
        <Link to="/signup"> signup</Link> right now.
      </p>
    </div>
  );
};
export default WelcomeComponent;
