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
    const [favSeries, setFavSeries] = useState([])
    const [favMoviesCount, setFavMoviesCount] = useState(0)

    const auth = getAuth()
    
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            if(currentUser){

                async function getFirestoreData(){
                    
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
            
                    let temp = docSnap.data()
                    let movies = temp.movies
                    setFavMovies([])
                    setFavMoviesCount(movies.length)
        
        
                    movies.forEach((id)=>{
                        const DETAILS_API = `https://api.themoviedb.org/3/movie/${id}?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US`
                        fetch(DETAILS_API).then(res=>res.json()).then(
                                data=>{
                                    setFavMovies((favMovies)=>[...favMovies,<Movie key={"fav"+id} data={data} />])
                                }
                                )
                    })        
                    
                }
                getFirestoreData()
            }
        })

    },[])

     
     
       
     



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
        </div>
        <button id="profile-logout-button" onClick={logout}>Log out</button> 
       
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