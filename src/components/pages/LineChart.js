import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";

const LineChart = () => {
  // const [chartData, setChartData] = useState({});
  const [category, setCategory] = useState([]);
  const [plannedAmount, setPlannedAmount] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [spentAmount, setSpentAmount] = useState([]);

  const chart = () => {
    axios
      .get("http://localhost:5000/budgetPlan/all", {headers: {
        "auth-token" : localStorage.getItem("uauth-token")
      }})
      .then(res => {
        console.log(res);
        let c= [];
        let planned = [];
        for (const dataObj of res.data) {
          c.push(dataObj.category);
          planned.push(parseInt(dataObj.plannedAmount));
        }
       
        setCategory(c);
        setPlannedAmount(planned);
      })
      .catch(err => {
        console.log(err);
      });
      axios
      .get("http://localhost:5000/budgetSpent/all", {headers: {
        "auth-token" : localStorage.getItem("uauth-token")
      }})
      .then(res => {
        console.log(res);
        let s= [];
        let splanned = [];
        for (const dataObj of res.data) {
          s.push(dataObj.category2);
          splanned.push(parseInt(dataObj.spentAmount));
        }
       
        setCategory2(s);
        setSpentAmount(splanned);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Planned Vs Spent</h1>
      <div>
           <div className="chart">
           <Line
             data={{
              labels: category,
              datasets: [
                {
                  label: "Planned",
                  data: plannedAmount,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                ]
                 
                },
                {
                  label: "Spent",
                  data: spentAmount,
                  backgroundColor:[
                    'rgba(54, 162, 235, 0.6)',
                ]
                 
                }
              ]
            }}

              options={{
                title: {
                  display: true,
                  text: 'Line Chart'
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        min: 100,
                        max: 1000,
                        stepSize: 100
                      }
                    }
                  ]
                }
              }}
            />
           </div>
      </div>
    </div>
  );
};

export default LineChart;