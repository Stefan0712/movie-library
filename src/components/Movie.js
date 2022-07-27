
import "./movie.css"
import noPhoto from '../images/no-photo.png'



const Movie = (props) => {

    const IMG_API = "https://image.tmdb.org/t/p/w1280"


    return ( 
            <div className="movie-container" id={props.data.id}>
                <div className="poster-container">
                <object data={IMG_API+props.data.poster_path} type="image/png" alt={props.data.title} className="movie-posters">
                    <img className="movie-posters" src={noPhoto} alt={props.data.title}></img>
                </object>
                </div>
                <div className="info-section">

                    <div className="movie-title">{props.data.title}</div>
                    <div className="movie-release">Release date: {props.data.release_date}</div>
                    <div className="vote-avg">Avg vote: {props.data.vote_average}</div>
                    <div className="vote-count">Total votes: {props.data.vote_count}</div>
                </div>
                
                <div className="overview-container">
                    <h3>Overview:</h3>
                    {props.data.overview}
                </div>
            </div>




     );
}
 
export default Movie;