import React, { useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";


export default function SuccessConfigure() {
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push("/login");
    });
    
    const expenses = () => history.push("/expenses");
    const gohome = () => history.push("/");
 
    
    return (
        <div>
        
        <h1>Successfully submitted Expense</h1>
        <h2>Make sure to fill upto 4 different categories</h2>
        
        <nav className="budgetbutton">
                <button onClick={expenses}> Add one more record</button>
        </nav>
        <nav className="budgetbutton">
                <button onClick={gohome}> Go HomePage</button>
        </nav>

            {/* <Dankmemes /> */}
            {/* <NewBar />
            <PieC />
            <LineChart /> */}
        </div>
      
    )
}
