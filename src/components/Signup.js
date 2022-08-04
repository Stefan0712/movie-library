import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import {createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import {auth} from '../firebase-config'
import './signup.css';

const Signup = () => {

    const [registerEmail, setRegisterEmail] = useState()
    const [registerPassword, setRegisterPassword] = useState()
    const [user, setUser] = useState({})

    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])
    const register = async (event) =>{
        event.preventDefault()
        try{

            const user = await createUserWithEmailAndPassword(auth, registerEmail,registerPassword)
            console.log(user)
        } catch(error){
            console.log(error.message)
        }
    }


    return ( 
    <div className="signup-body">
        <div className="form-container">

        <h1>Sign up</h1>
        <form>
            <input type="email" placeholder="Email..." required onChange={(event)=>{setRegisterEmail(event.target.value)}}></input>
            <input type="password" placeholder="Password..." required onChange={(event)=>{setRegisterPassword(event.target.value)}}></input>
            <button type="button" id="register-button" onClick={register}>Sign up</button>
            <p>Have an account already?</p>
            <Link to="/login">Login</Link>


            <div className="current-user">{user?.email}</div>

    
        </form>
        </div>
    </div> 
    );
}
 
export default Signup;