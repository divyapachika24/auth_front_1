import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Header from './components/layout/Header';
import UserContext from './context/UserContext';
import Axios from "axios";
import Configure from './components/pages/Configure';
import Expenses from './components/pages/Expenses';
import Visuals from './components/pages/Visuals';
import SuccessConfigure from './components/pages/SuccessConfigure';
import SuccessExpenses from './components/pages/SuccessExpenses';
import SpentTable from './components/pages/SpentTable';



import "./style.css";

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
          let token = localStorage.getItem("uauth-token");
          if (token === null) {
            localStorage.setItem("uauth-token", "");
            token = "";
          }
          const tokenRes = await Axios.post(
            "http://localhost:5000/users/isTokenValid",
            null,
            { headers: { "auth-token": token } }
          );
          if (tokenRes.data) {
            const userRes = await Axios.get("http://localhost:5000/users/", {
              headers: { "auth-token": token },
            });
            setUserData({
              token,
              user: userRes.data,
            });
          }
       };
       
       checkLoggedIn();
    }, []);

    return (
        <>
         <BrowserRouter>
           <UserContext.Provider value={{ userData, setUserData }}>
            <Header />
            <div className="container">
             <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/configure" component={Configure} />
                <Route path="/expenses" component={Expenses} />
                <Route path="/visuals" component={Visuals} />
                <Route path="/successConfigure" component={SuccessConfigure} />
                <Route path="/successExpenses" component={SuccessExpenses} />
                <Route path="/spentTable" component={SpentTable} />
             </Switch>
            </div>
           </UserContext.Provider>
         </BrowserRouter>
        </>
    );
}
