import { Link } from "react-router-dom"
import './login.css'
import {useState, useEffect} from "react"
import {auth} from '../firebase-config'
import { signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import Account from "./Account"





const Login = () => {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [user, setUser] = useState({})
    const [msg, setMsg] = useState("")

    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])

    const login = async (event) =>{
        event.preventDefault()
        try{

            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        } catch(error){
            setMsg(error.message)
        }
    }
   

     
  
        return(
            <div className="login-body">
                <div className="form-container">

                    <h1>Login</h1>
                    <div id="login-msg">{msg}</div>
                    <form>
                        <input type="email" placeholder="Email..." required onChange={(event)=>{setLoginEmail(event.target.value)}}></input>
                        <input type="password" placeholder="Password..." required onChange={(event)=>{setLoginPassword(event.target.value)}}></input>
                        <div id="reset-pass"><Link to='/reset-password'>Reset password</Link></div>
                        <button type="button" id="login-button" onClick={login}>login</button>
                        <p>You don't have an account?</p><Link to="/signup">Sign up instead</Link>






                    </form>
                </div>
            </div> 
            
        )
    
    }
 
export default Login;