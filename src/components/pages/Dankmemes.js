import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const Dankmemes = () => {
  const [chartData, setChartData] = useState({});
  const [category, setCategory] = useState([]);
  const [plannedAmount, setPlannedAmount] = useState([]);

  const chart = () => {
    let category = [];
    let plannedAmount = [];
    axios
      .get("http://localhost:5000/budgetPlan/all", {headers: {
        "auth-token" : localStorage.getItem("uauth-token")
      }})
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          category.push(dataObj.category);
          console.log("category pushed", category);
          plannedAmount.push(parseInt(dataObj.plannedAmount));
          console.log("planned amount pushed", plannedAmount);
        }
        setChartData({
          labels: category,
          datasets: [
            {
              label: "level of thiccness",
              data: plannedAmount,
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                
            ]
             
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(category, plannedAmount);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Budget Plan</h1>
      <div>
           <div className="chart">
           <Pie
             data={chartData}
             
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
           </div>
      </div>
    </div>
  );
};

export default Dankmemes;