import React, { useState, useContext } from 'react';
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from 'react-router-dom';
import ErrorHighlighter from '../miscellaneous/ErrorHighlighter';

export default function SignUp() {
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [passwordCheck, setPasswordCheck] = useState();
   const [displayName, setDisplayName] = useState();
   const [error, setError] = useState();

   const { setUserData } = useContext(UserContext);
   const history = useHistory();

   const submit = async (e) => {
       e.preventDefault();
       try{
       const newUser = { email, password, passwordCheck, displayName };
       await Axios.post(
           "http://localhost:5000/users/register",
           newUser
       );
       const loginRes = await Axios.post(
        "http://localhost:5000/users/login", {
         email,
         password,
        });
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        });
        localStorage.setItem("uauth-token", loginRes.data.token);
        history.push("/");
    }catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
   };

    return (
        <div className="page">
            <h2>Sign up</h2>
            {error && (
                <ErrorHighlighter message={error} clearError={() => setError(undefined)} />
            )}
            <form className="form" onSubmit={submit}>
                <label htmlFor="signup-email">Email</label>
                <input
                 id="signup-email"
                 type="email"
                 onChange={(e) => setEmail(e.target.value)}
               />

                <label htmlFor="signup-password">Password</label>
                <input
                 id="signup-password"
                 type="password"
                 onChange={(e) => setPassword(e.target.value)}
               />
                <input
                 type="password"
                 placeholder="confirm password"
                 onChange={(e) => setPasswordCheck(e.target.value)}
                />

                <label htmlFor="signup-displayname">DisplayName</label>
                <input
                 id="signup-displayname"
                 type="text"
                 onChange={(e) => setDisplayName(e.target.value)}
                />

                <input type="submit" value="Register" />
            </form>
        </div>
    )
}
