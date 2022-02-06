import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = (filter.length > 0)
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  return (
    <div>
      <h2>Find countries</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Results countries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      name contains
      <input 
        value={filter} 
        onChange={handleFilter}
      />
    </div>
  )
}

const Results = ({countries, setFilter}) => {
  if(countries.length > 10) {
    return(
      <p>too many matches, specify filter</p>
    )
  } else if (countries.length > 1){
    return (
      <div>
        <CountryList countries={countries} setFilter={setFilter}/>
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else {
    return (
      <p>no results</p>
    )
  }
}

const CountryList = ({countries, setFilter}) => {
  return (
    <ul>
      {countries.map(country => 
        <li key={country.name.common}>
          {country.name.common} 
          <button onClick={() => setFilter(country.name.common.toLowerCase())}>
            show</button>
        </li>)}
    </ul>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <Languages languages={Object.values(country.languages)}/>
      <img height='120px' src={country.flags.svg}/>
      <Weather capital={country.capital}/>
    </div>
  )
}

const Languages = ({languages}) => {
  return (
    <ul>
      {languages.map(content => 
        <li key={content}>{content}</li>)}
    </ul>
  )
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [])

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>observation time {weather.observation_time}</p>
      <p><b>temperature:</b> {weather.temperature} Celcius (feels like {weather.feelslike} C)</p>
      <img src={weather.weather_icons}/>
      <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

export default App
