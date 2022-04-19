import { useState, useEffect } from "react";
import { City } from "country-state-city";

import Error from "./pages/Error";
import Header from "./components/header/Header";
import Home from "./pages/Home";

const App = () => {
  //prevent loading html before api response
  const [isLoading, setIsLoading] = useState(true);
  //error catcher
  const [isError, setIsError] = useState(false);
  const [, setErrorMsg] = useState(null);
  //boolean if a city is fetch
  const [isCity, setIsCity] = useState(false);
  //boolean if the query have longitude and latitude value on
  const [isGeoCode, setIsGeoCode] = useState(false);
  //boolean if the query have longitude and latitude value on
  const [userGeoloc, setUserGeoloc] = useState(false);
  //string search bar input
  const [queryInput, setQueryInput] = useState(null);
  //string city query
  const [queryCity, setQueryCity] = useState(null);
  //number latitude from a query
  const [queryLat, setQueryLat] = useState(null);
  //number longitude from a query
  const [queryLon, setQueryLon] = useState(null);
  //object api response with all weather data in one call
  const [weatherData, setWeatherData] = useState([]);
  //string city from where data are displayed
  const [city, setCity] = useState(null);

  // all french city to help auto-complete
  const frenchCity = City.getCitiesOfCountry(
    window.navigator.language.substring(3)
  );

  // navigator.geoloc if user accept
  const success = position => {
    const { coords } = position;
    const { latitude, longitude } = coords;
    setQueryLon(longitude);
    setQueryLat(latitude);
    setUserGeoloc(true);
  };

  // navigator.geoloc if user refuse
  const error = err => {
    console.log(err);
    setUserGeoloc(false);
  };

  // get user geoloc, use in Header compenents onClick event
  const geoloc = () => navigator.geolocation.getCurrentPosition(success, error);

  //fetch geocode from a city query
  const fetchGeoCodeFromCity = async city => {
    const res = await fetch(`http://localhost:5000/api/direct?q=${city}`);
    const data = res.json();
    return data;
  };

  //fetch city from a geocode
  const fetchCityFromGeoCode = async (lat, lon) => {
    const res = await fetch(
      `http://localhost:5000/api/reverse?lat=${lat}&lon=${lon}`
    );
    const data = res.json();
    return data;
  };

  //fetch weather data with with geocode
  const fetchDataFromGeocode = async (lat, lon) => {
    const res = await fetch(
      `http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`
    );
    const data = res.json();
    return data;
  };
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const getGeoCodeFromCity = async () => {
      const geocode = await fetchGeoCodeFromCity(queryCity);
      console.log(geocode);
      setIsCity(false);
      setCity(geocode[0].name);
      setQueryLat(geocode[0].lat);
      setQueryLon(geocode[0].lon);
      setIsGeoCode(true);
    };

    const getCityFromGeoCode = async () => {
      const cityName = await fetchCityFromGeoCode(queryLat, queryLon);
      setUserGeoloc(false);
      setCity(cityName[0].name);
      setIsGeoCode(true);
    };

    const getDataOpenWeather = async () => {
      const openWeather = await fetchDataFromGeocode(queryLat, queryLon);
      setIsGeoCode(false);
      setWeatherData(openWeather);
      setIsLoading(false);
    };

    try {
      isCity && getGeoCodeFromCity();
      userGeoloc && getCityFromGeoCode();
      isGeoCode && getDataOpenWeather();
    } catch (err) {
      console.log("error fetch", err);
      setIsError(true);
      setErrorMsg(err);
    }
  }, [queryLat, queryLon, queryCity, isGeoCode, isCity, userGeoloc]);

  const searchCity = e => setQueryInput(e.target.value);
  const selectInList = e => setQueryInput(e.target.textContent);
  const clearSearch = () => setQueryInput("");
  const getGeoCode = () => {
    setQueryCity(queryInput);
    setIsCity(true);
  };

  console.log(weatherData);

  return isError ? (
    <Error />
  ) : (
    <div>
      <Header
        clearSearch={clearSearch}
        frenchCity={frenchCity}
        getGeoCode={getGeoCode}
        queryInput={queryInput}
        searchCity={searchCity}
        selectInList={selectInList}
      />
      <Home
        city={city}
        geoloc={geoloc}
        isLoading={isLoading}
        weatherData={weatherData}
      />
    </div>
  );
};

export default App;
