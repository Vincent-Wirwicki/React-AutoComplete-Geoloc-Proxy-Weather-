//m/s to km/h
export const convertToKmH = mps => (mps * 3.6) | 0;
//kelvin to celsius
export const convertToCelsius = kelvin => (kelvin - 273.15) | 0;
//wind degree to compass direction
export const convertToCompass = degree => {
  const val = Math.floor(degree / 22.5 + 0.5);
  const direction = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return direction[val % 16];
};

//convert unix time to human time
export const unixDateComplete = unix =>
  new Date(unix * 1000).toLocaleDateString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
export const unixDateDays = unix =>
  new Date(unix * 1000).toLocaleDateString("en-EN", { weekday: "short" });
export const unixTime = unix =>
  new Date(unix * 1000).toLocaleTimeString([], { hour: "2-digit" });
export const unixTimeComplete = unix =>
  new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
