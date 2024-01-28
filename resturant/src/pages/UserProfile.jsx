import React, { useEffect, useState } from "react"
import "./Orderspag/orderlist.css"
import SideBar from "../components/sidebar/SideBar";
import axios from "axios";
import { API_URL } from "../BaseUrl";



const UserProfile = ({ token }) =>{
 
    const divStyle = {
        marginLeft: '100px',
        height: '100vh',
        background: '#1F1D2B',
    
      };
      const imgstyle={
        width:'5rem',
        hight:'6rem',
        
    }
    const [userData, setUserData] = useState();
   

    const fetchUserProfile = async () => {
      try {
        const storedData = localStorage.getItem('token');
        // const token = Cookies.get('access_token');
        const response = await axios.get(`${API_URL}user/`, {
          headers: {
            Authorization: `Bearer ${storedData}`,
          },
        });
        console.log('User profile:', response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    useEffect(() => {
      

      fetchUserProfile();

        // const headers = {
        //   'Authorization': `Bearer   ${storedData}`,
        // };
        
        // const response = axios.get(`${API_URL}user/`, { headers });
        
        // // Handle the response or catch any errors
        // response.then((result) => {
        //   console.log(result.data); // Handle the successful response
        // }).catch((error) => {
        //   console.error(error.response.data); // Log the error response
        // });
        //     setUserData(response.data);
        //   console.log(response.data);
    
       
      }, []);
    
  
 return(
     <>
         <SideBar/>
        <div style={divStyle}  >
        <h1 className="  text-center text-light ">   User Profile    </h1> 
            <div className="row  text-light   m-4  shadow-lg rounded  ">
                
                <img src="/images/someone.jpeg"  style={imgstyle}   alt="" />
                <h5 className="text-light">Name </h5>
                <h5 className="text-light  "> Username : admin </h5>
                <p  className="text-light  ">Email: </p>

                
           </div>
    </div>
 </>
    )
}
export default UserProfile;
