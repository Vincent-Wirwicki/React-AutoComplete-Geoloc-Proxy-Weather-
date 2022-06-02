import { useState } from "react";
import { City } from "country-state-city";

import Header from "./components/header/Header";
import Home from "./pages/Home";
import useFetchGeocode from "./components/hooks/useFetchGeocode";
import useGeoloc from "./components/hooks/useGeoloc";
import useFetchReverseGeoloc from "./components/hooks/useFetchReverseGeoloc";
import useFetchWeather from "./components/hooks/useFetchWeather";

const App = () => {
  const [displayCity, setDisplayCity] = useState(null);
  const [isCity, setIsCity] = useState(false);
  const [queryCity, setQueryCity] = useState("Lyon");
  const [queryLat, setQueryLat] = useState("45.7578");
  const [queryLon, setQueryLon] = useState("4.832");
  const [search, setSearch] = useState(null);

  const cityList = City.getAllCities();

  const [{ userLat, userLon }, geoloc] = useGeoloc(setQueryLat, setQueryLon);

  const { userCity } = useFetchReverseGeoloc(
    userLat,
    userLon,
    setDisplayCity,
    setIsCity
  );

  useFetchGeocode(
    queryCity,
    setQueryLat,
    setQueryLon,
    setDisplayCity,
    setIsCity
  );

  const { isLoadingWeather, weatherNotFound, weatherData } = useFetchWeather(
    queryLat,
    queryLon
  );
  // console.log(weatherData);
  return (
    <>
      <Header
        cityList={cityList}
        setSearch={setSearch}
        search={search}
        setQueryCity={setQueryCity}
      />
      <Home
        displayCity={displayCity}
        geoloc={geoloc}
        isCity={isCity}
        isLoadingWeather={isLoadingWeather}
        userCity={userCity}
        search={search}
        setDisplayCity={setDisplayCity}
        weatherNotFound={weatherNotFound}
        weatherData={weatherData}
      />
    </>
  );
};;

export default App;
