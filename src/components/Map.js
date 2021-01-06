import { GoogleMap } from "@react-google-maps/api";

const Map = () => {
  return (
    <div className="map">
      <GoogleMap
        id="map-example"
        mapContainerStyle={{
          height: "600px",
          width: "80%",
        }}
        zoom={13}
        center={{ lat: 53.4808, lng: -2.2462 }}
      ></GoogleMap>
    </div>
  );
};

export default Map;
