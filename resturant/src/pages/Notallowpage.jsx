import React, { useEffect, useState } from "react"
import "./Orderspag/orderlist.css"
import SideBar from "../components/sidebar/SideBar";
import axios from "axios";
import { API_URL } from "../BaseUrl";




const Notallowpage = () =>{
 
    const divStyle = {
        marginLeft: '100px',
        height: '100vh',
        background: '#1F1D2B',
    
      };
     

    
    

      
 return(
     <>
         
        <div style={divStyle}  >
        <h1 className="  text-center text-light ">   غير مسموح بدخول    </h1> 
            
    </div>
 </>
    )
}
export default Notallowpage;