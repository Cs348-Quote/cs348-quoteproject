import { categories } from "../components/categories"
import NavBar from "../components/NavBar"
import { FormGroup } from "../components/user_info"

function QuoteCreation({CreateQuote}) {
    const showCategories = categories.map((category) => <option key={category}>{category}</option>)
    return (
        <div>
            <NavBar/>
            <h1>Quote Creator</h1>
            <p>Your thought provoking quote:</p>
            <textarea autoFocus={true}></textarea>
            <div>
            <p>What Category does your Quote belong to?</p>
            <select name="Category">{showCategories}</select>
            </div>
            
            
            <p>Click Here to Submit</p>
            <button onClick={CreateQuote}>Submit</button>
        </div>
    )
}

export default QuoteCreation