import React, { useState, useEffect }  from 'react'
import NavBar from '../components/NavBar'
import { useLocation, Link } from 'react-router-dom'
import './Search.css'
import axios from 'axios'

function Search({Logout}) {

  const backendUrl = 'http://localhost:5000'
  const [currQuery, setCurrQuery] = useState('')
  const { state } = useLocation();
  const { query } = state;
  const [searchType, setSearchType] = useState('Quotes')
  const [searchTypeString, setSearchTypeString] = useState('Search Quotes by Keyword')
  const [results, setResults] = useState([])
  const [lastSearchType, setLastSearchType] = useState('Quotes')
  const [input, setInput] = useState('')
  
  // incoming search from navbar
  useEffect(() => {
    setCurrQuery(query)
    handleSearch()
  }, [])

  // do a search query from navbar search
  const handleSearch = async () => {
    setLastSearchType(searchType)
    if (input !== '') setCurrQuery(input)
    const queryInput = (input !== '') ? input : currQuery
    try {
      const res = await axios.post(`${backendUrl}/search`, {
        query: queryInput,
        queryType: searchType,
      }).then(function (response) {
        // api return -1 for failure
        // input: {query: string, searchType: 'Authors'|'Quotes'}
        if (response.data !== -1) {
          // display query results
          if (searchType === 'Authors') {
            // want a list of [{authorName: ..., authorId: ...}]
            return response.data
          } else {
            // want a list of [{quoteContent:..., quoteId: ..., authorName:..., authorId...}]
            return response.data
          }
        } else {
          console.log(`Search failed for query: ${query}`)
        }
      }).catch(function (error) {
        console.log(error)
      })
      console.log(res)
      setResults(res)
    } catch (e) {
      console.log(e)
    }
  }

  const toggleSearch = (e) => {
    e.preventDefault()
    if (searchType === 'Authors') {
      setSearchType('Quotes')
      setSearchTypeString('Search Quotes by Keyword')
    } else {
      setSearchType('Authors')
      setSearchTypeString('Search for Authors')
    }
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      console.log(currQuery, searchType)
      handleSearch()
    }
  }

  const authorLinkStyle = {
    textDecoration: "none",
    color: 'white',
    width: '30%'
  }

  const quoteLinkStyle = {
    textDecoration: "none",
    color: 'white',
    width: '70%'
  }

  const CustomResults = () => {
    // console.log(results)
    if (results.length === 0) {
      if (lastSearchType === 'Quotes') {
        return <p className='searchP'>Sorry there doesn't seem to be any quotes that fit the criteria...</p>
      } else {
        return <p className='searchP'>Sorry there doesn't seem to be any authors that fit the criteria...</p>
      }
    } else {
      if (lastSearchType === 'Authors') {
        // results: [{authorName: ..., authorId: ...}]
        return results.map(
          (result) => 
            <div class='resultAuthor'> <Link style={authorLinkStyle}
              to={`/author/${result[0]}`}>{result[1]}</Link> </div>
        )
      } else {
        // results: [{quoteContent:..., quoteId: ..., authorName:..., authorId...}]
        return results.map(
          (result) =>
          <div class='resultQuote'> 
            <Link style={quoteLinkStyle} to={`/quote/${result.quoteId}`}>{result.quoteContent}</Link>
            <Link style={authorLinkStyle} to={`/author/${result.authorId}`}>{'- ' + result.authorName}</Link>
          </div>  
        )
      }
    }
  }

  return (
    <div className='searchWrapper'>
      
      <div className='navBarWrapper'>
        <NavBar Logout={Logout} />
      </div>

      <div className='searchBody'>
        <div className='toggleWrapper'>
          <h2> Toggle Search Type: </h2>
          <button onClick={toggleSearch}> {searchType} </button>
        </div>

        <div className='searchDiv'>
          <input class='mainInput' 
          placeholder={searchTypeString}
          onChange={handleChange}
          value={input}
          onKeyDown={handleKeyDownSearch}></input>
          <button onClick={handleSearch}> Search </button>
        </div>
        
        <h1> Displaying results for: {currQuery} </h1>

        <div className='resultsDiv'>
          <CustomResults/>
        </div>
      </div>

    </div>
  )
}

export default Search