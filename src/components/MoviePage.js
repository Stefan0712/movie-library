import "./moviePage.css"
import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import Movie from "./Movie"
import star from '../images/star.png'


const MoviePage = () => {
    
    let { movieId } = useParams();
    const [details, setDetails] = useState([])
    const IMG_API = "https://image.tmdb.org/t/p/w1280"
    const DETAILS_API = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US`
    const SIMILAR_API = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=1`
    const [genres, setGenres] = useState([])
    const [similar, setSimilar] = useState([])



useEffect(()=>{
    
    //fetch details and similar movies data
    fetch(DETAILS_API).then(res=>res.json()).then(
        data=>{
            setGenres([])
            setDetails(data)
            //since there might me more genres, it  map over them and add to an array
            data.genres.map(item=>setGenres(genres=>[...genres, item.name]))
            
        }
            )
            //get similar movies using the similar movies api uld
    fetch(SIMILAR_API).then(res=>res.json()).then(
            data=>{
                setSimilar(data.results)

            })
       
        

},[movieId,details])
//scroll to top function 
const scrollToTheTop = () =>{
    window.scrollTo(0,0)
}

    return ( 


        <div className="movie-page-body">
            <button id="scroll-to-top-btn" onClick={scrollToTheTop}>^</button>
            <div className="current-movie-info">
                    <div id="title">{details.title}</div>

                <div className="overview">
                    <h2>Overview</h2>
                    <div id="tag-line">{details.tagline}</div>
                    <div id="overview">{details.overview}</div>
                </div>
                
                <div className="desc">
                    
                    <div id="runtime">Runtime: {details.runtime} minutes</div>
                    <div id="release-date">Release date: {details.release_date}</div>
                    <div id="genres">Genres: {genres.map(item=>"  "+item+" ")}</div>
                    <div id="popularity">Popularity: {details.popularity}</div>
                    <div id="rating">Rating: {details.vote_average} <img id="vote-star-img" src={star} alt="star"></img> {details.vote_count} votes</div>
                    <div id="budget">Budget: ${details.budget}</div>
                    <div id="revenue">Revenue: {details.revenue}</div>
                    <div id="status">Status: {details.status}</div>
                </div>
                <div className="image-container">
                    <img src={IMG_API+details.poster_path} alt="movie poster" />
                </div>
            </div>
            <div className="recommended-movies">
            <h1>Recommended movies</h1>
            <div className="recommended-movies-container">
                {similar.map(item=><Movie id={"similar"+item.id} data={item} />)}
            </div>
           
            </div>
                

                

        </div>
     );
}
 
export default MoviePage;