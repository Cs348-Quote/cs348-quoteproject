import React, {useState} from 'react'
import './LoginForm.css'

function LoginForm({Login, error}) {
  const [details, setDetails] = useState({name: '', email: '', password: ''});

  const handleLogin = e => {
    e.preventDefault();

    Login(details)
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
      </div>
    </form>
  )
}
//TODO: add a signup page - new js file with link

export default LoginForm