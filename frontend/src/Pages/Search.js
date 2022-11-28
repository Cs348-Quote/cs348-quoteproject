import React, { useState, useEffect }  from 'react'
import NavBar from '../components/NavBar'
import { useLocation } from 'react-router-dom'
import './Search.css'

function Search({Logout}) {

  const [currQuery, setCurrQuery] = useState('')
  const { state } = useLocation();
  const { query } = state;
  const [searchType, setSearchType] = useState('Search by Author')
  
  // incoming search from navbar
  useEffect(() => setCurrQuery(query), [])

  const toggleSearch = (e) => {
    e.preventDefault()
    if (searchType === 'Search by Author') {
      setSearchType('Search by Keyword')
    } else {
      setSearchType('Search by Author')
    }
  }

  return (
    <div className='searchWrapper'>
      
      <div className='navBarWrapper'>
        <NavBar Logout={Logout} />
      </div>

      <div className='searchBody'>
        <div className='toggleWrapper'>
          <h2> Toggle Search Type: </h2>
          <button onClick={toggleSearch}> {searchType} </button>
        </div>
        <input class='mainInput' placeholder={searchType}></input>
        <h1> Displaying results for: {currQuery} </h1>
      </div>

    </div>
  )
}

export default Search