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
          console.log(weatherData)
      })
      .catch(err => console.log(err))
    }
    useEffect(fetchWeather, [])

    return (
      <div>
        <h1>Weather in {city}</h1>
        <p>Temperature {weatherData.temp} Celsius</p>
        <p>PIC HERE</p>
        <p>Wind 0 m/s</p>
      </div>
    )
}

export default Weather
