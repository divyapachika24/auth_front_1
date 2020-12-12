import React, { useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import NewBar from "./NewBar";
import LineChart from './LineChart';
import PieC from './PieC';
import Configure from './Configure';
import Expenses from './Expenses';
import Visuals from './Visuals';
import { PlanTable } from './PlanTable';


export default function Home() {
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push("/login");
    });
    const configure = () => history.push("/configure");
    const expenses = () => history.push("/expenses");
    const visuals = () => history.push("/visuals");
    
    return (
        <div>
         <nav className="budgetbutton">
                <button onClick={configure}> Configure Budget</button>
        </nav>
        <nav className="budgetbutton">
                <button onClick={expenses}> Budget Spent</button>
        </nav>
        <nav className="budgetbutton">
                <button onClick={visuals}> Get Charts</button>
        </nav>

            {/* <Dankmemes /> */}
             {/* <NewBar />
            <PieC />
            <LineChart />  */}
           
        </div>
      
    )
}
