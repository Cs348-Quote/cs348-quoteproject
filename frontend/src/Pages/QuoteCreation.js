import { categories } from "../components/categories"
import NavBar from "../components/NavBar"
import { FormGroup } from "../components/user_info"
import { useForm } from 'react-hook-form';
import './QuoteCreation.css'

function QuoteCreation({CreateQuote, Logout}) {
    const showCategories = categories.map((category) => <option key={category}>{category}</option>)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    return (
        <div >
            <div className='navBarWrapper'> <NavBar Logout={Logout} /> </div>
            <div className="quote-creator">
            <h1>Quote Creator</h1>
            <form onSubmit={handleSubmit(CreateQuote)}>
                <h2>Your thought provoking quote:</h2>
                <div><textarea autoFocus={true} {...register("quote")}></textarea></div>
                <div>
                <label>What Category does your Quote belong to? <select name="Category" {...register("category")}>{showCategories}</select> </label>
                </div>
            
    
                <input type="submit" value="Submit" />
                
                
               
            </form>
            </div>
           
        </div>
    )
}

export default QuoteCreation