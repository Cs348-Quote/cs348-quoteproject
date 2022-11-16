import './FrontPage.css'
import NavBar from '../components/NavBar.js'
import { Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

/*

<body>
              <h1>{{quoteOfTheDay}}</h1>
              <h2>{{authorOfTheDay}}</h2>
            </body>

*/


function FrontPage({ Logout, Authorized, QuoteOfDay }) {
  const [ofTheDay, setOfTheDay] = useState({
    quote: "Insert Quote Here",
    author: "Insert Author Here"
  })

  useEffect(() => QuoteOfDay(setOfTheDay), [])

  return (
    <div>
      <NavBar Logout={Logout} Authorized={Authorized}/>
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
    
  );
}



export default FrontPage;
