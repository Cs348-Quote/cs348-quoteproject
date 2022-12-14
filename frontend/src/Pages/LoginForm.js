import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserDetails, { FormGroup } from '../components/user_info'
import './LoginForm.css'
import '../components/user_info.css'


function LoginForm({Login, error}) {
  const [details, setDetails] = useUserDetails()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const success = await Login(details)
      if (success) navigate('/')
    } catch (e) {
      console.log(e)
    }
  }


  const loginInfo = ['name', 'email', 'password'].map(
    (type)=> <FormGroup userDetailType={type} details={details} setDetails={setDetails}/>)

  return (
    <body>
      <h1 className="header">Quotematic</h1>
      <form onSubmit={handleLogin}>
        <div className = 'form-body'>
          <h1> Login </h1>
        {(error !== '') ? ( <div className='error'> {error} </div> ) : '' }
        
        {loginInfo}
      
        <div className='buttons'>
        <button className='nextButton' type='submit'>Next</button>
          <Link to='/signup'> Create an account </Link>
        </div>
          
        </div>
      </form>
    </body>
  )
}

export default LoginForm