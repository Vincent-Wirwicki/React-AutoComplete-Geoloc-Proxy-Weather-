import { convertToCelsius, unixDateDays } from "../utils/Helpers";
import "../../styles/components/home/daily.css";

const Daily = ({ weekDay }) => {
  const { temp, dt, weather } = weekDay;
  const { max, min } = temp;
  const { icon, main } = weather[0];

  return (
    <div className="daily">
      <div className="daily__wrap__text">
        <p className="daily__temp__text">
          {convertToCelsius(min)}° - {convertToCelsius(max)}°
        </p>
        <p className="daily__desc__text">{main}</p>
        <p className="daily__date__text">{unixDateDays(dt)}</p>
      </div>
      <img
        className="daily__img"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt=""
      />
    </div>
  );
};

export default Daily;
