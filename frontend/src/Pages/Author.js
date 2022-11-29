import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../App";
import { categories } from "../components/categories";
import NavBar from "../components/NavBar";
import './Author.css'

function Author({Logout}) {
  let { id } = useParams();

  // Data to be displayed on the webpage
  const [authorInfo, setAuthorInfo] = useState({
      author: "CS 348 students",
      description: "tired students",
      url: "http://onemansblog.com/wp-content/uploads/2009/03/university-of-washington.jpg",
      quotes: [{content: "Watch Inside Out. One of the best movies of all time", id:1},
              {content: "This was easy!", id:2},
              {content: "This will only take a moment.", id:3}]
    })

  // Data to be sent back in axios request
  const [request, setRequest] = useState({
    authorId: id,
    sortPopAsc: 'ASC',
    startingIndex: 0,
    nbQuotes: 10,
    categories: 'None'
  })

  const GetAuthorInfo = async (request) => {
    console.log(request)
    try {
      const res = await axios.post(`${backendUrl}/author`, {
        authorId: id,
        sortPopAsc: request.sortPopAsc,
        startingIndex: request.startingIndex,
        nbQuotes: request.nbQuotes,
        categories: request.categories
      }).then(function (response) {
        if (response.data !== -1) {
          console.log(`Author ${request.authorId} info retrieved`)
          return response
        } else {
          console.log(`Failed to retrieve info for Author ${request.id}`)
        }
      })
      console.log(res)
      setAuthorInfo({
        author: res.data.author,
        description: res.data.description,
        url: res.data.url,
        quotes: res.data.quotes
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => async () => {
    await GetAuthorInfo(request)
  }, [])
  
  function Quote({content, id}) {
    return <div className="quote">
        <Link to={`/quotes/${id}`}>{content}</Link>
    </div>
  }

  const CustomQuote = () => {
    if (authorInfo.quotes.length !== 0) {
      return authorInfo.quotes.map(
        (quote) => <Quote content={quote[0]} id={quote[1]}/>
        )
    } else {
      return <p>Sorry there doesn't seem to be any quotes that fit the criteria.</p>
    }
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
        nbQuotes: 10,
        authorId: id,
        startingIndex: 0
    }
  });

  // @blacheo whats the use case for starting index?

  const showCategories = ["None"].concat(categories).map((category) => <option key={category}>{category}</option>)
  const ascDesc = ["ascending", "descending"].map((order) => <option key={order}>{order}</option>)

  return (
      <div className="author">
          <NavBar Logout={Logout}></NavBar>
          <div className="author-info"> 
              <div className="author-text">
                  <h1>{authorInfo.author}</h1>
                  <p>{authorInfo.description}</p>
              </div>
              
              <img src={authorInfo.url} alt='Author'></img>
          </div>
          <h2>Quotes</h2>
          <form onSubmit={handleSubmit(GetAuthorInfo)}>
          <label>Sort by Popularity: <select name="SortPopAsc" {...register("sortPopAsc")}>{ascDesc}</select></label>
          <label>Filter by Category: <select name="Category" {...register("categories")}>{showCategories}</select> </label>
          <label>Number of Quotes per Page: <input type="number" {...register("nbQuotes", {min:1, max:50})} placeholder="10"/></label>
          <input type="reset" value="Reset"/>
          <input type="submit" value="Submit"></input>
          </form>
          <div className="quotes">
             <CustomQuote/>
          </div>
          
      </div>
    )
}

export default Author