import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Quote({GetQuote, Logout}) {
    let { id } = useParams();

    const [quote, setQuote] = useState({
        content: "Unable to find quote",
        author: "Development Team"
      })

      useEffect(() => GetQuote(setQuote), [])

    return (<div>
        <NavBar Logout={Logout}/>
        <h1>{quote.content}</h1>
        <h2>-{quote.author}</h2>
        <p>{quote.time}</p>
    </div>)
}

export default  Quote