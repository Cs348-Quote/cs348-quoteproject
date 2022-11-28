import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../App";
import { categories } from "../components/categories";
import NavBar from "../components/NavBar";
import './Author.css'

function Quote({content, id}) {
    return <div className="quote">
        <Link to={`/quotes/${id}`}>{content}</Link>
    </div>
}

function Author({Logout}) {
    let { id } = useParams();
    const defaultNbQuotes = 20
    const [authorInfo, setAuthorInfo] = useState({
        author: "CS 348 students",
        description: "tired students",
        url: "http://onemansblog.com/wp-content/uploads/2009/03/university-of-washington.jpg",
        quotes: [{content: "Watch Inside Out. One of the best movies of all time", id:1},
                {content: "This was easy!", id:2},
                {content: "This will only take a moment.", id:3}]
      })

      useEffect(() => GetAuthorInfo(setAuthorInfo), [])

      const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            nbQuotes: 20,
            authorId: id
        }
      }
      );

      const GetAuthorInfo = (AuthorInfo) => {
        axios.get(`${backendUrl}/author`, {
          authorId: parseInt(id),
          sortPopAsc: AuthorInfo.sortPopAsc == "ascending",
          startingIndex: 0,
          nbQuotes: (AuthorInfo.nbQuotes === undefined)? defaultNbQuotes:AuthorInfo.nbQuotes,
          categories: (AuthorInfo.category == "none" || AuthorInfo.category === undefined) ? null : AuthorInfo.category
        }).then(function (response) {
          if (response.data === 1) {
            console.log(`Author ${AuthorInfo.id} info retrieved`)
            
            setAuthorInfo({
                author: response.data.author,
                description: response.data.description,
                url: response.data.url,
                quotes: response.data.quotes
            })
          } else {
            console.log(`Failed to retrieve info for Author ${AuthorInfo.id}`)
          }
        }).catch(function (error) {
          console.log(error)
          console.log(`Failed to retrieve author with id: ${id}`)
          console.log({
            authorId: parseInt(id),
            sortPopAsc: AuthorInfo.sortPopAsc == "ascending",
            startingIndex: 0,
            nbQuotes: (AuthorInfo.nbQuotes === undefined)? defaultNbQuotes:AuthorInfo.nbQuotes,
            categories:  (AuthorInfo.category == "none" || AuthorInfo.category === undefined) ? null : AuthorInfo.category
          })
        })
    }
      let quotes = authorInfo.quotes.map((quote) => 
        <Quote content={quote.content} id={quote.id}/>
      )

      if (quotes.length == 0) {
        quotes = <p>Sorry there doesn't seem to be any quotes that fit the criteria.</p>
      }

      const showCategories = ["none"].concat(categories).map((category) => <option key={category}>{category}</option>)
      const ascDesc = ["ascending", "descending"].map((order) => <option key={order}>{order}</option>)

    return (
        <div className="author">
            <NavBar Logout={Logout}></NavBar>
            <div className="author-info"> 
                <div className="author-text">
                    <h2>{authorInfo.author}</h2>
                    <p>{authorInfo.description}</p>
                </div>
                
                <img src={authorInfo.url}></img>
            </div>
            <h2>Quotes</h2>
            <form onSubmit={handleSubmit(GetAuthorInfo)}>
            <label>Sort by Popularity: <select name="SortPopAsc" {...register("sortPopAsc")}>{ascDesc}</select></label>
            <label>Filter by Category: <select name="Category" {...register("category")}>{showCategories}</select> </label>
            <label>Number of Quotes per Page: <input type="number" {...register("nbQuotes", {min:1, max:50})} placeholder="20"/></label>
            <input type="reset" value="Reset"/>
            <input type="submit" value="Submit"></input>
            </form>
            <div className="quotes">
            {quotes}
            </div>
            
        </div>
    )
}

export default Author