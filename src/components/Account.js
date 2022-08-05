import { Link } from "react-router-dom"
import "./account.css"
import {useState, useEffect} from "react"
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth"
import { db } from '../firebase-config'

import userPhoto from '../images/user.png'
import Login from "./Login"
import { doc, getDoc } from "firebase/firestore"
import Movie from "./Movie"


const Account = () => {

    



    const [user, setUser] = useState()
    const [favMovies, setFavMovies] = useState([])
    //TODO add support for tv series
    const [favSeries, setFavSeries] = useState([])
    const [favMoviesCount, setFavMoviesCount] = useState(0)

    const auth = getAuth()
    
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            //saves current user to user state
            setUser(currentUser);
            //checks if there is a current user
            if(currentUser){
                //this function fetch the data from the firestore
                async function getFirestoreData(){
                    //refference the document containing user's data, using current user uid
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    //saved the data to a temp var
                    let temp = docSnap.data()
                    let movies = temp.movies
                    //empties the favMovies state
                    setFavMovies([])
                    //updates the movie counter to current fav movie array length
                    setFavMoviesCount(movies.length)
        
                    //iterate over every movie id that we got from firestore
                    movies.forEach((id)=>{
                        //updates the get details api with the movie id from the firestore
                        const DETAILS_API = `https://api.themoviedb.org/3/movie/${id}?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US`
                        //then it fetches the data using the updated api url
                        fetch(DETAILS_API).then(res=>res.json()).then(
                                data=>{
                                    //builds a Movie component with the data from details api and push it into favMovies state array
                                    setFavMovies((favMovies)=>[...favMovies,<Movie key={"fav"+id} data={data} />])
                                }
                                )
                    })        
                    
                }
                //this runs the function that I defined earlier
                getFirestoreData()
            }
        })

    },[])

     
     
       
     


//simple logout function
    const logout = async () =>{
        await signOut(auth)
    }
  
    if(user){

    return ( 
    <div className="account-body">
        <div className="user-info">
                   
                    <div className="personal-info">
                        <div className="user-profile-picture"><img src={userPhoto} alt="profile picture"></img></div>
                        <div className="info">

                        <div id="user-name">Username: {user.displayName}</div>
                        <div id="user-email">Email: {user.email}</div>
                        <div id='fav-movies-count'>Favorite movies: {favMoviesCount}</div>
                        <Link to='/update-profile'><button>Update profile</button></Link>
                        </div>
                    </div>
                
                 <div className="fav-movies-container">

                <h2>Favorite movies</h2>
                <div className="fav-movies">  
                    {favMovies}
                </div>
            </div>
        <button id="profile-logout-button" onClick={logout}>Log out</button> 
        </div>
       
    </div> 
    );
    } else {
        return (
            <div className="account-body no-user">
                <Login />
                    

            </div>
        )
    }
}
 
export default Account;