import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import './css/style.css'
import axios from "axios";
import { API_URL } from "../../BaseUrl";



const RegistionPage = () => {

  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/login');
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/register/`, formData ,
     {
      headers : {
        "Content-type": "application/json"
    }
     }
      );
      console.log('Registration successful:', response.data);
      navigateHome();
      // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle error, show error message, etc.
    }
  };


 
  const style = {
    backgroundImage: "url(/images/bgcoff.jpg)",
    height: '100vh',

    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }




  return (<>

    <div className="    ">
      <div className="" style={style}>

        <div className="row   align-items-center  justify-content-center ">
          <div className="col-md-6 text-center mt-4 mb-5">
            <h2 className="heading-section mt-4"> Registion   </h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">

                <form className="signin-form" onSubmit={handleSubmit} >
                  <div className="d-flex " >
                    <div className="form-group me-4">
                      <input type="text" className="form-control"

                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}

                        placeholder="First Name" required />
                    </div>
                    <div className="form-group me-4">
                      <input type="text" className="form-control"

                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}

                        placeholder="last Name" required />
                    </div>
                   
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control"

                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}

                      placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <input id="password-field" type="password" class="form-control"

                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password" required />

                    <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary submit px-3">Sign In</button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50 ms-4">

                      <label className="checkbox-primary ">
                        <input type="checkbox" className="m-2" />
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
export default RegistionPage;
