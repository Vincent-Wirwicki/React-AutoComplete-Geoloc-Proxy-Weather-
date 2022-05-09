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
  const [queryCity, setQueryCity] = useState();
  const [queryLat, setQueryLat] = useState(null);
  const [queryLon, setQueryLon] = useState(null);
  const [search, setSearch] = useState(null);

  const frenchCity = City.getCitiesOfCountry(
    window.navigator.language.substring(3)
  );

  const [{ userLat, userLon }, geoloc] = useGeoloc(setQueryLat, setQueryLon);

  const { isGeolocLoading, userCity, userCityNotFound } = useFetchReverseGeoloc(
    userLat,
    userLon,
    setDisplayCity
  );

  const { isLoadingCity, cityNotFound } = useFetchGeocode(
    queryCity,
    setQueryLat,
    setQueryLon,
    setDisplayCity
  );

  const { isLoadingWeather, weatherNotFound, weatherData } = useFetchWeather(
    queryLat,
    queryLon
  );

  return (
    <>
      <Header
        cityNotFound={cityNotFound}
        frenchCity={frenchCity}
        setSearch={setSearch}
        search={search}
        setQueryCity={setQueryCity}
      />
      <Home
        displayCity={displayCity}
        cityNotFound={cityNotFound}
        geoloc={geoloc}
        isLoadingCity={isLoadingCity}
        isGeolocLoading={isGeolocLoading}
        isLoadingWeather={isLoadingWeather}
        userCity={userCity}
        userCityNotFound={userCityNotFound}
        setDisplayCity={setDisplayCity}
        weatherNotFound={weatherNotFound}
        weatherData={weatherData}
      />
    </>
  );
};

export default App;
