import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Pillmodal() {

const [showmodel,setShowmodel]=useState(true);

const params = useParams();
console.log("xxxxxx")
// console.log(props.item);
const [currentDate, setCurrentDate] = useState(new Date());
const formattedDate = currentDate.toLocaleString();

    return (
        <>
  <Modal show={showmodel} onHide={() => setShowmodel(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
        <Modal.Header closeButton>
          <Modal.Title> 
            TABLE 
           {formattedDate}
           CHECK# 1285   TABLE# 05
           </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <table className="      " >
              <thead className="  ">
                <tr>
                  <th scope="col">  Id   </th>
                  <th scope="col">Name</th>
                  <th scope="col"> Show catagrey </th>
                  <th scope="col">   </th>




                </tr>
              </thead>
              {

                catagyres.map((cat) => (
                  <tbody>
                    <td> {cat.id}</td>
                    <td> {cat.name}  </td>
                    <td>
          
                    </td>

                  </tbody>
                ))
              }
            </table>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className=" mt-2 rounded p-2" onClick={() => setShowmodel(false)}>
            Close
          </Button>
          {/* <button type="button" onClick={() => {
           
          }} class="btn btn-danger  mt-2 rounded p-2"> Confirm </button> */}
        </Modal.Footer>
      </Modal>
           
        </>
    )
}