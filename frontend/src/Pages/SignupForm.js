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
      <div>SignupForm</div>
        <form onSubmit={handleSignUp}>
          {signupEntry}
          <button type='submit'>Next</button>
        </form>
      <div>
        <Link to='/login'> Already have an account? </Link>
      </div>
    </div>
  )
}

export default SignupForm