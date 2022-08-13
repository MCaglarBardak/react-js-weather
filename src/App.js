import React, { useEffect, useState } from 'react'
import './App.css';
import { usePosition } from 'use-position'
import axios from 'axios';

function App() {

  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();

  const getWetaherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_DATA;
    const lang = navigator.language.split("-"[1]);
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}}`)
      setWeather(data);
      console.log(data)
    }
    catch {
      alert("Herhangi bir konum değeri bulunamadı!")
    }
  }

  useEffect(() => {

    latitude && longitude && getWetaherData(latitude, longitude)
  }, [latitude, longitude])

  if (!weather) {
    return <h2 className='text-center'>Yükleniyor..</h2>
  }
  return (
    <div className="App">
      <img src='images/city.jpg' className='photo'></img>
      <div className='container'>
        <h1 className='weatherText'>Hava Durumu</h1>
        <h3 className='infoText'>Şehir: {weather.name}</h3>
        <h3 className='infoText'>Ülke: {weather.sys.country}</h3>
        <h3 className='infoText'>Enlem: {latitude}</h3>
        <h3 className='infoText'>Boylam: {longitude}</h3>
        <h3 className='infoText'>Hava Sıcaklığı: {Math.ceil(weather.main.temp - 273.15)}</h3>
        <h3 className='infoText'>Durum: {weather.weather.map(data => data.main)}</h3>
        <h3 className='infoText'>Özelliği: {weather.weather.map(data => data.description)}</h3>
      </div>
    </div >
  );
}

export default App;
