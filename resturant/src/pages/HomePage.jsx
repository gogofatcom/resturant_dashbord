import React, { useEffect, useState }  from "react"
import SideBar from "../components/sidebar/SideBar"
import TableCard from "../components/TableCard"
import { API_URL } from "../BaseUrl";
import axios from 'axios';





export default function HomePage(){
    const divStyle = {
        marginLeft: '100px', 
        height: '100vh',
        background:'#1F1D2B'

      };
 
      const [tables,settable]=useState([]);

      useEffect(()=>{
     axios.get(`${API_URL}/tables/`).then((response) => {
          settable(response.data);
        });

      },[])
     console.log("tablesssssss")
           console.log(tables);

    return (
        <>
        <div   className="   bg-dark   ">
               <SideBar/>
              
                  <div  style={divStyle}  >
                <div className="flex justify-center items-center relative">
                 <h5  className="font-semibold text-white ms-4 ">Hello 👋</h5>
                      </div>

                     <div   className=" row   justify-content-md-center  p-4">
                             
                             {  
                             tables.map((table)=> (

                              <TableCard tabl={table} /> 
                              
                             ))
                                }
              
              {/* <TableCard/> 
              <TableCard/> 
              <TableCard/>
              <TableCard/>
              <TableCard/> 
              <TableCard/> 
              <TableCard/> */}
              
              </div>
            </div> 
              
              
               
        </div>
       


        </>
    )
}