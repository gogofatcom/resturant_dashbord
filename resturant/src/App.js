import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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


function App() {
  const [token, setToken] = useState(null);
  const [user, setuser] = useState("");

  return (
    <>
       
        
 <MyContext.Provider value={{user,setuser}} >
    <BrowserRouter >
   

     <Routes>
      
     <Route path="/" element={<LoginPag />}/>
      <Route path="/home" element={<HomePage />} /> 
      <Route path="/order/:tableId" element={<OrderPagef />} />
      <Route path="/settings" element={<SettingPage />} /> 
      <Route path="/reports" element={<ReportsOfday />} />
      <Route path="/profile" element={<UserProfile />} />  
      <Route path="/search/:name" element={<Itemsearch />} />
      <Route path="/searchcatgy/:name" element={<Catgreysearch />} />

      
     </Routes>
    </BrowserRouter>
    </MyContext.Provider>
     
    </>
  );
}

export default App;
