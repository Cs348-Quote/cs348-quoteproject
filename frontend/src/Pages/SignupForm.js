import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserDetails, { FormGroup } from '../components/user_info'
import '../components/user_info.css'

function SignupForm({SignUp}) {
  const navigate = useNavigate()
  const [details, setDetails] = useUserDetails()
  const signupEntry = ['user', 'email', 'password'].map(
    (type)=> <FormGroup userDetailType={type} key={type} details={details} setDetails={setDetails}/>)

    const handleSignUp = e => {
      e.preventDefault()
  
      const success = SignUp(details)
      
      // redirect successful login to home
      if (success) navigate('/')
    }
  return (
    <div>
        <form onSubmit={handleSignUp} >
          <div  className = 'form-body'>
          <h2>Signup Form</h2>
          {signupEntry}
          <div className='buttons'>
            <button type='submit'>Next</button>
            <Link to='/login'> Already have an account? </Link>
          </div>
          
          </div>
     
        
    
        </form>
      
    </div>
  )
}

export default SignupForm