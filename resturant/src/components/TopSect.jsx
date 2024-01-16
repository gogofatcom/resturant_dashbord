import React, { useState }  from "react"
import "./sidebar/sidebar.css";

import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";



function TopSect() {

  const [searchitem,setserahitem]=useState({
    type:'item',
    input:''
  })

  const handleInputChange = (e) => {
    const { name,  value } = e.target;
    setserahitem({
      ...searchitem,
      [name]: value,
    });

    
  };
  const navigat=useNavigate();

    const redictmoviesearch = (id) => {
      navigat(`/search/${id}`);
      console.log("navigate to search detial");
      console.log(id)
    }
    
    const redictcatgyesearch = (id) => {
      navigat(`/searchcatgy/${id}`);
      console.log("navigate to search detial");
      console.log(id)
    }

  
  return (
    <>
    <div className=" d-flex   justify-content-between ">
        <div className=" ms-3  mt-3">
          <div className="">
            <p className="font-semibold text-base">Hello 👋</p>
        </div>
       </div> 
         <div>
          <div className="  d-flex   ">
                <div className=" w-100 mt-2">
                   <input type="text"  name="input" value={searchitem.input} onChange={handleInputChange} className="form-control mt-1 " />
                </div>

                <div class=" d-flex w-100 mt-2 me-4 ">
                   
                
            
               <Form.Control className=" border  border-dark  bg-dark  m-2 "
              as="select"
              name="type"
              value={searchitem.type}
              onChange={handleInputChange}>
             
           
              <option key="item" value='item'>item </option>
              <option key="catagrey" value="catagrey">catagrey</option>

              
             </Form.Control>
                <div >
                    <button className="btn btn-outline-warning p-2 mt-2 " 
                    onClick={()=>{

                      console.log(searchitem.type);
                      console.log(searchitem.input);
                      if(searchitem.type == 'item'){
                       redictmoviesearch(searchitem.input);
                      }else
                      redictcatgyesearch(searchitem.input);
                       
                         
                    }}
                    > Search </button>
                </div>
                    
                
         </div>

         </div>

          </div>
          
       
      

        </div>
    </>
  );
}

export default TopSect;