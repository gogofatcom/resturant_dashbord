
import React, { useEffect, useState } from "react"

import SideBar from "../components/sidebar/SideBar";
import axios from "axios";
import { API_URL } from "../BaseUrl";


export default function ReportforEmpolyee( props) {
    const divStyle = {
        marginLeft: '100px',
        height: '100vh',
        background: '#1F1D2B',
    
      };
     

    const [isCollapsed, setIsCollapsed] = useState({});
   
    const [orderUser,setorderUser]=useState([]);
    const [username,setUsername]=useState('');
   
   

useEffect(()=>{
 document.body.style.overflow = "scroll";
      setUsername(props.user);
          fetchreportofUser();
  
         },[props.user])
   
     console.log(props.user) ;  
   console.log(orderUser);


         const fetchreportofUser = async () => {
          console.log(username);
          try {
            const response = await axios.get(`${API_URL}/reportuser/?user=${props.user}`);
            setorderUser(response.data);
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
 
  const toggleRow = (orderId) => {
    setIsCollapsed((prevCollapsedRows) => ({
      ...prevCollapsedRows,
      [orderId]: !prevCollapsedRows[orderId],
    }));
  };

     

  const bgcol = { background: '#1F1D2B', };
  
 return(
     <>
         <SideBar/>
        <div style={divStyle}  >
               
            <div  style={bgcol} className="row  text-light   text-center    rounded ">
                <h1 className=" text-light  ">  التقارير  </h1>
                <div>
     
     
    </div>
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
                        orderUser.map((order)=> (

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
