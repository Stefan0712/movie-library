
import "./movie.css"
import noPhoto from '../images/no-photo.png'
import { useEffect, useState, useRef  } from "react"
import MoviePage from "./MoviePage"


const Movie = (props) => {

    const IMG_API = "https://image.tmdb.org/t/p/w1280"
    const [name,setName] = useState()
    const [date, setDate] = useState()
    const infoCompRef = useRef()
    const [isInfoActive, setIsInfoActive] = useState(false)
    const [infoPage, setInfoPage] = useState([])


useEffect(()=>{
    if(props.data.title===undefined){
        setName(props.data.name)
    }else{
        setName(props.data.title)
    }
    if(props.data.release_date===undefined){
        setDate(props.data.first_air_date)
    }else{
        setDate(props.data.release_date)
    }

    
},[])

const handleShowInfo = () =>{

    if(isInfoActive===false){
        setInfoPage(<MoviePage data={props.data} />)
        setIsInfoActive(true)
    }else if(isInfoActive===true){

        setInfoPage()
        setIsInfoActive(false)
    }
}
    return ( 
            <div  className="movie-container" id={props.data.id} onClick={handleShowInfo}>
              
                <div ref={infoCompRef} className="show-info">{infoPage}</div>

                <div className="poster-container">
                <object data={IMG_API+props.data.poster_path} type="image/png" alt={name} className="movie-posters">
                    <img className="movie-posters" src={noPhoto} alt={props.data.title}></img>
                </object>
                </div>
                
                <div className="info-section">

                    <div className="movie-title">{name}</div>
                    <div className="movie-release">Release date: {date}</div>
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