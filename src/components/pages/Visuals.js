import React, { useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import NewBar from "./NewBar";
import LineChart from './LineChart';
import PieC from './PieC';
import Configure from './Configure';
import Expenses from './Expenses';
//import Visuals from './Visuals';
import { PlanTable } from './PlanTable';


export default function Visuals() {
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        console.log("ENTERED the EFFECT")
        if (!userData.user) history.push("/login");
    });
  
    
    return (
        <div>
            {/* <Dankmemes /> */}
            <NewBar />
            <PieC />
            <LineChart />
            <PlanTable />
        </div>
      
    )
}
