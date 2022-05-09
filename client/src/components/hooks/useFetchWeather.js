import { useEffect, useState } from "react";

const useFetchWeather = (lat, lon) => {
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherNotFound, setWeatherNotFound] = useState(true);
  const [weatherData, setWeatherData] = useState([]);

  const getWeather = async (lat, lon) => {
    const res = await fetch(
      `http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`
    );
    if (!res.ok) {
      throw new Error(setWeatherNotFound(true));
    } else {
      const data = res.json();
      return data;
    }
  };

  useEffect(() => {
    setIsLoadingWeather(true);
    const fecthWeather = async () => {
      try {
        const data = await getWeather(lat, lon);
        setWeatherData(data);
        setIsLoadingWeather(false);
        setWeatherNotFound(false);
      } catch {
        setWeatherNotFound(true);
        setIsLoadingWeather(false);
      }
    };
    fecthWeather();
  }, [lat, lon]);

  return { isLoadingWeather, weatherNotFound, weatherData };
};

export default useFetchWeather;
