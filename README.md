# Weather-React-Geoloc-AutoComplete-Proxy

Weather app made with ReactJs based on [open weather data](https://openweathermap.org/).  

It features : 
  - Geolocalisation
  - Auto-complete search bar
  - Proxy server to hide api key



![open-weather](https://user-images.githubusercontent.com/98763680/167411474-5bf91635-c4c7-477c-9252-592e44578026.png)


[Demo](https://opn-weather.herokuapp.com/)

## features 

Open Weather Api :
  - There are many end points to get data from. I use 3 of them :
    - [One Call](https://openweathermap.org/api/one-call-api) retrive the most data in one call but can only be used with geocode (latitude and longitude)
    - [GeoCoding](https://openweathermap.org/api/geocoding-api) to get a city name from geocode or reverse a geocode to a city name

Backend :

  - Serve react app as a static file
  - Request are made with Axios
  - The response is cached 
  - Api key is hidden in env and don't show on client side
  - Limit request with express-rate-limiter (because free version)

Frontend :

  - User have 2 options to get weather data :
    - Geolocate his/her postion using navigator build in functionalities
    - Search a specific city in search bar
  - Auto complete :
    -  Works with french city
    -  If you click on suggestion make a first query to get geocode then query weather data  
  - Some helper function to convert unix time, kelvin temperature etc
  - Display weather data (current, next 14 hours, 7 days)

## Update

05.07.2022 
  - added custom hooks for some app logic like fetching data or geoloc. 
  - Fixe some ui issues.

 
 

