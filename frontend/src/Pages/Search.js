import React, { useState, useEffect }  from 'react'
import NavBar from '../components/NavBar'
import { useLocation } from 'react-router-dom'
import './Search.css'

function Search({Logout}) {

  const [currQuery, setCurrQuery] = useState('')
  const { state } = useLocation();
  const { query } = state;
  
  // incoming search from navbar
  useEffect(() => setCurrQuery(query), [])

  return (
    <div className='searchWrapper'>
      
      <div className='navBarWrapper'>
        <NavBar Logout={Logout} />
      </div>

      <div className='searchBody'>
        <h1> Displaying results for: {currQuery} </h1>
      </div>

    </div>
  )
}

export default Search