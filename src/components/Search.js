import { useState, useRef, useEffect } from "react";
import "./search.css"
import Movie from "./Movie";
import searchIcon from "../images/search.png";



const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&query=${searchInput}&page=1&include_adult=false`
    const [searchResults, setSearchResults] = useState([])
    const searchRef = useRef()
    const searchButtonRef = useRef()
    const searchAnotherRef = useRef()

    useEffect(() => {
      fetch(SEARCH_API).then(res=>res.json()).then(data=>{
        setSearchResults([...data.results.map(item=><Movie id={item.id} data={item} />)])
      })
    }, [searchInput])
    
    const handleSearch = () =>{
        searchAnotherRef.current.style.display = "flex";
        searchButtonRef.current.style.display = "none";
        searchRef.current.style.display = "none";
        setSearchInput(searchRef.current.value)

       
        
    }
    const handleSearchAnother = () =>{
        searchAnotherRef.current.style.display = "none";
        searchButtonRef.current.style.display = "inline";
        searchRef.current.style.display = "inline";
    }

    const scrollToTheTop = () =>{
        window.scrollTo(0,0)
    }


    return ( 
    <div className="search-body">
        <div className="search-box-container">
            <button id="scroll-to-top-btn" onClick={scrollToTheTop}>^</button>
            <button ref={searchAnotherRef} id="search-another" onClick={handleSearchAnother}><img id="search-button-icon" src={searchIcon}></img>Search another movie</button>
            <input ref={searchRef} type="text" id="search-box" placeholder="Enter a movie name..."></input>
            <button ref={searchButtonRef} id="search-button" onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results-container">
            {searchResults}
        </div>

    </div>
    
    
    
    
    
    
    );
}
 
export default Search;