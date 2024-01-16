import React, { useEffect, useState } from "react"
import "../pages/Orderspag/orderlist.css"
import axios from "axios";
import { API_URL } from "../BaseUrl";
import { Await } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";




export default function CatagresListTable() {

  const [catagyres, setCatagres] = useState([]);
  const [showModaldelet, setShowModaldelet] = useState(false);
  const [catagytoedit, setCatagytoedit] = useState();
  const [showModal, setShowModal] = useState(false);
  const [catId, setcatId] = useState();
  const [category, setCategory] = useState({
    id: '',
    name: '',
    image: null,
    status_Show: '',

  });

  const showcatagres = async () => {
    axios.get(`${API_URL}/catagyres/`).then((response) => {
      setCatagres(response.data);
    });
    console.log(catagyres)

  }
  const getcatgyId = async (id) => {
    axios.get(`${API_URL}/catagy/${id}`).then((response) => {
      setCatagytoedit(response.data);
    });
    console.log("??????????")
    console.log(catagytoedit)

  }

  const editcatgry = () => {
    if (catagytoedit) {
      setCategory({
        id: catagytoedit.id,
        name: catagytoedit.name,
        image: null,
        status_Show: catagytoedit.status_Show || true,
      });
    }
  }

  const handleInputChange = (e) => {
    const { name, value, files ,type, checked } = e.target;
    setCategory({
      ...category,
      [name]:type === 'checkbox' ? checked: files ? files[0] : value,
    });

  };

  const handleEditCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('status_Show', category.status_Show );
   

    if (!category.image) {
      formData.append('image', catagytoedit.image);
    } else {
      formData.append('image', category.image);
    }


    axios.put(`${API_URL}/catagyres/${category.id}/`, formData, {
      headers: {

        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        // onCategoryUpdated(response.data);
        setShowModal(false);
      })

    showcatagres();
  };




  useEffect(() => {

    showcatagres();


  }, [])

  const deletecatagyre = (id) => {
    const response = fetch(`${API_URL}/catagyres/${id}/`, {
      method: 'DELETE',

    });
  }


  return (
    <>

      <div  >


        <div className="row  text-light   text-center   shadow-lg m-2  rounded ">
          <div className=" row col-lg-12    ">

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
                      <div>
                        
                          { cat.status_Show ? (
                            <label className="m-4">
                              <input type="checkbox" className="m-2" checked />
                              Show
                            </label>
                          ):
                           (
                        <label className="m-4">
                          <input type="checkbox" className="m-2" />
                          Show
                        </label>
)}


                      </div>
                    </td>

                    <button className=" btn btn-outline-success mb-4 rounded " onClick={() => {
                      setShowModal(true);
                      getcatgyId(cat.id);
                      editcatgry();
                      setShowModal(true);


                    }} > edit  </button>
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
      </div>


      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        style={{ zIndex: '3000' }} >
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCategory}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control className="border rounded border-d bg-secondary"
                type="text"
                name="name"
                value={category.name}
                onChange={handleInputChange}

              />
              {/* <Form.Control.Feedback type="invalid">{errors.name || backendErrors.name}</Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group controlId="categoryImage">
              <Form.Label>Category Image</Form.Label>
              <Form.Control className=" border rounded border-d bg-secondary"
                type="file"
                name="image"
                onChange={handleInputChange}

              />
              
              {/* <Form.Control.Feedback type="invalid">{errors.image || backendErrors.image}</Form.Control.Feedback> */}
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" name="status_Show" label="show catagry" onChange={handleInputChange} className='m-4 text-dark ' />
      </Form.Group>

            <button  className="btn btn-danger  rounded p-2"  type="submit">
              Save Changes
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* ///  confirm delet catagrey */}
      <Modal show={showModaldelet} onHide={() => setShowModaldelet(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
        <Modal.Header closeButton>
          <Modal.Title>Delete Catagrey ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p className="text_dark " > Delete Catagrey? </p>


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