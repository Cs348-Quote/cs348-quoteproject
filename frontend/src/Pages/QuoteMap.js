import React, { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  useZoomPanContext
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
    if (!countries.includes(country) && country !== "") {
      setCountries(oldCountries => [...oldCountries, country])
      // request for country
      try {
        fetchAuthors(country, setMarkers)
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

  const CustomText = ({authorName}) => {
    const ctx = useZoomPanContext()
  
    const fontSize = 7.8 / ctx.k
    const yDist = 10 / ctx.k
  
    return <text textAnchor='middle' y={yDist} fontSize={fontSize}> {authorName} </text>
  }

  const CustomCircle = () => {
    const ctx = useZoomPanContext()
    const r = 2.25 / ctx.k
    const strokeWidth = 1 / ctx.k

    return <circle r={r} fill='red' stroke='black' stroke-width={strokeWidth}/>
  }

  return (
    <div className='Wrapper'>
      
      <div className='navBarWrapper'>
        <NavBar Logout={Logout}/>
      </div>

      <h2> Explore quote authors from: {countries.join(', ')} </h2>

      <div className='SelectionDiv'>
        <CountryDropdown value={country} onChange={(val) => {setCountry(val)}} />
        <button className='mapButton' onClick={handleDisplayClick}>
          Display Authors!
        </button>
        <button className='mapButton' onClick={handleClear}>
          Clear
        </button>
      </div>

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
              markers.map(({authorName, coordinates, authorID}) => (
                <Marker coordinates={coordinates}>
                <a href={'/author/' + authorID}>
                  <CustomCircle/>
                  <CustomText authorName={authorName}/>
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
