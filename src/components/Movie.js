
import "./movie.css"
import noPhoto from '../images/no-photo.png'
import starOn from '../images/star-on.png'
import starOff from '../images/star-off.png'
import { useEffect, useState, useRef  } from "react"
import {Link} from "react-router-dom"
import { db } from '../firebase-config'
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"


const Movie = (props) => {
    //api for getting poster image
    const IMG_API = "https://image.tmdb.org/t/p/w1280"
    const [name,setName] = useState()
    const [date, setDate] = useState()
    const infoCompRef = useRef()
    const [infoPage, setInfoPage] = useState([])
    const [favImg, setFavImg] = useState(starOff)
    const [favMovies, setFavMovies] = useState([])
    const [user, setUser] = useState()
    const auth = getAuth();
    const [msg, setMsg] = useState("")
    const [msgClass, setMsgClass] = useState("main-msg")


useEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
        //checks if there is an user logged in
        if(currentUser){
            //function that gets data from firestore
            async function getFirestoreData(){ 
               
                //ref to the current user's doc
                const docRef = doc(db, "users",currentUser.uid);
                const docSnap = await getDoc(docRef);
        
                let temp = docSnap.data()
                setFavMovies(temp.movies)
                //checks if there is a movie already saved, then setting favorite button img to on if it is true
                if(temp.movies.indexOf(props.data.id)>=0){
                    setFavImg(starOn)
                }
            }
            getFirestoreData()
        }
        
    })
    //checks for both name or title, since they are called different for TV series and movies
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
    
    
    
},[props])

    
//function that handles clicks for favorite button
const handleFav = () =>{
    if(user){
        //switch fav button icon from on to off
        if(favImg===starOff){
            setFavImg(starOn)
        }else{
            setFavImg(starOff)
        }
        //doc ref using current user uid
        const docRef = doc(db, "users",user.uid);
        //checks if the current movie id exists in the favMovies state that contains favorite movies
        if(favMovies.indexOf(props.data.id)>=0){
            //if true, then it updates the array nammed "movies" with the current movie's id
            updateDoc(docRef, {
                "movies": arrayRemove(props.data.id)
            });
            //temporarily saved the favMovies state array
            let temp = favMovies;
            //removes the clicked movie if it exists in favMovies array
            temp.splice(temp.indexOf(props.data.id),1);
            //sets the original state array to the modified one, with the current clicked movie removed
            setFavMovies(temp)
        }else{
            //if false, adds current movie's id to firebase document's movie array for the current user, after this also updating the favMovies array with the correct array
            updateDoc(docRef, {
                "movies": arrayUnion(props.data.id)
            });
        }
    }else{
        console.log("You are not logged in")
       
    }
    
}

    return ( 
            <div  className="movie-container" id={props.data.id}>
                <div className="movie-fav-btn" onClick={handleFav}><img src={favImg} alt="favorite button image"></img></div>
                
                <div ref={infoCompRef} className="show-info">{infoPage}</div>
                <Link to={"/"+props.type+"/"+props.data.id} onClick={()=>window.scrollTo(0,0)}>
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
                </Link>
                
            </div>




     );
}
 
export default Movie;