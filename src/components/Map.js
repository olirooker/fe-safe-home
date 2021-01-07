import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  DirectionsService,
  HeatmapLayer,
  DistanceMatrixService,
} from "@react-google-maps/api";
import { useRef, useEffect, useState } from "react";
import { modeNightStyle, modeDayStyle } from "./styles/MapNightMode";
import Loading from "./Loading";
import HomeIcon from "../icons/HomeIcon.png";

const Map = (props) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [centre, setCentre] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [messageError, setMessage] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [route, setRoute] = useState(false);
  const getOrigin = useRef("");
  const getDestination = useRef("");

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        setLocation();
      } else {
        setError(true);
        setMessage("Your browser needs access to your location");
      }
    });
  }, []);

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCentre({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setOrigin({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLoading(false);
    });
  };

  const onClick = () => {
    if (getOrigin.current.value === "") {
      setOrigin(centre);
    } else {
      setOrigin(getOrigin.current.value);
    }
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

  const callbackDistanceService = (response, status) => {
    if (status === "OK" && response) {
      console.log("status");
      console.log("response", response);
      //   setDuration(response.rows[0].elements[0].duration.text);
      //   setDistance(response.rows[0].elements[0].distance.text);
      //   setRoute(true);
    }
  };

  return (
    <div className="map">
      {hasError && <p>{messageError}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="map-container">
          <GoogleMap
            id="direction-example"
            mapContainerStyle={{
              height: "150px",
              width: "100%",
            }}
            zoom={13}
            center={centre}
            options={
              props.theme === "light"
                ? { styles: modeDayStyle }
                : { styles: modeNightStyle }
            }
          >
            <Marker position={centre} />
            {destination !== "" && origin !== "" && (
              <DirectionsService
                options={{ destination, origin, travelMode: "WALKING" }}
                callback={directionsCallback}
              />
            )}
            {response !== null && (
              <DirectionsRenderer options={{ directions: response }} />
            )}
            <HeatmapLayer
              data={[
                new window.google.maps.LatLng(37.782, -122.447),
                new window.google.maps.LatLng(37.782, -122.445),
                new window.google.maps.LatLng(37.782, -122.443),
                new window.google.maps.LatLng(37.782, -122.441),
                new window.google.maps.LatLng(37.782, -122.439),
                new window.google.maps.LatLng(37.782, -122.437),
                new window.google.maps.LatLng(37.782, -122.435),
                new window.google.maps.LatLng(37.785, -122.447),
                new window.google.maps.LatLng(37.785, -122.445),
                new window.google.maps.LatLng(37.785, -122.443),
                new window.google.maps.LatLng(37.785, -122.441),
                new window.google.maps.LatLng(37.785, -122.439),
                new window.google.maps.LatLng(37.785, -122.437),
                new window.google.maps.LatLng(37.785, -122.435),
              ]}
            />
            <DistanceMatrixService
              options={{
                destinations: [destination],
                origins: [origin],
                travelMode: "WALKING",
              }}
              callback={callbackDistanceService}
            />
          </GoogleMap>
        </div>
      )}
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
        {route && (
          <p>
            Duration: {duration}, Distance: {distance}
          </p>
        )}
      </div>
    </div>
  );
};

export default Map;
