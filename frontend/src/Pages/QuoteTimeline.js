import NavBar from "../components/NavBar"
import { Chrono } from "react-chrono";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function QuoteTimeline({Logout}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    /*const CreateQuote = date => {
        axios.post(`${backendUrl}/create`, {
          startYear: date.startYear,
          endYear: date.endYear
        }).then(function (response) {
          if (response.data === 1) {
            console.log(`Retrieved authors from the year ${startYear} up to the year ${endYear}`)
            setItems(response.data.authors.map((author) => createTimelineItem(author)))
          } else {
            console.log(`Failed to retrieve authors from the year ${startYear} up to the year ${endYear}`)
            setError(`Failed to retrieve authors from the year ${startYear} up to the year ${endYear}`)
          }
        }).catch(function (error) {
          console.log(error)
          console.log(`Failed to retrieve authors from the year ${startYear} up to the year ${endYear}`)
          setError(`Failed to retrieve authors from the year ${startYear} up to the year ${endYear}`)
        })
      }*/
    const createTimelineItem = ((authorInfo) => {
        return {title: authorInfo.year, 
        cardTitle: <Link to={`/author/${authorInfo.id}`}>authorInfo.name</Link>,
        media: {
            name: authorInfo.name ,  
            source: {
                url: authorInfo.url
            },
            type: "IMAGE"
        },
        cardSubtitle: authorInfo.description}
    })

    const [items, setItems] = useState([{
        title: "May 1940",
        cardTitle: <Link to={`/author/23`}>Dunkirk</Link>,
        media: {
          name: "dunkirk beach",
          source: {
            url: "https://flixer.com/wp-content/uploads/2017/07/nGtEd7mQ12lJyeSvj6rQSzy8sG5.jpg"
          },
          type: "IMAGE"
        },
        cardSubtitle:
          "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk."
      }]);
    
    return (
        <div>
            <NavBar Logout={Logout}></NavBar>
            <form > <label>Search in between Year:<input {...register("startYear")} input="number" /> and Year: 
            <input {...register("endYear")} input="number"/></label><input type="submit" value="Submit"/></form>
            <div style={{ width: '500px', height: '950px' }}>
                <Chrono items={items}/>
            </div>
        </div>
    )
}

export default QuoteTimeline