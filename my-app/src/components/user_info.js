import { useContext, useState } from "react";


const useUserDetails = () => {
    const [details, setDetails] = useState({name: '', email: '', password: ''});
    return [details, setDetails]
}

// required props are
// details
// setDetails
export function FormGroup(props) {
    var setDetails = props.setDetails
    var details = props.details
    switch(props.userDetailType) { 
      case 'user':
        return (
          <div className='form-group'>
            <label htmlFor='name'> Username: </label>
            <input type = 'text' name='name' id='name' 
              onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
          </div>
        )
      case 'email':
        return (<div className='form-group'>
        <label htmlFor='email'> Email: </label>
        <input type = 'email' name='email' id='email' 
          onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
      </div>)
      case 'password':
        return (<div className='form-group'>
        <label htmlFor='password'> Password: </label>
        <input type = 'password' name='password' id='password' 
          onChange={e => props.setDetails({...details, password: e.target.value})} value={details.password}/>
      </div>)
    }
  
  }

export function VerifyFormGroup(props) {
    var setDetails = props.setDetails
    var details = props.details
    return (
    <div className="form-group">
        <label>Re-Enter Password</label>
        <input type='password' ></input>
    </div>)
}

export default useUserDetails

