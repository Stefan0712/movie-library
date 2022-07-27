import "./home.css"
import { useOutletContext } from "react-router-dom";
import Movie from "./Movie";
import { useState, useRef, useEffect } from "react";


const Home = () => {
    const POPULAR_API = "https://api.themoviedb.org/3/movie/popular?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=1"
    const INCOMING_API = "https://api.themoviedb.org/3/movie/upcoming?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=1"
//refs for every category container
    const popularContainerRef = useRef()
    const incomingMoviesRef = useRef()
//state for scroll position for the popular movies arrows
    const [scrollPosition, setScrollPosition] = useState(0)
//state for movies array for each category
    const [popularMovies, setPopularMovies] = useState([]);
    const [incomingMovies, setIncomingMovies] = useState([])
    const [featured, setFeatured] = useState([])


    useEffect(()=>{
        //fetch the data for every category of movies


        //popular movies api fetch
        fetch(POPULAR_API).then(res=>res.json()
        ).then(data =>{
          setPopularMovies(data.results)

            let randomTemp = Math.round(Math.random()* (19 - 0 + 1) + 0)
            setFeatured(data.results[randomTemp])
            
  
        })


        //incoming movies api fetch
        fetch(INCOMING_API).then(res=>res.json()
        ).then(data =>{
          setIncomingMovies(data.results)
        })

        
  },[])
  

//functions for Popular movies arrows
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
        <div className="featured-movie-container">
            <h2 className="categories-text">{featured.title}</h2>
           <div className="featured-movie-img-container">
                <img id="featured-img" src={`https://image.tmdb.org/t/p/w1280${featured.poster_path}`} alt={featured.title}></img>
           </div>
           <div className="featured-movie-info-container">
                <div className="featured-release">{featured.release_date}</div>
                <div className="featured-vote-count">Vote count: {featured.vote_count}</div>
                <div className="featured-vote">Average vote: {featured.vote_average}</div>
                <h2>Overview:</h2>
                <div className="featured-overview">{featured.overview}</div>

           </div>

            
        </div>
        <div className="popular-movies-container">
            <h2 className="categories-text">Popular movies</h2>
            <div ref={popularContainerRef} className="popular-movies">

                    <div className="home-arrows" id="home-left-arrow" onClick={scrollToLeft}>&#171;</div>
                    {popularMovies.map(item=><Movie id={"popular"+item.id} data={item} />)}
                    <div className="home-arrows" id="home-right-arrow" onClick={scrollToRight}>&#187;</div>
            </div>
        </div>
        <div className="incoming-movies-container">
            <h2 className="categories-text">Incoming movies</h2>
            <div ref={incomingMoviesRef} className="incoming-movies">
                {incomingMovies.map(item=><Movie id={"incoming"+item.id} data={item} />)}
            </div>
            
        </div>
       


    </div>
    
    
    
     
    
    
    
    
    
    );
}
 
export default Home;