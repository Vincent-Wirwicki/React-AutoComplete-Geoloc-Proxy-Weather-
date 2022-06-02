import { useEffect, useState } from "react";

const useFetchGeocode = (
  city,
  setQueryLat,
  setQueryLon,
  setDisplayCity,
  setIsCity
) => {
  const [, setIsLoadingCity] = useState(false);
  const [, setCityNotFound] = useState(false);

  const getGeocode = async city => {
    const res = await fetch(`http://localhost:5000/api/direct?q=${city}`);
    if (!res.ok) {
      throw new Error(setCityNotFound(true));
    } else {
      const data = res.json();
      return data;
    }
  };

  useEffect(() => {
    setIsLoadingCity(true);
    const fetchGeoCode = async () => {
      try {
        const cityData = await getGeocode(city);
        const { name, lat, lon } = cityData[0];
        setDisplayCity(name);
        setQueryLat(lat);
        setQueryLon(lon);
        setIsCity(true);
        setIsLoadingCity(false);
      } catch {
        setIsCity(false);
        setIsLoadingCity(false);
      }
    };
    fetchGeoCode();
  }, [city, setQueryLat, setQueryLon, setDisplayCity, setIsCity]);

  return;
};

export default useFetchGeocode;
