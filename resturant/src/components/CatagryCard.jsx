import React, { useState } from "react"
import { Link } from "react-router-dom";
import CatgyItemCard from "./CatgyItemCard";
import OrderPagef from "../pages/Orderspag/OrderPagef";

export default function CatagryCard( props){
    const [catgyId,setCatgyId]=useState();

    const catgstyle = {
        width: '7rem',
    }
    const imgstyle={
        width:'3rem',
        hight:'2rem',
        
    }
    console.log("catgrescard")
    console.log(props.catgres);
    console.log(catgyId);


    return(
    <>
    <div className="card inline-block  bg-dark m-1  bg-opacity-80 text-white" style={catgstyle} 
          onClick={()=>(
            setCatgyId(props.catgres.id)
          )} >
       
       
                <div className="card-body text-center" >
                    <img src="/images/someone.jpeg" style={imgstyle}   />
                    <h6 className="card-title  mt-2"> {props.catgres.name} </h6>

                    {/* <a href="#" className="card-link "> table detial </a> */}
                </div>
          
     </div>



    </>)
}