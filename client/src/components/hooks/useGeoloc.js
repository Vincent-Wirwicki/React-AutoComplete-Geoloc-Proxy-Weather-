import { useState } from "react";

const useGeoloc = (setQueryLat, setQueryLon) => {
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  // const [isGeoloc, setIsGeoloc] = useState(false);

  const success = position => {
    const { coords } = position;
    const { latitude, longitude } = coords;
    setQueryLat(latitude);
    setUserLat(latitude);
    setUserLon(longitude);
    setQueryLon(longitude);
  };

  const error = err => {
    // setIsGeoloc(true);
    console.log(err);
  };

  const geoloc = () => navigator.geolocation.getCurrentPosition(success, error);

  return [{ userLat, userLon }, geoloc];
};

export default useGeoloc;
