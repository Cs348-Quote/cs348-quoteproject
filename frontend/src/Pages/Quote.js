import { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import NavBar from '../components/NavBar';
import './Quote.css'

function Quote({GetQuote, Logout}) {
    let { id } = useParams();

    const [quote, setQuote] = useState({
        aid: id,
        author_name: 'Development Team',
        quote_content: 'Unable to find quote',
      })

    useEffect(() => GetQuote(id, setQuote), [])

    const authorLinkStyle = {
        textDecoration: 'none',
        color: 'white',
        width: '30%',
        margin: 'auto'
    }

    return (<div className='quoteWrapper'>
        <div className='navBarWrapper'>
            <NavBar Logout={Logout} />
        </div>
        <h1 className='quoteContent'>{quote.quote_content}</h1>
        <Link style={authorLinkStyle}
              to={`/author/${quote.aid}`}>{quote.author_name}</Link>
    </div>)
}

export default Quote