import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";

export default function TableCard(props ) {
   
    const navigate=useNavigate();
     
   
    const navigateOrder = () => {
		// 👇️ navigate to /
		navigate(`/order/${props.tabl.id}` );
	  };

    const params = useParams();
    console.log("xxxxxx")
    console.log(props.tabl);
   

    const style = {
        width: '13rem'
    }

    useEffect(()=>{
    
      
    },[])


    return (
        <>

            <div className="card inline-block  position-relative bg-dark m-4  p-4  bg-opacity-50 text-white" style={style}
             onClick={()=>{
                console.log("xxxxxx")
                console.log(props.tabl);
                 navigateOrder();
            
            //    handleOpenOrderPage(props.tabl.id);

             }}
            >
                <div className="card-body  text-center " >
                    <h3 className="card-title">  {props.tabl.name} </h3>

                    <h6 href="#" className="card-link "> {props.tabl.tableDetial }
                     </h6>
                </div>
              {
               props.tabl.status_Busy &&
                <span class="position-absolute top-0 start-100 translate-middle badge  bg-danger">
                    Busy 
                 <span class="visually-hidden">unread messages</span>
                 </span>

              }
                
            </div>
        </>
    )
}