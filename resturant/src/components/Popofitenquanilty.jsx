import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Popofitenquanilty(props) {

const [showmodel,setShowmodel]=useState(true);

const params = useParams();
console.log("xxxxxx")
console.log(props.item);

    return (
        <>
  <Modal show={showmodel} onHide={() => setShowmodel(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
        <Modal.Header closeButton>
          <Modal.Title> تنبية هام   </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <h2 className="text_dark " >   {props.item} </h2>
          <h4 >  الرجاء امتدادالعنصر بمزيد من الكميات حيث اوشك على الانتهاء </h4>

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