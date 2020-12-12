import React, { useMemo, useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useTable } from 'react-table';
import { SPENTCOLUMNS } from './columnsSpent';
import './table.css';
import axios from "axios";

export const SpentTable = () => {
  const [spentAmount, setSpentAmount] = useState([]);
  const columns = useMemo(() => SPENTCOLUMNS, [])
  const { userData } = useContext(UserContext);
  const history = useHistory();


  const chart = () => {
          axios
          .get("http://localhost:5000/budgetSpent/all", {headers: {
            "auth-token" : localStorage.getItem("uauth-token")
          }})
          .then(res => {
            console.log(res);
            const spentObj = res.data;
            console.log("spentOBJ",spentObj);
            setSpentAmount(spentObj);
          })
          .catch(err => {
            console.log(err);
          });
          
      };
    
      useEffect(() => {
        if (!userData.user) history.push("/login");
        chart()
      });
    

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: spentAmount
  })
  
  return (
    <>
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
    </>
  )
}

export default SpentTable;