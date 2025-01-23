//import library
import  {useState} from 'react';
import axios from 'axios';
import "./KanyeQuote.css"; //importing styles

const KanyeQuote = () => {
    const [quote, setQuote] = useState("");
    //function to fetch a new quote
    const fetchQuote = async () => {
        try{
            console.log("api hit")
            const response = await axios.get("https://api.kanye.rest"); //calling the api
            setQuote(response.data.quote);
        }catch(error) {
            console.error("Error fetching quote:" ,error); //error catch
            setQuote("Could not fetch quote. Please try again.");
        }
    }
    return (
        <div className='quote-container'> 
            <h1>Kanye West Quote Generator</h1>
            <p className="quote"> {quote || "Click the button to get inspired!"}</p>
            <button onClick={fetchQuote}>Get Kanye Quote</button> 

        </div>
    )
}

export default KanyeQuote;