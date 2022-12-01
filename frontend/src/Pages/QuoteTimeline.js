import NavBar from "../components/NavBar"
import { Chrono } from "react-chrono";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { backendUrl } from "../App";
import { useEffect } from "react";

function QuoteTimeline({Logout}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [request, setRequest] = useState({
      startYear: 2000,
      startYearBC: false,
      endYear: 2020,
      endYearBC: false
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
    }])

    const [chronoState, setChronoState] = useState(0)
  
    const CreateQuote = async (request) => {
      console.log(request)
        const res = await axios.post(`${backendUrl}/timeline`, {
          startYear: request.startYear,
          startYearBC:request.startYearBC,
          endYear: request.endYear,
          endYearBC: request.endYearBC
        }).then(function (response) {
          if (response.data !== -1) {
            console.log(`Retrieved authors from the year ${request.startYear} up to the year ${request.endYear}`)
            return response
          } else {
            console.log(`Failed to retrieve authors from the year ${request.startYear} up to the year ${request.endYear}`)
           
          }
        }).catch(function (error) {
          console.log(error)
          console.log(`Failed to retrieve authors from the year ${request.startYear} up to the year ${request.endYear}`)
          
        })
        console.log(res.data)
        const test = res.data.map((author) => createTimelineItem(author))
        console.log(test)
        setItems(res.data.map((author) => createTimelineItem(author)))
        setChronoState(<Chrono items={res.data.map((author) => createTimelineItem(author))}/>)
      }

      useEffect(() => {
        CreateQuote(request)
      }, [])


    const linkStyle = {
      color: "white"
    }

    const createTimelineItem = ((authorInfo) => {
        return {
        title: authorInfo.birth_date, 
        cardTitle: <Link style={linkStyle} to={`/author/${authorInfo.aid}`}>{authorInfo.author_name}</Link>,
        media: {
            name: authorInfo.author_name ,  
            source: {
                url: authorInfo.image
            },
            type: "IMAGE"
        },
        cardSubtitle: authorInfo.author_description
      }
    })

    const CustomChrono = () => {
      return chronoState
    }

    return (
        <div>
            <NavBar Logout={Logout}></NavBar>
            <form style={{ margin: 'auto' }} onSubmit={handleSubmit(CreateQuote)}> 
              <label>Search in between Year:
                <input {...register("startYear")} input="number" /> BC? 
                <input {...register("startYearBC")}type="checkbox"/> and Year: 
              <input {...register("endYear")} input="number"/>BC?
              <input {...register("endYearBC")}type="checkbox"/>
              </label><input type="submit" value="Submit"></input>
            </form>
            <div style={{ width: '500px', height: '950px', margin: 'auto' }}>
                <CustomChrono/>
            </div>
        </div>
    )
}

export default QuoteTimeline