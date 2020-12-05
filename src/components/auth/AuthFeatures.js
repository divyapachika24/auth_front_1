import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";



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
