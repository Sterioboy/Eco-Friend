import React from "react";
import AllEntries from "./AllEntries";
import News from "./News";

import classes from "./Blog.module.css";

const Blog = () => {
  return (
    <div className={classes.Blog}>
      <div className={classes.entries_blocks}>
      <AllEntries />
      <News/>
      </div>
    </div>
  );
};
export default Blog;
