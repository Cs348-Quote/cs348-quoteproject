import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { categories } from "../components/categories";
import NavBar from "../components/NavBar";
import './Author.css'

function Quote({content, id}) {
    return <div className="quote">
        <Link to={`/quotes/${id}`}>{content}</Link>
    </div>
}

function Author({Logout, GetAuthorInfo}) {
    let { id } = useParams();

    const [authorInfo, setAuthorInfo] = useState({
        author: "CS 348 students",
        description: "tired students",
        url: "http://onemansblog.com/wp-content/uploads/2009/03/university-of-washington.jpg",
        quotes: [{content: "Watch Inside Out. One of the best movies of all time", id:1},
                {content: "This was easy!", id:2},
                {content: "This will only take a moment.", id:3}]
      })

      useEffect(() => GetAuthorInfo(setAuthorInfo), [])

      const { register, handleSubmit, reset, formState: { errors } } = useForm();
      let quotes = authorInfo.quotes.map((quote) => 
        <Quote content={quote.content} id={quote.id}/>
      )

      if (quotes.length == 0) {
        quotes = <p>Sorry there doesn't seem to be any quotes that fit the criteria.</p>
      }

      const showCategories = ["none"].concat(categories).map((category) => <option key={category}>{category}</option>)
      const ascDesc = ["ascending", "descending"].map((order) => <option key={order}>{order}</option>)

    return (
        <div>
            <NavBar Logout={Logout}></NavBar>
            <div className="author-info"> 
                <div>
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