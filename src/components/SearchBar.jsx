import { useEffect, useState } from "react";
import WeatherDetails from "./WeatherDetails";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("Delhi");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=8ed568d384cade8aee09ced012f5d2ae`;
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      console.log(data.main);
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        name,
        speed,
        country,
        sunset,
        weatherType,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            placeholder="Search city..."
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="searchButton" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      <WeatherDetails {...tempInfo} />
    </>
  );
}

export default SearchBar;
