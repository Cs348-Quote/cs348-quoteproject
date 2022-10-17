import React, { useState, useEffect } from 'react'
import FrontPage from './FrontPage'
import LoginForm from './components/LoginForm'
import './App.css'
import axios from 'axios'


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
      admin = true;
    }

    if (!admin) {
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
          // store the user in localStorage
          localStorage.setItem('user', JSON.stringify({ name: details.name, email: details.email}))
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
