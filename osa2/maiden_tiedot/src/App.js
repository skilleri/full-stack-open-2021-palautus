import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries.js'

const App = () =>
{
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const countriesToShow = filter === '' ? countries : 
  countries.filter(country => 
    country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() =>
  {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countries={countriesToShow}/>
    </div>
  )
}

export default App
