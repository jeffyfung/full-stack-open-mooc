import LangaugeDisplay from "./LangaugeDisplay"
import FlagDisplay from "./FlagDisplay"
import { useEffect, useState } from 'react'
import axios from "axios";

const CountryView = ({ targetCountry }) => {

  const [weatherData, setWeatherData] = useState('');
  let lat = targetCountry.capitalInfo?.latlng[0];
  let lon = targetCountry.capitalInfo?.latlng[1];

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(res => {
        console.log(lat);
        console.log(lon);
        setWeatherData(res.data);
      })
      .catch(err => console.log(err));
  }, [])
  
  if (weatherData) {
    return (
      <>
        <h2>{targetCountry.name.common}</h2>
        <div>capital {targetCountry.capital}</div>
        <div>area {targetCountry.area}</div>
  
        <LangaugeDisplay targetCountry={targetCountry}/>

        <FlagDisplay targetCountry={targetCountry}/>
  
        <h2>Weather in {targetCountry.capital[0]}</h2>
        <div>temperature {weatherData.main.temp} Celsius</div>
        <div><WeatherIcon weatherData={weatherData}/></div>
        <div>wind {weatherData.wind.speed} m/s</div>
      </>
    )
  }
  
  return (
    <>
      <h2>{targetCountry.name.common}</h2>
      <div>capital {targetCountry.capital}</div>
      <div>area {targetCountry.area}</div>

      <LangaugeDisplay targetCountry={targetCountry}/>

      <FlagDisplay targetCountry={targetCountry}/>
    </>
  )
}

const WeatherIcon = ({ weatherData }) => {
  if (weatherData) {
    let imgSrc = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    return <img src={imgSrc} alt="weatherIcon"/>
  }
}

export default CountryView