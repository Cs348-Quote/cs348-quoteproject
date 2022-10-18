// Temporary. Used for profile pic
import logo from '../logo.svg';
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'

function NavBar({ Logout, Authorized }) {

  const navigate = useNavigate()

  const handleLogout = () => {
    Logout()
    // redirect to login
    navigate('/login')
  }

  const logoutButton = <button onClick={handleLogout}>Logout</button>
  const loginButton = <button onClick={() => navigate('/login')}>Login</button>

  const loginOrLogout = Authorized ? logoutButton : loginButton 

  // TODO: fix the logout button alignment
    return (
      <div className='topnav'>
        <div className='left'>
          <Link to='/' > Quote Map </Link>
          <Link to='/'>Quote Timeline</Link>
          <Link to='/'>Quote Feature #3</Link>
        </div>
        <div className='center'><Link to='/'><h2>Quote Explorer</h2></Link></div>
        <div className='right'>
          {loginOrLogout}
          <SearchBar/>
        </div>
        
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