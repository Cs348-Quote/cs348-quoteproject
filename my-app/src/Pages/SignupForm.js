import React from 'react'
import { Link } from 'react-router-dom'

function SignupForm() {
  return (
    <div>
      <div>SignupForm</div>
      <div>
        <Link to='/login'> Already have an account? </Link>
      </div>
    </div>
  )
}

export default SignupForm