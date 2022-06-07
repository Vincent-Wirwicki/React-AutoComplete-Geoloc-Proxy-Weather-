import { useState, useEffect } from "react";

const useFetchReverseGeoloc = (lat, lon, setDisplayCity, setIsCity) => {
  const [isGeolocLoading, setIsGeolocLoading] = useState(false);
  const [userCity, setUserCity] = useState();
  const [, setIsGeoloc] = useState(false);

  const getGeocode = async (lat, lon) => {
    if (lat !== null && lon !== null) {
      const res = await fetch(`/api/reverse?lat=${lat}&lon=${lon}`);
      if (!res.ok) {
        throw new Error(setIsGeoloc(false));
      } else {
        const data = res.json();
        return data;
      }
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
        setIsCity(true);
        setIsGeolocLoading(false);
      } catch {
        setIsCity(false);
        setIsGeolocLoading(false);
      }
    };
    fecthUserCity();
    setIsGeoloc(false);
  }, [lat, lon, setDisplayCity, setIsCity]);

  return { isGeolocLoading, userCity };
};

export default useFetchReverseGeoloc;
