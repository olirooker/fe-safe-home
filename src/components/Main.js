import React from "react";
import { LoadScript } from "@react-google-maps/api";

function Main(props) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return (
    <div className="mainContent">
      <LoadScript
        googleMapsApiKey={API_KEY}
        libraries={["visualization"]}
      ></LoadScript>
    </div>
  );
}

export default Main;
