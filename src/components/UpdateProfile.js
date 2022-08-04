import { Link } from "react-router-dom"
import "./updateProfile.css"
import {useState, useEffect} from "react"
import {getAuth, onAuthStateChanged, updateProfile, updatePassword, updateEmail, signOut } from "firebase/auth"
import Login from "./Login"


const Account = () => {

    const [user, setUser] = useState()
    const [updatedEmail, setUpdatedEmail] = useState()
    const [updatedName, setUpdatedName] = useState()
    const [updatedPassword, setUpdatedPassword] = useState()
    const [msg, setMsg] = useState('')
    

    const auth = getAuth()

    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])
    const updateGeneralInfo = () =>{
        if(updatedName){
            updateProfile(auth.currentUser, {displayName: updatedName}).then(()=>setMsg("Changes successfully saved!")).catch(
                error=>{
                setMsg(error.message)
                if(error.message==="Firebase: Error (auth/requires-recent-login)."){
                    logout();
                }
                
            }
            )
        }
    }
    const updatePersonalInfo = () =>{
        if(updatedEmail){
            updateEmail(auth.currentUser, updatedEmail).then(()=>setMsg("Changes successfully saved!")).catch(
                error=>{
                    console.log(error)
                if(error.message==="Firebase: Error (auth/requires-recent-login)."){
                    logout();
                }
                
            }
            )
        }
    }

    const logout = async () =>{
        await signOut(auth)
    }
   
    
    if(user){

    return ( 
    <div className="update-profile-body">
        <div className="user-info">
            <div id="update-msg">{msg}</div>
            <div className="general-info">
                    <h2>General info</h2>
                    <label>Profile picture</label>
                    <div className="user-profile-picture"><input id="img-input" type="file"></input> </div>
                    <label>Username</label>
                    <div id="update-name"> <input type="text" placeholder="Username" onChange={(event)=>{setUpdatedName(event.target.value)}}></input></div>
                    <button onClick={updateGeneralInfo}>Save</button>

                </div>
                <div className="personal-info">
                    <h2>Personal info</h2>
                    <label>Email</label>
                    <div id="update-email"> <input type="email" placeholder="New Email" onChange={(event)=>{setUpdatedEmail(event.target.value)}}></input></div>
                    <label>Password</label>
                    <div id="update-password"> <input type="password" placeholder="New password" onChange={(event)=>{setUpdatedPassword(event.target.value)}}></input></div>
                    <button onClick={updatePersonalInfo}>Save</button>
                </div>  
                <div id="go-back-to-profile-link"><Link to="/account">Go back to your profile</Link></div>
            </div>
           
            
    </div> 
    );
    } else{
        return (
            <Login />
        )
    }
}
 
export default Account;