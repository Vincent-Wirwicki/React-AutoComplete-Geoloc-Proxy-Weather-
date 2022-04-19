import { convertToCelsius, unixTime } from "../utils/Helpers";
import "../../styles/components/home/hourly.css";

const Hourly = ({ hour }) => {
  const { temp, weather, dt } = hour;
  const { icon, main } = weather[0];

  return (
    <div className="hourly">
      <div className="hourly__wrap__info">
        <p className="hourly__info__temp">{convertToCelsius(temp)}°</p>
        <p className="hourly__info__desc">{main}</p>
        <p className="hourly__info__time">{unixTime(dt)}</p>
      </div>
      <img
        className="hourly__img"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={`${icon}`}
      />
    </div>
  );
};

export default Hourly;
