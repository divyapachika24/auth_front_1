import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
const jwt = require("jsonwebtoken");



export default function AuthFeatures() {
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const signup = () => history.push("/signup");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        })
        localStorage.setItem("uauth-token", "");
    }
    // jwt.verify(localStorage.getItem("uauth-token"), process.env.Jwt_secret_key, function(err, decoded) {
    //     if (err) {
    //       logout();
    //     }
    //   });

     // After decoding we get the second element of the parsed token where we have exp.
     const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    function onTokenExpire(){
        let token = localStorage.getItem("uauth-token")
        if (token){
            let decodejwt = parseJwt(token)
            if(Date.now() <= decodejwt.exp * 1000){
                return true
            }
            else{
                // localStorage.removeItem('jwt')
                // window.location.href = "/"
                logout()
            }
        }
    }
    setInterval(()=>{
        onTokenExpire()
   }, 65000)

    return (
        <nav className="auth-features">
            {userData.user ? (
                <button onClick={logout}> Logout</button>
            ) : (
                <>
                 <button onClick={signup}>SignUp</button>
                 <button onClick={login}>Login</button>
                </>
            )}
          
        </nav>
    )
}
