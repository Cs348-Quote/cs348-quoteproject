import React, { useState } from 'react'
import FrontPage from './FrontPage'
import LoginForm from './components/LoginForm'
import './App.css'


export default function Login() {
  // move to db
  const adminUser = {
    email: 'test@test.com',
    password: 'test123'
  }
 
  const [user, setUser] = useState({name: '', email: ''})
  const [error, setError] = useState('');
  
  // handle login attempt
  const Login = details => {
    // console.log(details)

    // TODO: replace this with api call to backend - axios? - remove this admin user stuff
    if (details.email === adminUser.email && details.password === adminUser.password) {
      console.log('Admin logged in')
      setUser({
        name: details.name,
        email: details.email
      })
      // Replace with regular user login
    } else {
      console.log('Login failed')
      setError('Bad Login Credentials!')
    }
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

