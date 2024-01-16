import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import './css/style.css'
import axios from "axios";
import { API_URL } from "../../BaseUrl";
import { AppContext, MyContext } from "../../AppContext";


const LoginPag = ({ setToken }) =>{

  const { user, setuser } = useContext(MyContext);
	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8000/token-auth/', {
  //       username: username,
  //       password: password,
  //     });

  //     // Assuming the backend returns a token
  //     const token = response.data.access;
  //     setToken(token);
  //    navigateHome();
  //     // Save the token in local storage or cookies for future requests

  //   } catch (error) {
  //     // Handle login failure
  //   }
  // };

 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleSubmit = (e) => {
  e.preventDefault();

  // Send login request to the API
  fetch('http://127.0.0.1:8000/token/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data =>
    {
      console.log('User logged in successfully:', data);
     

    setuser(data.username);
    
      console.log(user);

    }
  ) 
  .catch(error => console.error('Error logging in:', error));
  
  navigateHome();
};



    const navigate = useNavigate();

    const navigateHome = () => {
		// 👇️ navigate to /
		navigate('/home');
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
					<h2 className="heading-section mt-4">Loge in </h2>
			    	</div>

                    <div className="row justify-content-center">
				<div className="col-md-6 col-lg-4">
					<div className="login-wrap p-0">
		      
		      	<form  className="signin-form"  onSubmit={handleSubmit} >
		      		<div className="form-group">
		      			<input type="text" className="form-control" 
                                       
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                
                  placeholder="Username" required />
		      		</div>
	            <div className="form-group">
	              <input id="password-field" type="password" class="form-control" 
               
                name="password"
                value={formData.password}
                onChange={handleChange}  
                  placeholder="Password" required />
	              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
	            </div>
	            <div className="form-group">
	            	<button  type="submit"   className="form-control btn btn-primary submit px-3">Sign In</button>
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
