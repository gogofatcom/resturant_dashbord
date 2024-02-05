import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes ,Navigate, useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import HomePage from './pages/HomePage';

import SettingPage from './pages/SettingPage';
import ReportsOfday from './pages/ReportsOfday';
import UserProfile from './pages/UserProfile';
import OrderPagef from './pages/Orderspag/OrderPagef';
import LoginPag from './pages/loginPage/LoginPag';
import Itemsearch from './components/Itemsearch';
import { MyContext } from './AppContext';
import Catgreysearch from './components/Catgreysearch';
import RegistionPage from './pages/loginPage/RegistionPage';
import { API_URL } from './BaseUrl';
import axios from 'axios';




function App() {

  // const [authenticated, setAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const navigate= useNavigate();
  // const checkAuthentication = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}api/check-auth/`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });

  //     if (response.ok) {
  //       setAuthenticated(true);
  //     } else {
  //       setAuthenticated(false);
  //     }
  //   } catch (error) {
  //     console.error('Error checking authentication:', error);
  //     setAuthenticated(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  return (
    <>
  
    <BrowserRouter>
   
    <Routes>
     
     
         <Route path="/" element={<RegistionPage />} />
          <Route path="/login" element={<LoginPag />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/order/:tableId" element={<OrderPagef />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/reports" element={<ReportsOfday />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/search/:name" element={<Itemsearch />} />
          <Route path="/searchcatgy/:name" element={<Catgreysearch />} />
    
    </Routes>
    </BrowserRouter>
     
     
     </>
  );
}

export default App;
