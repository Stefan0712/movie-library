import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from 'react-router-dom'
import "./resetPassword.css"


const ResetPassword = () => {
    const auth = getAuth();
    const [msg, setMsg] = useState('')
    const [resetEmail, setResetEmail] = useState()

    const handleResetPassword=()=>{
        sendPasswordResetEmail(auth, resetEmail).then(() => {
        setMsg("Email sent! Check your inbox!")
      })
      .catch((error) => {
        setMsg(error.message)
      });

    }

    return ( 
        <div className="reset-password-body">
            <div className="reset-container">

            <h2>Reset Password</h2>
            <div className="reset-msg">{msg}</div>

                <input type="email" required placeholder="example@gmail.com" onChange={(e)=>{setResetEmail(e.target.value)}}></input>

            <button id="reset-password-button" onClick={handleResetPassword}>Reset password</button>

            <Link to='/login'>Go back to login</Link>
            </div>
        </div>
     );
}
 
export default ResetPassword;