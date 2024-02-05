import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import './css/style.css'
import axios from "axios";
import { API_URL } from "../../BaseUrl";



const LoginPag = () =>{
  const navigate = useNavigate();

    const navigateHome = (usename) => {
		// 👇️ navigate to /
		navigate('/home',{ state: { yourData: usename } });
	  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
});

const [error, setError] = useState('');
const [user, setUser] = useState(null);

const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
const [userData, setUserData] = useState([]);

const handleLogin = async (e) => {
  e.preventDefault();

    try {
        const response = await axios.post(`${API_URL}/api/v1/auth/jwt/create/`, formData);
        // Cookies.set('access_token', response.data.access_token, { expires: 7 }); 
      console.log(response.data); // handle successful login
         localStorage.setItem('token', response.data.access);
        
        console.log(localStorage.getItem('token'));
 fetchUserProfile();


      
    navigateHome(userData.first_name);
       
    } catch (error) {
        console.error('Login failed:', error.response.data);
        // Handle login failure (show error message, etc.)
        setError('Invalid email or password'); 
    }

};


  
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



    
      const style={
        backgroundImage: "url(/images/bgcoff.jpg)",
        height: '100vh',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
         backgroundSize: 'cover',}



 
    return (<>

            <div className="    ">
                 <div  className=""  style={style}>
  
                   <div  className="row   align-items-center  justify-content-center ">
				    <div className="col-md-6 text-center mt-4 mb-5">
					<h2 className="heading-section mt-4">تسجيل الدخول </h2>
			    	</div>

                    <div className="row justify-content-center">
				<div className="col-md-6 col-lg-4">
					<div className="login-wrap p-0">
		      
		      	<form  className="signin-form"  onSubmit={handleLogin} >
		      		<div className="form-group">
		      			<input type="text" className="form-control" 
                                       
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                
                  placeholder="الايميل" required />
		      		</div>
	            <div className="form-group">
	              <input id="password-field" type="password" class="form-control" 
               
                name="password"
                value={formData.password}
                onChange={handleInputChange}  
                  placeholder="الرقم السرى " required />
	              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
	            </div>
	            <div className="form-group">
	            	<button  type="submit"   className="form-control btn btn-primary submit px-3">Login </button>
	            </div>
	            <div className="form-group d-md-flex">
	            	<div className="w-50 ms-4">

                    <label className="checkbox-primary ">
                    <input type="checkbox"  className="m-2" />
                        Remember Me
									  
									  <span className="checkmark"></span>
									</label>
                            
                    
								</div>
								<div className="w-50 text-md-right m-1">
									<a href="#" >Forgot Password</a>
								</div> 
	            </div>

              {error && <p style={{ color: 'red'  }}>{error}</p>}

	          </form>
	           
		      </div>
				</div>
			</div>

			</div>

                 </div>
                
            </div> 
    </>
        

    )
}
export default LoginPag;
