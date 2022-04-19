import Daily from "../components/home/Daily";
import Current from "../components/home/Current";
import Hourly from "../components/home/Hourly";
import Loader from "../components/utils/Loader";
import "../styles/pages/home.css";
import { useState } from "react";

const Home = ({ city, geoloc, isLoading, weatherData }) => {
  const { current, daily, hourly } = weatherData;

  const titles = ["Current", "Hourly", "Daily"];
  const [activeTab, setActiveTab] = useState("Current");

  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };

  return (
    <section className="home">
      <div className="home__wrap__city__pos">
        <div className="home__wrap__city__date__text">
          <h1 className="home__city">{!isLoading ? city : "city"}</h1>
          <p className="home__date">
            {date.toLocaleDateString("en-EN", options)}
          </p>
        </div>
        <img
          src="./svg/position1.svg"
          alt="position"
          className="home__svg__position"
          onClick={geoloc}
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
      {!isLoading ? (
        <>
          {activeTab === "Current" && (
            <article className="home__tab__content__current">
              <Current current={current} isLoading={isLoading} />
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
