// Temporary. Used for profile pic
import logo from '../logo.svg'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'

function NavBar({ Logout }) {

  const navigate = useNavigate()

  const handleLogout = () => {
    Logout()
    // redirect to login
    navigate('/login')
  }

  const logoutButton = <button onClick={handleLogout}>Logout</button>
  const loginButton = <button onClick={() => navigate('/login')}>Login</button>
  
  // remove authorized from props and calculate locally for component
  // bug where redirect to front page without setting authorized
  const Authorized = (localStorage.getItem('user')) ? true : false
  const loginOrLogout = Authorized ? logoutButton : loginButton 

    return (
      <div className='topnav'>
        <div className='left'>
          <Link to='/map' > Quote Map </Link>
          <Link to='/'>Quote Timeline</Link>
          <Link to='/create'>Create a Quote</Link>
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

    const handleSearchClick = (e) => {
      e.preventDefault();

    }

    return (
      <div className='SearchBar'>
        <input placeholder='Search by author...'></input>
        <button onClick={handleSearchClick}>Search</button>
      </div>
    )
  }

  export default NavBar