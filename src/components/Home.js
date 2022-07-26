import "./home.css"
import Movie from "./Movie";
import { useState, useEffect } from "react";


const Home = () => {
    const POPULAR_API = "https://api.themoviedb.org/3/movie/popular?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=1"
    const INCOMING_API = "https://api.themoviedb.org/3/movie/upcoming?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=1"
    const TV_AIRING_API = "https://api.themoviedb.org/3/tv/airing_today?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=1"
    const TV_POPULAR_API = "https://api.themoviedb.org/3/tv/popular?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=1"

//state for movies array for each category
    const [popularMovies, setPopularMovies] = useState([]);
    const [incomingMovies, setIncomingMovies] = useState([])
    const [featured, setFeatured] = useState([])
    const [tvAiring, setTvAiring] = useState([])
    const [tvPopular, setTvPopular] = useState([])


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

        //tv airing api fetch
        fetch(TV_AIRING_API).then(res=>res.json()
        ).then(data =>{
          setTvAiring(data.results)
        })

        //tv popular api fetch
        fetch(TV_POPULAR_API).then(res=>res.json()
        ).then(data =>{
          setTvPopular(data.results)
          
        })

        
  },[])
  

//functions for Popular movies arrows
  
    const scrollToTheTop = () =>{
        window.scrollTo(0,0)
    }
    return ( 
    <div className="home-body">
        <button id="scroll-to-top-btn" onClick={scrollToTheTop}>^</button>
        <div className="featured-movie-container">

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
            <div className="popular-movies">

                    {popularMovies.map(item=><Movie type={"movie"} id={"popular"+item.id} data={item} />)}
            </div>
        </div>
        <div className="incoming-movies-container">
            <h2 className="categories-text">Incoming movies</h2>
            <div className="incoming-movies">
                {incomingMovies.map(item=><Movie type={"movie"} id={"incoming"+item.id} data={item} />)}
            </div>
            
        </div>
        <div className="-tv-airing-movies-container">
            <h2 className="categories-text">TV airing now</h2>
            <div className="tv-airing-movies">
                {tvAiring.map(item=><Movie type={"series"} id={"tvAiring"+item.id} data={item} />)}
            </div>
            
        </div>
        <div className="tv-airing-movies-container">
            <h2 className="categories-text">TV popular</h2>
            <div className="tv-airing-movies">
                {tvPopular.map(item=><Movie type={"series"} id={"tvPopular"+item.id} data={item} />)}
            </div>
            
        </div>
       


    </div>
    
    
    
     
    
    
    
    
    
    );
}
 
export default Home;