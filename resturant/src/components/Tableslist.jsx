import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { API_URL } from "../BaseUrl";


export default function Tableslist(){
    const [catagyres, setCatagres] = useState([]);
    const [showModaldelet, setShowModaldelet] = useState(false);
    const [catId, setcatId] = useState();

    useEffect(()=>{
        showcatagres();
    },[])


    const showcatagres = async () => {
        axios.get(`${API_URL}/tables/`).then((response) => {
            setCatagres(response.data);
          });
    
      }

  const deletecatagyre = (id) => {
    const response = fetch(`${API_URL}/tables/${id}/`, {
      method: 'DELETE',

    });
  }

    return(
        <>

<div className="row  text-light   text-center   shadow-lg m-2  rounded ">
          <div className=" row col-lg-12    ">

            <table className="   " >
              <thead className="  ">
                <tr>
                  <th scope="col">  Id   </th>
                  <th scope="col">name</th>
                  <th scope="col"> detials </th>
                  <th scope="col">   </th>
                </tr>
              </thead>
              {

                catagyres.map((cat) => (
                  <tbody>
                    <td> {cat.id}</td>
                    <td> {cat.name}  </td>
                    <td>
                    {cat.tableDetial} 
                    </td>

                    
                    <button className=" btn btn-outline-danger mb-4 rounded ms-4 " onClick={() => {
                      setShowModaldelet(true)
                      setcatId(cat.id);
                      showcatagres();

                    }} > delete   </button>



                  </tbody>
                ))
              }
            </table>
          </div>

        </div>

        
      {/* ///  confirm delet catagrey */}
      <Modal show={showModaldelet} onHide={() => setShowModaldelet(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
        <Modal.Header closeButton>
          <Modal.Title>Delete  ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p className="text_dark " > Delete ? </p>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className=" mt-2 rounded p-2" onClick={() => setShowModaldelet(false)}>
            Close
          </Button>
          <button type="button" onClick={() => {
            showcatagres();
            deletecatagyre(catId);
            showcatagres();
            setShowModaldelet(false);
            showcatagres();
          }} class="btn btn-danger  mt-2 rounded p-2"> Confirm </button>
        </Modal.Footer>
      </Modal>
      
        </>
    )
}