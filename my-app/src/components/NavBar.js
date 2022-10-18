// Temporary. Used for profile pic
import logo from '../logo.svg';
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'

function NavBar({ Logout }) {

  const navigate = useNavigate()

  const handleLogout = () => {
    Logout()
    // redirect to login
    navigate('/login')
  }

  // TODO: fix the logout button alignment
    return (
      <div className='topnav'>
        <Link to='/'> Quote Map </Link>
        <Link to='/'>Quote Timeline</Link>
        <Link to='/'>Quote Feature #3</Link>
        <input type='button' value='Logout' class='right' onClick={handleLogout}/> 
        <SearchBar/>
      </div>
    )
  }
  
  function User() {
    return (
      <div className='dropdown'>
        <p>User1</p>
        <div className='dropdown-option'>
          <a>Settings</a>
        </div> 
      </div>
    )
  }
  
  
  
  function UserImg() {
    return (
      <img src={logo} className='User-Profile-Pic' alt='logo' />
    )
  }
  
  function SearchBar(props) {
    return (
      <div className='SearchBar'>
        <input></input>
        <button>Search</button>
      </div>
    )
  }

  export default NavBar;