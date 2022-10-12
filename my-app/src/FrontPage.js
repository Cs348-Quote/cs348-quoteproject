import './FrontPage.css'
import NavBar from './NavBar.js'

/*

<body>
              <h1>{{quoteOfTheDay}}</h1>
              <h2>{{authorOfTheDay}}</h2>
            </body>

*/

function FrontPage() {
  return (
    <div>
      <NavBar/>
      <div className="top">
            <body>
              <h1>"Insert Quote Here"</h1>
              <h2>"-Author"</h2>
            </body>
      </div>

      <div className='features'>
      <body>
        <h2>Features</h2>
        <h3>Search for Quotes</h3>
        <p>Find what you're looking for by filtering by author, mood, date, etc.</p>
        <h3>Quote Map / Timeline</h3>
        <p>Visualize quotes with a map or a timeline</p>
      </body>
      </div>
    </div>
    
  );
}



export default FrontPage;
