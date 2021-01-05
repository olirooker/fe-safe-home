import React from "react";
import { Link } from "@reach/router";
const Navbar = (props) => {
  return (
    <div className="nav">
      <Link to="/main">
        <button className="navArticlesList navButton">Main</button>
      </Link>{" "}
      <Link to="/user-profile">
        <button className="navNewArticle navButton">User Profile</button>
      </Link>
      <Link to="/travel-advice">
        <button className="navNewArticle navButton">Travel Advice</button>
      </Link>
    </div>
  );
};
export default Navbar;
