import React, { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import { CountryDropdown } from 'react-country-region-selector';
import NavBar from '../components/NavBar';
import '../Pages/QuoteMap.css'

const geoUrl =
  'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

/*
  Using Cors-anywhere; for dev purposes, requires asking for access here:
    https://cors-anywhere.herokuapp.com/corsdemo
  Read more here:
    https://stackoverflow.com/questions/29670703/how-to-use-cors-anywhere-to-reverse-proxy-and-add-cors-headers
*/


function QuoteMap({Logout, fetchAuthors}) {
  /*
    asks for json list of country authors as:
      [{ authorName: 'bob', coordinates: [lon,lat] }, {authorName: 'joe', ...}...]

    Note: S and W are negative lon and lat
  */  
  const [markers, setMarkers] = useState([])
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  const handleDisplayClick = (e) => {
    e.preventDefault()
    if (!countries.includes(country) && country != "") {
      setCountries(oldCountries => [...oldCountries, country])
      // request for country
      try {
        fetchAuthors(country)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setCountries([])
    // rerender markers
    setMarkers([])
  }

  return (
    <div className='Wrapper'>
      <div className='navBarWrapper'>
        <NavBar Logout={Logout}/>
      </div>
      
      <h1> Explore quote authors on the interactive map! </h1>

      <div className='SelectionDiv'>
        <CountryDropdown value={country} onChange={(val) => {setCountry(val)}} />
        <button onClick={handleDisplayClick}>
          Display Authors!
        </button>
        <button onClick={handleClear}>
          Clear
        </button>
      </div>

      <h2> Currently displaying the authors from: {countries.join(', ')} </h2>

      <div className='Map'>
      <ComposableMap projection='geoMercator'>
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  fill='#429121' stroke='#282b28' strokeWidth={0.5}
                />
              ))
            }
          </Geographies>
          {
            markers.map(({authorName, coordinates}) => (
              <Marker coordinates={coordinates}>
              <a href='/authors/{authorName}'>
                <circle r='1' fill='red' stroke='black' strokewidth={0.4}/>
                <text textAnchor='middle' y={10} fontSize={7.5}> {authorName} </text>
              </a>
              </Marker>
            ))
          }
        </ZoomableGroup>
      </ComposableMap>
    </div>
    </div>
  )
}

export default QuoteMap
