// Temporary. Used for profile pic
import logo from './logo.svg';
import './NavBar.css'

function NavBar({ Logout }) {

  const handleLogout = () => {
    Logout()
  }

  // TODO: fix the logout button alignment
    return (
      <div className='topnav'>
        <a href='#'>Quote Map</a>
        <a href='#'>Quote Timeline</a>
        <a href='#'>Quote Feature #3</a>
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