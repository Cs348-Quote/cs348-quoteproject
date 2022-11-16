import NavBar from "../components/NavBar"
import { FormGroup } from "../components/user_info"

function QuoteCreation({CreateQuote}) {
    return (
        <div>
            <NavBar/>
            <h1>Quote Creator</h1>
            <p>Your thought provoking quote:</p>
            <textarea autoFocus="true"></textarea>
            <button onClick={CreateQuote}>Submit</button>
        </div>
    )
}

export default QuoteCreation