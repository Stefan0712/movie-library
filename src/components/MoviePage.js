import "./moviePage.css"
import { useEffect, useState } from "react"

const MoviePage = (props) => {
    
    const [details, setDetails] = useState([])
    const DETAILS_API = `https://api.themoviedb.org/3/movie/${props.data.id}?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US`
    const [genres, setGenres] = useState([])


useEffect(()=>{
    fetch(DETAILS_API).then(res=>res.json()).then(
        data=>{
            setGenres([])
            setDetails(data)
            data.genres.map(item=>setGenres(genres=>[...genres, item.name]))
            console.log(data.genres);

        }
            )
        
        

},[])

    return ( 


        <div className="movie-page-body">

            <div id="title">{props.data.title}</div>
            <div className="short-desc">
                <div id="tag-line">{details.tagline}</div>
                <div id="release-date">{props.data.release_date}</div>
                <div className="genres">{genres}</div>
                <div id="rating">{props.data.vote_average} <img src={"star"} alt="star"></img> {props.data.vote_count} votes</div>
            </div>
            <div className="info">
                Budget: ${details.budget}
                Popularity: {details.popularity}
                Revenue: {details.revenue}

                <h2>Overview</h2>
                {details.overview}
            </div>

        </div>
     );
}
 
export default MoviePage;