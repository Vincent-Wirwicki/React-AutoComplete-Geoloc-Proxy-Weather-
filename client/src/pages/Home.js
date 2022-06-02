import Daily from "../components/home/Daily";
import Current from "../components/home/Current";
import Hourly from "../components/home/Hourly";
import Loader from "../components/utils/Loader";
import "../styles/pages/home.css";
import { useState } from "react";

const Home = ({
  displayCity,
  isCity,
  isLoadingWeather,
  geoloc,
  userCity,
  search,
  setDisplayCity,
  weatherData,
  weatherNotFound,
}) => {
  const { current, daily, hourly } = weatherData;

  const titles = ["Current", "Hourly", "Week"];
  const [activeTab, setActiveTab] = useState("Current");

  const refreshUserCity = () =>
    userCity !== undefined || userCity.length > 0
      ? setDisplayCity(userCity)
      : displayCity;

  return (
    <section className="home">
      <div className="home__wrap__city__pos">
        <h1 className="home__city">{isCity ? displayCity : "No city :("}</h1>
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
          <h3 className="home__no__weather">Make a research or</h3>
          <h3 className="home__no__weather">click position icon</h3>
          <Loader />
        </div>
      ) : !isCity ? (
        <h3 className="home__no__city">
          <span className="home__no__city__span">{search}</span> not found
        </h3>
      ) : !isLoadingWeather ? (
        <>
          {activeTab === "Current" && (
            <article className="home__tab__content__current">
              <Current current={current} />
            </article>
          )}
          {activeTab === "Week" && (
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
