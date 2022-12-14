import React, { useState, useEffect } from 'react'
import FrontPage from './Pages/FrontPage'
import LoginForm from './Pages/LoginForm'
import SignupForm from './Pages/SignupForm'
import ErrorPage from './Pages/ErrorPage'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import axios from 'axios'
import QuoteCreation from './Pages/QuoteCreation'
import Quote from './Pages/Quote'
import QuoteMap from './Pages/QuoteMap'
import QuoteTimeline from './Pages/QuoteTimeline'

import Author from './Pages/Author'

import Search from './Pages/Search'


export const backendUrl = 'http://localhost:5000'

export default function App() {

  // just for easier testing - remove later
  const adminUser = { email: 'test@test.com', password: 'test'}

  const [user, setUser] = useState({name: '', email: ''})
  const [error, setError] = useState('')
  
  //localStorage.clear()
  // check if user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      console.log(foundUser)
      setUser(foundUser)
    }
  }, [])

  // handle login attempt
  const Login = async (details) => {
    // console.log(details)

    let admin = false
    let success = false

    if (details.email === adminUser.email && details.password === adminUser.password) {
      console.log('Admin logged in')
      setUser({
        name: details.name,
        email: details.email
      })
      // store the user in localStorage
      localStorage.setItem('user', JSON.stringify({ name: details.name, email: details.email}))
      admin = true
      success = true
      return true
    }

    if (!admin) {
      await axios.post(`${backendUrl}/login`, {
        name: details.name,
        email: details.email,
        password: details.password
      })
      .then(function (response) {
        console.log(response)
        if (response.data === 1) {
          success = true
          // Successful login
          console.log(`User ${details.email} logged in`)
          setUser({
            name: details.name,
            email: details.email
          })
          // store the user in localStorage
          localStorage.setItem('user', JSON.stringify({ 
            name: details.name, 
            email: details.email
          }))
        } else {
          console.log(`Login failed for: ${details.email}`)
          setError('Bad Login Credentials!')
        }
      })
      .catch(function (error) {
        console.log(error)
        console.log(`Login failed for: ${details.email}`)
        setError(`Login Failed: ${error}`)
      })
      return success
    }
  }

  const Logout = () => {
    setUser({name: '', email: ''})
    // clear out log in info
    localStorage.removeItem('user')
    console.log('Logout')
  }

  const SignUp = details => {
    axios.post(`${backendUrl}/signup`, {
      name: details.name,
      email: details.email,
      password: details.password
    }).then(function (response) {
      console.log(response)
      if (response.data === 1) {
        // Successful login
        console.log(`User ${details.email} signed up successfully`)
        setUser({
          name: details.name,
          email: details.email
        })
        // store the user in localStorage
        localStorage.setItem('user', JSON.stringify({ name: details.name, email: details.email}))
        
        return true
      } else {
        console.log(`Signup failed for: ${details.email}`)
        setError('Email is not unique!')
      }
    })
    .catch(function (error) {
      console.log(error)
      console.log(`Signup failed for: ${details.email}`)
      setError(`Signup Failed: ${error}`)
    })
  }

  // send country name in backend url
  const fetchAuthors = (country, setMarkers) => {
    axios.get(`${backendUrl}/countries`, { 
      params: { country: country } 
    }).then((response) => {
      /* asks for json list of country authors as:
      [{ authorName: 'bob', coordinates: [lon,lat] }, {authorName: 'joe', ...}...]
      */
      const authorList = response.data
      // might have to useEffect?
      setMarkers(oldMarkers => [...oldMarkers, ...authorList])
    })
  }

  const QuoteOfDay = setOfTheDay => {
    axios.get(`${backendUrl}/random_quote`).then((response) => {
      setOfTheDay({author: response.data.author, quote: response.data.quote})
    })
  }

  const GetQuote = (id, setQuote) => {
    axios.get(`${backendUrl}/quote`, { 
      params: { quote: id } 
    }).then((response) => {
      console.log(response)
      setQuote({
        aid: response.data.aid, 
        author_name: response.data.author_name, 
        quote_content: response.data.quote_content
      })
    })
  }

  return (
    // Pages should be protected by login
    <Router>
      <Routes>
        <Route path='/' element={<FrontPage Logout={Logout} QuoteOfDay={QuoteOfDay}/>}></Route>
        <Route path='/login' element={<LoginForm Login={Login} error={error}/>}></Route>
        <Route path='/signup' element={<SignupForm SignUp={SignUp} />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
        <Route path='/create' element={<QuoteCreation Logout={Logout} />}></Route>
        <Route path="/quote/:id" element={<Quote Logout={Logout} GetQuote={GetQuote}/>}></Route>
        <Route path='/map' element={<QuoteMap Logout={Logout} fetchAuthors={fetchAuthors}/>}></Route>
        <Route path='/timeline' element={<QuoteTimeline Logout={Logout}/>}></Route>
        <Route path='/author/:id' element={<Author Logout={Logout}></Author>}></Route>
        <Route path='/search' element={<Search Logout={Logout} />}></Route>

      </Routes>
    </Router>
  )
}
