// Temporary. Used for profile pic
import logo from '../logo.svg'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

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

  const url = window.location.href
  const urlArray = url.split('/')

  const styleLink = {
    margin: "auto",
    color: "white"
  }

  if (urlArray[urlArray.length - 1] === 'search') {
    return (
      <div className='topnav'>
        <div className='left'>
          <Link to='/map' > Quote Map </Link>
          <Link to='/'>Quote Timeline</Link>
          
        </div>
        <div className='center'><Link to='/'><h2>Quote Explorer</h2></Link></div>
        <div className='right'>
        <Link style={styleLink} to='/create'>Create a Quote</Link>
          {loginOrLogout}
        </div>
        
      </div>
    )
  }

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

    const [searchInput, setSearchInput] = useState('')
    
    const navigate = useNavigate()

    const handleSearchClick = (e) => {
      e.preventDefault()
      if (searchInput !== '') navigate('/search', { state: { query: searchInput } })
    }

    const handleChange = (e) => {
      setSearchInput(e.target.value)
    }

    const handleKeyDownSearch = (e) => {
      if (e.key === 'Enter') {
        if (searchInput !== '') navigate('/search', { state: { query: searchInput } })
      }

    }

    return (
      <div className='SearchBar'>
        <input 
          class='navBarInput'
          type='text'
          placeholder='Search quotes by keyword...'
          id="message"
          name="message"
          onChange={handleChange}
          value={searchInput}
          onKeyDown={handleKeyDownSearch}/>
        <button onClick={handleSearchClick}>Search</button>
      </div>
    )
  }

  export default NavBar