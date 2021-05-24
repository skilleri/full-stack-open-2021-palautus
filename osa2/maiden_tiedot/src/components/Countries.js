import React, {useEffect, useState} from 'react'
import Country from './Country.js'

const Countries = ({countries}) => {
  const [countriesToShow, setCountries] = useState([])

  useEffect(() => {
    setCountries(countries)
  }, [countries])

  if (countriesToShow.length >= 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <Country country={countriesToShow[0]}/>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country => 
          <div key={country.name}>{country.name} 
          <button onClick={() => setCountries([country])}>show
          </button>
          </div>)}
      </div>
    )
  }
}

export default Countries