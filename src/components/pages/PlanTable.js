import React, { useMemo, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useTable } from 'react-table';
import { COLUMNS } from './columns';
import './table.css';
import axios from "axios";

export const PlanTable = () => {
  const [plannedAmount, setPlannedAmount] = useState([]);
  const columns = useMemo(() => COLUMNS, [])
  const history = useHistory();


  const chart = () => {
        axios
          .get("http://localhost:5000/budgetPlan/all", {headers: {
            "auth-token" : localStorage.getItem("uauth-token")
          }})
          .then(res => {
            console.log(res);
            const planObj = res.data;
            console.log("planOBJ",planObj);
            setPlannedAmount(planObj);
          })
          .catch(err => {
            console.log(err);
          });
          
      };
    
      useEffect(() => {
        chart()
      }, []);
    

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: plannedAmount
  })
  const table = () => history.push("/spentTable");
  return (
    <>
        <h1>Budget Planned </h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="budgetbutton">
                <button onClick={table}>Expenses Table</button>
        </div>
    </>
  )
}

export default PlanTable;