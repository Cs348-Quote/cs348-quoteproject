import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserDetails, { FormGroup } from '../components/user_info';
import './LoginForm.css'
import '../components/user_info.css'




function LoginForm({Login, error}) {
  const [details, setDetails] = useUserDetails();
  const navigate = useNavigate()


  const handleLogin = e => {
    e.preventDefault();

    const success = Login(details)
    
    // redirect successful login to home
    if (success) navigate('/')
  }
  const loginInfo = ['name', 'email', 'password'].map(
    (type)=> <FormGroup userDetailType={type} details={details} setDetails={setDetails}/>)

  return (
    <form onSubmit={handleLogin}>
      <div className = 'form-body'>
        <h2> Login </h2>
      {(error !== '') ? ( <div className='error'> {error} </div> ) : '' }
      {loginInfo}
        <button type='submit'>Next</button>
        <Link to='/signup'> Create an account. </Link>
      </div>
    </form>
  )
}

export default LoginForm