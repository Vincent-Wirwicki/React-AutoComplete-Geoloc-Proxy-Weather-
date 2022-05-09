import { useState, useEffect } from "react";

const useFetchReverseGeoloc = (lat, lon, setDisplayCity) => {
  const [isGeolocLoading, setIsGeolocLoading] = useState(false);
  const [userCity, setUserCity] = useState();
  const [userCityNotFound, setUserCityNotFound] = useState(true);
  const [, setIsGeoloc] = useState(false);

  const getGeocode = async (lat, lon) => {
    const res = await fetch(
      `http://localhost:5000/api/reverse?lat=${lat}&lon=${lon}`
    );
    if (!res.ok) {
      throw new Error(setIsGeoloc(false));
    } else {
      const data = res.json();
      return data;
    }
  };

  useEffect(() => {
    setIsGeolocLoading(true);
    const fecthUserCity = async () => {
      try {
        const userData = await getGeocode(lat, lon);
        const { name } = userData[0];
        setDisplayCity(name);
        setUserCity(name);
        setUserCityNotFound(false);
        setIsGeolocLoading(false);
      } catch {
        setUserCityNotFound(true);
        setIsGeolocLoading(false);
      }
    };
    fecthUserCity();
    setIsGeoloc(false);
  }, [lat, lon, setDisplayCity]);

  return { isGeolocLoading, userCity, userCityNotFound };
};

export default useFetchReverseGeoloc;
