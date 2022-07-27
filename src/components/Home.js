import "./home.css"
import { useOutletContext } from "react-router-dom";
import Movie from "./Movie";
import { useState, useRef } from "react";


const Home = () => {
    const [popularMovies, setPopularMovies] = useOutletContext();
    const popularContainerRef = useRef()
    const [scrollPosition, setScrollPosition] = useState(0)





    const scrollToRight = () =>{
         
        popularContainerRef.current.scrollTo(scrollPosition+100,0)
        setScrollPosition((scrollPosition)=>scrollPosition+100)
        
        
    }
    const scrollToLeft = () =>{
        popularContainerRef.current.scrollTo(scrollPosition-100,0)
        setScrollPosition((scrollPosition)=>scrollPosition-100)
    }
    return ( 
    <div className="home-body">

        <div ref={popularContainerRef} className="popular-movies-container">
            <div className="home-arrows" id="home-left-arrow" onClick={scrollToLeft}>&#171;</div>
            {popularMovies.map(item=><Movie data={item} />)}
            <div className="home-arrows" id="home-right-arrow" onClick={scrollToRight}>&#187;</div>
        </div>


    </div>
    
    
    
     
    
    
    
    
    
    );
}
 
export default Home;