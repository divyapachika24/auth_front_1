import React, { useEffect, useState, useContext } from 'react';
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from 'react-router-dom';
import ErrorHighlighter from '../miscellaneous/ErrorHighlighter';

export default function Expenses() {
   const { userData } = useContext(UserContext);
   const history = useHistory();
   
    useEffect(() => {
        if (!userData.user) history.push("/login");
    });
   const [category2, setCategory2] = useState("movies");
   const [spentAmount, setSpentAmount] = useState();
   const [error, setError] = useState();


   const submit = async (e) => {
       e.preventDefault();
       try{
       const newExpenses = { category2, spentAmount };
       await Axios.post(
           "http://localhost:5000/budgetSpent",
           newExpenses, {headers: {
            "auth-token" : localStorage.getItem("uauth-token")
          }}
       );
      
        //localStorage.setItem("uauth-token", loginRes.data.token);
        
        history.push("/successExpenses");
    }catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
   };

    return (
        <div className="page">
            <h2>Expenses actually Spent</h2>
            {error && (
                <ErrorHighlighter message={error} clearError={() => setError(undefined)} />
            )}
            <form className="form" onSubmit={submit}>
                <label htmlFor="configure-category2">category</label>
               <select id="configure-category2" name="categories" onChange={(e) => setCategory2(e.target.value)}>
                  <option value=""></option>
                  <option value="movies">movies</option>
                  <option value="shopping">shopping</option>
                  <option value="groceries">groceries</option>
                  <option value="donation">donation</option>
               </select>
               <label htmlFor="configure-spentAmount">spentAmount</label>
                <input
                 id="configure-spentAmount"
                 type="text"
                 onChange={(e) => setSpentAmount(e.target.value)}
               />

                <input type="submit" value="Actual Spent" />
            </form>
        </div>
    )
}
