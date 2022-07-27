import { useState, useRef, useEffect } from "react";
import "./search.css"
import Movie from "./Movie";



const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&query=${searchInput}&page=1&include_adult=false`
    const [searchResults, setSearchResults] = useState([])
    const searchRef = useRef()

    useEffect(() => {
      fetch(SEARCH_API).then(res=>res.json()).then(data=>{
        setSearchResults([...data.results.map(item=><Movie id={item.id} data={item} />)])
      })
    }, [searchInput])
    
    const handleSearch = () =>{
        setSearchInput(searchRef.current.value)
        console.log(searchInput)
        console.log(searchResults)
        
    }




    return ( 
    <div className="search-body">
        <div className="search-box-container">
            <input ref={searchRef} type="text" id="search-box" placeholder="Enter a movie name..."></input>
            <button id="search-button" onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results-container">
            {searchResults}
        </div>

    </div>
    
    
    
    
    
    
    );
}
 
export default Search;