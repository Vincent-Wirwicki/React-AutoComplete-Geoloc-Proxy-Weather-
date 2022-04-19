// import { WiSunrise, WiSunset } from "weather-icons-react";
import {
  convertToCelsius,
  convertToCompass,
  convertToKmH,
} from "../utils/Helpers";
import "../../styles/components/home/current.css";

const Current = ({ current }) => {
  const { humidity, pressure, temp, weather, wind_deg, wind_speed } = current;
  const { icon, description } = weather[0];

  return (
    <article className="current">
      <div className="current__wrap__temp__icon">
        <div className="current__wrap__temp__text">
          <p className="current__temp__deg">
            <span className="current__temp__deg__value">
              {convertToCelsius(temp)}
            </span>
            <span className="current__temp__deg__symbol">°</span>
          </p>
          <p className="current__description">{description}</p>
        </div>
        <img
          className="current__icon"
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={icon}
        />
      </div>
      <div className="current__wrap__desc">
        {/* <div className="current__wrap__all__sun__icons">
          <div className="current__wrap__sun__icons">
            <p>
              <WiSunrise size={28} className="" />
            </p>
            <p className="current__sun__text">{unixTimeComplete(sunrise)}</p>
          </div>
          <div className="current__wrap__sun__icons">
            <p className="">
              <WiSunset size={28} className="" />
            </p>
            <p className="current__sun__text">{unixTimeComplete(sunset)}</p>
          </div>
        </div> */}
      </div>

      <div className="current__wrap__details">
        <div className="current__wrap__details__category">
          <div className="current__wrap__details__inline">
            <p className="current__inline__text">Wind :</p>
            <p className="current__inline__text">
              {convertToKmH(wind_speed)} km/h
            </p>
          </div>
          <div className="current__wrap__details__inline">
            <p className="current__inline__text">Direction :</p>
            <p className="current__inline__text">
              {convertToCompass(wind_deg)}
            </p>
          </div>
          <div className="current__wrap__details__inline">
            <p className="current__inline__text">Humidity :</p>
            <p className="current__inline__text">{humidity} %</p>
          </div>
          <div className="current__wrap__details__inline">
            <p className="current__inline__text">Pressure :</p>
            <p className="current__inline__text">{pressure} hPa</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Current;
