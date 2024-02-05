import React, { useEffect, useState } from "react"

import SideBar from "../components/sidebar/SideBar";
import axios from "axios";
import { API_URL } from "../BaseUrl";
import ReportforEmpolyee from "./ReportforEmpolyee";




export default function ReportsOfday() {
  const divStyle = {
    marginLeft: '13vh',
    height: '100vh',
    background: '#1F1D2B',

  };


  const [isCollapsed, setIsCollapsed] = useState({});
  const [orders, setorders] = useState([]);
  const [orderUser, setorderUser] = useState([]);
  const [timeRange, setTimeRange] = useState('last_24_hours');


  const [userData, setUserData] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const storedData = localStorage.getItem('token');
      console.log(storedData);
      // const token = Cookies.get('access_token');
      const response = await axios.get(`${API_URL}/api/v1/auth/users/info`, {
        headers: {
          'Authorization': `Bearer ${storedData}`,
        },
      });
      console.log('User profile:', response.data);
      setUserData(response.data);

    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };


  useEffect(() => {


    fetchUserProfile();
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/orderx/?time_range=${timeRange}`);
        setorders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();

  }, [timeRange])

  console.log(orders);
  console.log(timeRange)



  const fetchreportofUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/reportuser`);
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

  return (
    userData.is_superuser ? (
      <>

        <SideBar />
        <div style={divStyle}  >

          <div style={bgcol} className="row  text-light   text-center    rounded ">
            <h1 className=" text-light  ">  التقارير  </h1>
            <div>



              <select className="w-25 p-1" value={timeRange} onChange={(e) => setTimeRange(String(e.target.value))}>
                <option value="last_24_hours">اليومى </option>
                <option value="last_7_days">الاسبوعى </option>
                <option value="last_30_days">الشهرى</option>
                <option value="last_year">السنوى </option>
              </select>


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
                  orders.map((order) => (

                    <tbody   >
                      <tr onClick={() => toggleRow(order.id)} >

                        <td>{order.id}</td>

                        <td> order {order.id}  </td>

                        <td>  {order.totalcost}   $  </td>
                        <td>{order.paymentType}</td>

                      </tr>

                      {isCollapsed[order.id] && (
                        <tr colSpan="4">
                          {/* <td > */}

                          {/* item : {  order.food_item.name } </td>
                               <td>quanility {  order.food_item.quanilty } </td> */}
                          <td> create  at  {(order.created_at).toLocaleString()} </td>
                          <td> table No  {order.tableNumber} </td>

                          <td> add by  {order.adduser} </td>



                        </tr>
                      )}
                    </tbody>


                  ))
                }

              </table>
            </div>
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

         



        </div>

      </>) : (<ReportforEmpolyee user={userData.first_name} />)


  )
}
