import { categories } from '../components/categories'
import NavBar from '../components/NavBar'
import { useForm } from 'react-hook-form'
import './QuoteCreation.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function QuoteCreation({Logout}) {
    const showCategories = categories.map((category) => 
        <option key={category}>{category}</option>)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const backendUrl = 'http://localhost:5000'

    const loggedInUser = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    const CreateQuote = async (quoteDetails) => {
        try {
            const res = await axios.post(`${backendUrl}/create`, {
              email: loggedInUser.email,
              quote: quoteDetails.quote,
              category: quoteDetails.category
            }).then(function (response) {
                console.log('Server responded')
                return response
            }).catch(function (error) {
              console.log(error)
              console.log(`Quote Creation failed for: ${loggedInUser.name}`)
            })
            console.log(res)
            if (res.data !== -1) {
                // Successful Quote Creation
                console.log(`User ${quoteDetails.username} created a quote`)
                // Redirect to Quote. 
                // Needs the response to contain the id of the created quote
                // Intented to redirect to /quotes/${quoteID}
                const id = res.data
                
                navigate(`/quote/${id}`)
        
              } else {
                console.log(`Quote Creation Failed`)
              }
        } catch (e) {
            console.log(e)
        }
      }

    return (
        <div>
            <div className='navBarWrapper'> <NavBar Logout={Logout} /> </div>
            
            <h1>Quote Creator</h1>
            <form onSubmit={handleSubmit(CreateQuote)}>
                <label>Your thought provoking quote:</label>
                <div><textarea autoFocus={true} {...register('quote')}></textarea></div>
                <div>
                <label>What Category does your Quote belong to? <select name='Category' {...register('category')}>{showCategories}</select> </label>
                </div>
            
    
                <input type='submit' value='Submit' />
                
                
               
            </form>
        </div>
    )
}

export default QuoteCreation