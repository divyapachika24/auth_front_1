import React, { useEffect, useState, useContext } from 'react';
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from 'react-router-dom';
import ErrorHighlighter from '../miscellaneous/ErrorHighlighter';

export default function Configure() {
   const { userData } = useContext(UserContext);
   const history = useHistory();

   useEffect(() => {
    if (!userData.user) history.push("/login");
    });

   const [category, setCategory] = useState();
   const [plannedAmount, setPlannedAmount] = useState();
   const [error, setError] = useState();


   const submit = async (e) => {
       e.preventDefault();
       try{
       const newConfigure = { category, plannedAmount };
       await Axios.post(
           "http://localhost:5000/budgetPlan",
           newConfigure, {headers: {
            "auth-token" : localStorage.getItem("uauth-token")
          }}
       );
      
        //localStorage.setItem("uauth-token", loginRes.data.token);
       
       history.push("/successConfigure");
    }catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
   };
   
    return (
        <div className="page">
            <h2>Configuring Expenses</h2>
            {error && (
                <ErrorHighlighter message={error} clearError={() => setError(undefined)} />
            )}
            <form className="form" onSubmit={submit}>
                <label htmlFor="configure-category">category</label>
               <select id="configure-category" name="categories" onChange={(e) => setCategory(e.target.value)}>
                  <option value=""></option>
                  <option value="movies">movies</option>
                  <option value="shopping">shopping</option>
                  <option value="groceries">groceries</option>
                  <option value="donation">donation</option>
               </select>
               <label htmlFor="configure-plannedAmount">PlannedAmount</label>
                <input
                 id="configure-plannedAmount"
                 type="text"
                 onChange={(e) => setPlannedAmount(e.target.value)}
               />

                <input type="submit" value="Configure" />
            </form>
        </div>
    )
}
