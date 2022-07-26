import "./home.css"
import { useOutletContext } from "react-router-dom";
import Movie from "./Movie";
import { useEffect } from "react";


const Home = () => {
    const [popularMovies, setPopularMovies] = useOutletContext();
    
    return ( 
    <div className="home-body">

        <div className="popular-movies-container">
            {popularMovies.map(item=><Movie data={item} />)}
        </div>


    </div>
    
    
    
     
    
    
    
    
    
    );
}
 
export default Home;