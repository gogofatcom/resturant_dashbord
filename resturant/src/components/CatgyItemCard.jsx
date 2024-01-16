import React from "react"
import { useParams } from "react-router-dom";

export default function CatgyItemCard({item}){
    const params = useParams();

    const style = {
        width: '7rem',
        hight:'4',
    }
   
    return(
    <>
    <div className="card inline-block  bg-danger m-1   bg-opacity-80 text-white" style={style}>
                <div className="card-body   " >
                    
                    <h6 className="card-title  mt-4"> </h6>
                    <h6 className="card-title  mt-4"> 5.50 $ </h6>


                    {/* <a href="#" className="card-link "> table detial </a> */}
                </div>
            </div>



    </>)
}