import './FrontPage.css'
import NavBar from '../components/NavBar.js'
import React, { useEffect, useState } from 'react'


function FrontPage({ Logout, QuoteOfDay }) {

  const [ofTheDay, setOfTheDay] = useState({
    quote: "",
    author: ""
  })

  useEffect(() => QuoteOfDay(setOfTheDay), [])

  return (
    <div>
      <div className='navBarWrapper'> <NavBar Logout={Logout} /> </div>
      
      <div className="top">
            <body>
              <h1>{ofTheDay.quote}</h1>
              <h2>-{ofTheDay.author}</h2>
            </body>
      </div>

      <div className='features'>
      <body>
        <h2>Features</h2>
        <h3>Search for Quotes</h3>
        <p>Find what you're looking for by filtering by author, mood, date, etc.</p>
        <h3>Quote Map / Timeline</h3>
        <p>Visualize quotes with a map or a timeline</p>
      </body>
      </div>
    </div>
    
  )
}



export default FrontPage
