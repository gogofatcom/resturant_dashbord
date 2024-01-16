import React, { useEffect, useState } from "react"
import "./Orderspag/orderlist.css"
import SideBar from "../components/sidebar/SideBar";
import axios from "axios";
import { API_URL } from "../BaseUrl";



const UserProfile = ({ token }) =>{
    // const [userProfile, setUserProfile] = useState(null);

    // useEffect(() => {
    //   const fetchUserProfile = async () => {
    //     try {
    //       const response = await axios.get(`${API_URL}/api/users/`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
  
    //       setUserProfile(response.data[0]); // Assuming there's only one user for simplicity
  
    //     } catch (error) {
    //       // Handle error
    //     }
    //   };
  
    //   if (token) {
    //     fetchUserProfile();
    //   }
  
    // }, [token]);
    const divStyle = {
        marginLeft: '100px',
        height: '100vh',
        background: '#1F1D2B',
    
      };
      const imgstyle={
        width:'5rem',
        hight:'6rem',
        
    }
  
 return(
     <>
         <SideBar/>
        <div style={divStyle}  >
        <h1 className="  text-center text-light ">   User Profile    </h1> 
            <div className="row  text-light   m-4  shadow-lg rounded  ">
                
                <img src="/images/someone.jpeg"  style={imgstyle}   alt="" />
                <h5 className="text-light">Name : Ahmed  </h5>
                <h5 className="text-light  "> Username : admin </h5>
                <p  className="text-light  ">Email:</p>

                
           </div>
    </div>
 </>
    )
}
export default UserProfile;
