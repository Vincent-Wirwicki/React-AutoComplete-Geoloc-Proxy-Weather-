import Daily from "../components/home/Daily";
import Current from "../components/home/Current";
import Hourly from "../components/home/Hourly";
import Loader from "../components/utils/Loader";
import "../styles/pages/home.css";
import { useState } from "react";

const Home = ({
  displayCity,
  cityNotFound,
  isLoadingWeather,
  isLoadingCity,
  geoloc,
  userCity,
  userCityNotFound,
  setDisplayCity,
  weatherData,
  weatherNotFound,
}) => {
  const { current, daily, hourly } = weatherData;

  const titles = ["Current", "Hourly", "Daily"];
  const [activeTab, setActiveTab] = useState("Current");

  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };

  const refreshUserCity = () =>
    userCity.length ? setDisplayCity(userCity) : displayCity;

  return (
    <section className="home">
      <div className="home__wrap__city__pos">
        <div className="home__wrap__city__date__text">
          <h1 className="home__city">
            {!cityNotFound || !userCityNotFound
              ? displayCity
              : "No city to show"}
          </h1>
          <p className="home__date">
            {date.toLocaleDateString("en-EN", options)}
          </p>
        </div>
        <img
          src="./svg/position1.svg"
          alt="position"
          className="home__svg__position"
          onClick={() => {
            geoloc();
            refreshUserCity();
          }}
        ></img>
      </div>
      <div className="home__wrap__tab__title">
        {titles.map((title, index) => (
          <button
            key={index}
            onClick={e => setActiveTab(e.target.textContent)}
            className={
              activeTab === title
                ? "home__tab__title__selected"
                : "home__tab__title"
            }
          >
            {title}
          </button>
        ))}
      </div>
      {weatherNotFound ? (
        <div>
          <h3 className="home__no__weather">No weather to show</h3>
          <h3 className="home__no__weather">
            Make a research or click position icon
          </h3>
          <Loader />
        </div>
      ) : !isLoadingWeather ? (
        <>
          {activeTab === "Current" && (
            <article className="home__tab__content__current">
              <Current current={current} />
            </article>
          )}
          {activeTab === "Daily" && (
            <article className="home__tab__content__daily">
              {daily.slice(1).map((day, index) => (
                <Daily key={index} weekDay={day} />
              ))}
            </article>
          )}
          {activeTab === "Hourly" && (
            <article className="home__tab__content__hourly">
              {hourly.map((hour, index) => (
                <Hourly key={index} hour={hour} />
              ))}
            </article>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Home;
