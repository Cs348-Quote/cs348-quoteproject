import React, { useState } from 'react'
import FrontPage from './FrontPage'
import LoginForm from './components/LoginForm'
import './App.css'
import axios from 'axios'


export default function Login() {

  
  const backendUrl = 'http://localhost:5000'
  const [user, setUser] = useState({name: '', email: ''})
  const [error, setError] = useState('');
  
  // handle login attempt
  const Login = details => {
    // console.log(details)

    // if (details.email === adminUser.email && details.password === adminUser.password) {
    //   console.log('Admin logged in')
    //   setUser({
    //     name: details.name,
    //     email: details.email
    //   })
    //   // Replace with regular user login
    // } else {
    //   console.log('Login failed')
    //   setError('Bad Login Credentials!')
    // }

    axios.post(`${backendUrl}/login`, {
      name: details.name,
      email: details.email,
      password: details.password
    })
    .then(function (response) {
      console.log(response);
      if (response.data === 'success') {
        console.log(`User ${details.name} logged in`)
        setUser({
          name: details.name,
          email: details.email
        })
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

  const Logout = () => {
    setUser({name: '', email: ''})
  }

  // only render front page if logged in
  return (
    <div className='App'>
      {(user.email !== '') ? (
        <div className='FrontPage'>
          <FrontPage Logout={Logout}/>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  )
}

