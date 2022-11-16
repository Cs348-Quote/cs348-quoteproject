import React, { useState, useEffect } from 'react'
import FrontPage from './Pages/FrontPage'
import LoginForm from './Pages/LoginForm'
import SignupForm from './Pages/SignupForm'
import ErrorPage from './Pages/ErrorPage'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios, { AxiosHeaders } from 'axios'
import QuoteCreation from './Pages/QuoteCreation'


export default function App() {

  // just for easier testing - remove later
  const adminUser = { email: 'test@test.com', password: 'test'}

  const backendUrl = 'http://localhost:5000'
  const [user, setUser] = useState({name: '', email: ''})
  const [error, setError] = useState('');
  
  //localStorage.clear()
  // check if user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, []);

  // handle login attempt
  const Login = details => {
    // console.log(details)

    let admin = false;

    if (details.email === adminUser.email && details.password === adminUser.password) {
      console.log('Admin logged in')
      setUser({
        name: details.name,
        email: details.email
      })
      // store the user in localStorage
      localStorage.setItem('user', JSON.stringify({ name: details.name, email: details.email}))
      admin = true
      return true
    }

    if (!admin) {
      axios.post(`${backendUrl}/login`, {
        name: details.name,
        email: details.email,
        password: details.password
      })
      .then(function (response) {
        console.log(response);
        if (response.data === 1) {
          // Successful login
          console.log(`User ${details.name} logged in`)
          setUser({
            name: details.name,
            email: details.email
          })
          // store the user in localStorage
          localStorage.setItem('user', JSON.stringify({ name: details.name, email: details.email}))
          
          return true
        } else {
          console.log(`Login failed for: ${details.name}`)
          setError('Bad Login Credentials!')
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(`Login failed for: ${details.name}`)
        setError(`Login Failed: ${error}`)
      });
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
      console.log(response);
      if (response.data === 1) {
        // Successful login
        console.log(`User ${details.name} signed up successfully`)
        setUser({
          name: details.name,
          email: details.email
        })
        // store the user in localStorage
        localStorage.setItem('user', JSON.stringify({ name: details.name, email: details.email}))
        
        return true
      } else {
        console.log(`Signup failed for: ${details.name}`)
        setError('Email is not unique!')
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log(`Signup failed for: ${details.name}`)
      setError(`Signup Failed: ${error}`)
    });

    const CreateQuote = quoteDetails => {
      
    }
  }

  const QuoteOfDay = (setOfTheDay) => {
    axios.get(`${backendUrl}/random_quote`).then((response) => {
      setOfTheDay(response.data)
    })
  }
  // only render front page if logged in
  return (
    // <div className='App'>
    //   {(user.email !== '') ? (
    //     <div className='FrontPage'>
    //       <FrontPage Logout={Logout}/>
    //     </div>
    //   ) : (
    //     <LoginForm Login={Login} error={error} />
    //   )}
    // </div>

    // Pages should be protected by login
    <Router>
      <Routes>
        <Route path='/' element={<FrontPage Logout={Logout} Authorized={(localStorage.getItem('user')) ? true : false} QuoteOfDay={QuoteOfDay}/>}></Route>
        <Route path='/login' element={<LoginForm Login={Login} error={error}/>}></Route>
        <Route path='/signup' element={<SignupForm SignUp={SignUp} />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
        <Route path='/create' element={<QuoteCreation/>}></Route>
      </Routes>
    </Router>
  )
}
