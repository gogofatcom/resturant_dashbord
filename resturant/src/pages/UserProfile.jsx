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
    
    // console.log(user);

    useEffect(() => {
      

      fetchUserProfile();

    
       
      }, []);
    
      
 return(
     <>
         <SideBar/>
        <div style={divStyle}  >
        <h1 className="  text-center text-light ">   User Profile    </h1> 
            <div className="row  text-light  text-right   m-4  shadow-lg rounded  ">
                
                <img src="/images/someone.jpeg"  style={imgstyle}   alt="" />

                <h5 className="text-light mt-4 ">  {userData.first_name} : الاسم  </h5>
                <p  className="text-light  ">  {userData.email}  الايميل </p>

                <div>
      
    </div>
                
           </div>
    </div>
 </>
    )
}
export default UserProfile;
