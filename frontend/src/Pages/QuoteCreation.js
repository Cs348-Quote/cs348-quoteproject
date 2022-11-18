import { categories } from "../components/categories"
import NavBar from "../components/NavBar"
import { FormGroup } from "../components/user_info"
import { useForm } from 'react-hook-form';

function QuoteCreation({CreateQuote, Logout}) {
    const showCategories = categories.map((category) => <option key={category}>{category}</option>)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    return (
        <div>
            <NavBar Logout={Logout}/>
            
            <h1>Quote Creator</h1>
            <form onSubmit={handleSubmit(CreateQuote)}>
                <label>Your thought provoking quote:</label>
                <div><textarea autoFocus={true} {...register("quote")}></textarea></div>
                <div>
                <label>What Category does your Quote belong to? <select name="Category" {...register("category")}>{showCategories}</select> </label>
                </div>
            
    
                <input type="submit" value="Submit" />
                
                
               
            </form>
        </div>
    )
}

export default QuoteCreation