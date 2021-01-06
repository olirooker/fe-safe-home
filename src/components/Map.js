import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { useRef, useEffect, useState } from "react";
import { modeNightStyle, modeDayStyle } from "./styles/MapNightMode";
import { useDarkMode } from "./useDarkMode";

const Map = (props) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [theme] = useDarkMode();
  //const [centre, setCentre] =
  const getOrigin = useRef("");
  const getDestination = useRef("");
  const localTheme = window.localStorage.getItem("theme");
  //   useEffect(() => {
  //     console.log(localTheme, "localTheme");
  //   }, [localTheme]);
  const onClick = () => {
    setOrigin(getOrigin.current.value);
    setDestination(getDestination.current.value);
  };
  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      } else {
        console.log(response, "response");
      }
    }
  };
  console.log(theme, "theme");
  return (
    <div className="map">
      <div className="map-settings">
        <hr className="mt-0 mb-3" />

        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="ORIGIN">Origin</label>
              <br />
              <input
                id="ORIGIN"
                className="form-control"
                type="text"
                ref={getOrigin}
                placeholder="current location"
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="DESTINATION">Destination</label>
              <br />
              <input
                id="DESTINATION"
                className="form-control"
                type="text"
                ref={getDestination}
              />
            </div>
          </div>
        </div>

        <button className="btn btn-primary" type="button" onClick={onClick}>
          Build Route
        </button>
      </div>
      <div className="map-container">
        <GoogleMap
          id="map-example"
          mapContainerStyle={{
            height: "150px",
            width: "100%",
          }}
          zoom={13}
          center={{ lat: 53.4808, lng: -2.2462 }}
          options={
            props.theme === "light"
              ? { styles: modeDayStyle }
              : { styles: modeNightStyle }
          }
        >
          {destination !== "" && origin !== "" && (
            <DirectionsService
              options={{ destination, origin, travelMode: "WALKING" }}
              callback={directionsCallback}
            />
          )}
          {response !== null && (
            <DirectionsRenderer options={{ directions: response }} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
