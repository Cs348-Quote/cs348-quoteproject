import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginForm.css'

function LoginForm({Login, error}) {
  const [details, setDetails] = useState({name: '', email: '', password: ''});
  const navigate = useNavigate()


  const handleLogin = e => {
    e.preventDefault();

    const success = Login(details)
    
    // redirect successful login to home
    if (success) navigate('/')
  }

  return (
    <form onSubmit={handleLogin}>
      <div className = 'form-body'>
        <h2> Login </h2>
      {(error !== '') ? ( <div className='error'> {error} </div> ) : '' }
        <div className='form-group'>
          <label htmlFor='name'> Username: </label>
          <input type = 'text' name='name' id='name' 
            onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
        </div>
        <div className='form-group'>
          <label htmlFor='email'> Email: </label>
          <input type = 'email' name='email' id='email' 
            onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'> Password: </label>
          <input type = 'password' name='password' id='password' 
            onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
        </div>
        <input type='submit' value='Next'/>
        <Link to='/signup'> Create an account. </Link>
      </div>
    </form>
  )
}

export default LoginForm