import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({lat, lng, city}) => {
    const baseurl = import.meta.env.VITE_WEATHER_BASE_URL
    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    const exclude = 'minutely,hourly,daily,alerts'
    const [weatherData, setWeatherData] = useState({})

    const fetchWeather = () => {    
      axios
        .get(`https://${baseurl}?lat=${lat}&lon=${lng}&exlude=${exclude}&appid=${api_key}&units=metric`)
        .then(res => {
          setWeatherData({...res.data})
      })
      .catch(err => console.log(err))
    }
    useEffect(fetchWeather, [])

    if (Object.keys(weatherData).length === 0) {
      return <p>Fetching weather data</p>
    }

    return (
      <div>
        <h1>Weather in {city}</h1>
        <p>Temperature {weatherData.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
        <p>Wind {weatherData.wind.speed} m/s</p>
      </div>
    )
}

export default Weather
