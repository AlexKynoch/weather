import React from "react";
import axios from "axios"
import { useEffect, useState } from "react"
import Cards from "./Card";
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [latitude, setLatitude] = useState(53.47087);
  const [longitude, setLongitude] = useState(-1.48834);
  const [weather, setWeather] = useState('');
  const [temprature, setTemprature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);

  const [daily, setDaily] = useState([]);

  const [cityName, setCityName] = useState('');
  const [describe, setDescribe] = useState('');

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(position)
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(savePositionToState);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=270c918b01567c04eb8be0de00ccb30f&units=imperial`);
      // const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=270c918b01567c04eb8be0de00ccb30f&units=imperial`);



      // console.log(latitude)
      setTemprature(res.data.current.temp);
      setCityName(res.data.timezone)
      setWeather(res.data.current.weather[0].main);
      setDescribe(res.data.current.weather[0].description);
      setWindSpeed(res.data.current.wind_speed);

      setDaily(res.data.daily)

      console.log(res.data);
      const milliseconds = res.data.current.dt

      const date = new Date(milliseconds * 1000)

      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      // console.log(formattedTime);
      // console.log(date)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather()
  }, [latitude, longitude]);

  // gets ome data : [{day1},{day2}]
  // iterate over that data


  return (
    <div className="App">
      <div className="title">
        <h1>Weather Sheffield</h1>
      </div>
      {/* <div className="app_container">
        <h1>Weather App</h1>
        <h2>{cityName}</h2>
        <h2>{temprature} °F</h2>
        <h2>{weather}</h2>
        <h2>{describe}</h2>
        <h2>{windSpeed} MPH</h2>
      </div> */}
      <div className="row">
        {daily.map((v, i) => {
          return (
            <div className="col-3" key={i}>
              <Cards data={v} id={i} />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
