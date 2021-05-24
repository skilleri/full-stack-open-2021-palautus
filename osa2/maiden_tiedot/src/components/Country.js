import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [temperature, setTemperature] = useState(0)
  const [feelsLike, setFeelsLike] = useState(0)
  const [wind, setWind] = useState(0)

  const api_key = process.env.REACT_APP_API_KEY
  const query = 'http://api.openweathermap.org/data/2.5/weather?q=' 
  + country.capital + '&appid=' + api_key

  console.log(query)

  useEffect(() =>
  {
    axios
      .get(query)
      .then(response => {
        setTemperature(Math.round((response.data.main.temp - 273.15) * 10) / 10)
        setFeelsLike(Math.round(
          (response.data.main.feels_like - 273.15) * 10) / 10)
        setWind(response.data.wind.speed)
      })
  }, [query])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => 
        <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="200"/>
      <h2>Weather in {country.capital}</h2>
      <div>Temperature: {temperature} °C</div>
      <div>Feels like: {feelsLike} °C</div>
      <div>Wind speed: {wind} m/s</div>
    </div>
  )
}

export default Country