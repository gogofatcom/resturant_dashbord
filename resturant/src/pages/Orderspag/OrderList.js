import React from "react"
import "./orderlist.css"
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";



export default function OrderList(props) {
    const  imgstyle  = {        
        height: '2rem',
      };
      
  
 return(
     <>
        
        <div  >
               
            <div className="row  text-light   text-center   shadow-lg m-2  rounded ">
                <div className=" row col-lg-12    ">
                    <div className="d-flex flex-row  justify-content-between" >
                    <h3 className=" text-start text-light">Order OF  T-05 </h3>
                    <button type="button" class="btn btn-danger rounded m-2 ">Cancel x </button>
                    </div>
                   
                    <table className="      " >
                        <thead className="  ">
                            <tr>

                                <th scope="col">Name</th>
                                <th scope="col">price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">   </th>
                                <th scope="col">Total </th>


                            </tr>
                        </thead>
                        <tbody>
                            <td>{props.order.item}</td>
                            <td>5.88</td>

                            <td>
                                <span className="m-4 fs-4 " >+ </span>
                                      1
                                <span className="m-4 fs-4 " > -  </span> 
                            </td>
                           

                            <td>5.04</td>

                            <img src="/images/deleteicon.png" style={imgstyle} className="mt-2" alt="delete" />


                        </tbody>
                        <tbody>
                            <td>Teaa</td>
                            <td>5.88</td>

                            <td>
                                <span className="m-4 fs-4 " >+ </span>
                                      1
                                <span className="m-4 fs-4 " > -  </span> 
                            </td>
                           

                            <td>5.88</td>
                            <img src="/images/deleteicon.png"  className="mt-2"  style={imgstyle} alt="delete" />


                        </tbody>
                    </table>
                </div>

            </div>
    </div>
 </>
    )
}