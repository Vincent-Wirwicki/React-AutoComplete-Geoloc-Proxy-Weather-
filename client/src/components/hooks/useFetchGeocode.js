import { useEffect, useState } from "react";
// import useFetchWeather from "./useFetchWeather";

const useFetchGeocode = (city, setQueryLat, setQueryLon, setDisplayCity) => {
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  // const [cityName, setCityName] = useState(null);

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
        setCityNotFound(false);
        setIsLoadingCity(false);
      } catch {
        setCityNotFound(true);
        setIsLoadingCity(false);
      }
    };
    fetchGeoCode();
  }, [city, setQueryLat, setQueryLon, setDisplayCity]);

  return {
    isLoadingCity,
    cityNotFound,
    // cityName,
  };
};

export default useFetchGeocode;
