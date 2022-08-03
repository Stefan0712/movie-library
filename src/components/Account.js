import { Link } from "react-router-dom"
import "./account.css"
import {useState, useEffect} from "react"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import userPhoto from '../images/user.png'


const Account = () => {

    const [user, setUser] = useState()

    const auth = getAuth()

    
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])


  
    if(user){

    return ( 
    <div className="account-body">
        <div className="user-info">
            
                <div className="user-profile-picture"><img src={userPhoto} alt="profile picture"></img></div>
                <div className="personal-info">
                    <div id="user-name">Username: {user.displayName}</div>
                    <div id="user-email">Email: {user.email}</div>
                    <div className="profile-buttons">
                    <Link to='/update-profile'><button>Update profile</button></Link>
        </div>
                </div>
            
        </div>
        
        <div className="profile-stats">
            <p>Coming soon</p>
        </div>
    </div> 
    );
    } else {
        return (
            <div className="account-body">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
            </div>
        )
    }
}
 
export default Account;