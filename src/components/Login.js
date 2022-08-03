import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import {auth} from '../firebase-config'
import { signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"





const Login = () => {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [user, setUser] = useState({})

    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])

    const login = async (event) =>{
        event.preventDefault()
        try{

            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
        } catch(error){
            console.log(error)
        }
    }
    const logout = async () =>{
        await signOut(auth)
    }
    return ( 
        <div className="log-body">
        <h1>Login</h1>
        <form>
            <input type="email" placeholder="Email..." required onChange={(event)=>{setLoginEmail(event.target.value)}}></input>
            <input type="password" placeholder="Password..." required onChange={(event)=>{setLoginPassword(event.target.value)}}></input>
            <button type="button" id="login-button" onClick={login}>login</button>
            <Link to="/signup">Sign up</Link>
            <button onClick={logout}>Logout</button>


            <div className="current-user">{user?.email}</div>




        </form>
    </div> 
     );
}
 
export default Login;