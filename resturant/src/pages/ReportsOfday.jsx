import React, { useEffect, useState } from "react"

import SideBar from "../components/sidebar/SideBar";
import axios from "axios";
import { API_URL } from "../BaseUrl";




export default function ReportsOfday() {
    const divStyle = {
        marginLeft: '100px',
        height: '100vh',
        background: '#1F1D2B',
    
      };
      const storedData = localStorage.getItem('token');
      console.log(storedData);
      

    const [isCollapsed, setIsCollapsed] = useState({});
    const [orders,setorders]=useState([]);
    const [user, setUser] = useState(null);

useEffect(()=>{
  document.body.style.overflow = "scroll";
  
        axios.get(`${API_URL}/orderx/`).then((response) => {
             setorders(response.data);
           });
    getUserdata();
         },[])
   
        //  console.log(orders);
   

 
  const toggleRow = (orderId) => {
    setIsCollapsed((prevCollapsedRows) => ({
      ...prevCollapsedRows,
      [orderId]: !prevCollapsedRows[orderId],
    }));
  };

  const second_USER_INFO = `${API_URL}api/v1/auth/users/info/`
   const getUserdata = async ()=>{

    // const token = localStorage.getItem('token');  // Replace with your actual token
    const config = {
      headers: {
          'Authorization': `Bearer ${storedData}`,
      }
  }

  const response = await axios.get(second_USER_INFO, config)
  if (response.data) {
      localStorage.setItem("user_data", JSON.stringify(response.data))
  }
     console.log(response.data);


  

   }

  const bgcol = { background: '#1F1D2B', };
  
 return(
     <>
         <SideBar/>
        <div style={divStyle}  >
               
            <div  style={bgcol} className="row  text-light   text-center    rounded ">
                <h1 className=" text-light  ">  Report Of Day   </h1>
                <div className=" row col-lg-11 p-4  ">
              

                    <table className="table table-striped table-dark  ms-4 p-4 " >
                        <thead className="  ">
                            <tr>
                            <th scope="col">  Id   </th>
                                <th scope="col">Name</th>
                                <th scope="col"> price </th>
                                <th scope="col"> Payment   </th>
                                
            
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                        
                      {
                        orders.map((order)=> (

                            <tbody   >
                            <tr onClick={() => toggleRow(order.id)} >
                               
                            <td>{ order.id }</td>
                               
                            <td> order { order.id}  </td>
                                
                            <td>  {order.totalcost}   $  </td>
                            <td>{ order.paymentType}</td>
                            
                            </tr>

                            {isCollapsed[order.id] && (
                                <tr colSpan="4">
                             {/* <td > */}
            
                                  {/* item : {  order.food_item.name } </td>
                               <td>quanility {  order.food_item.quanilty } </td> */}
                                 <td> create  at  {order.created_at} </td>
                                 <td> table No  {order.tableNumber} </td>
                                 <td> create  at  {order.create_at} </td>
                                 <td> add by  {order.adduser} </td>


           
                                 </tr>
                                  )}
                            
                           

                           
                        </tbody>
                        

                        ))
                      }
                       
                        
                            
                      

                       
                    </table>
                </div>
                

            </div>
            <hr />
            <div className=" d-flex  ">
                <h3 className=" ml-auto m-4 text-light"> Total </h3>
                <h3 className="m-4  text-light"> 428.5 $ </h3>
            </div>
            <div className=" d-flex  ">
                <h3 className=" ml-auto m-4 text-light"> Total of cash  </h3>
                <h3 className="m-4  text-light"> 428.5 $ </h3>
            </div>
            <div className=" d-flex  ">
                <h3 className=" ml-auto m-4 text-light"> Total of visa </h3>
                <h3 className="m-4  text-light"> 428.5 $ </h3>
            </div>

           

    </div>
    
 </>
    )}
