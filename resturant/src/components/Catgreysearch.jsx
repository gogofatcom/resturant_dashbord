import React, { useEffect, useState } from "react"
import "../pages/Orderspag/orderlist.css"
import axios from "axios";
import { API_URL } from "../BaseUrl";
import { Await, useParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import SideBar from "./sidebar/SideBar";
import TopSect from "./TopSect";




export default function Catgreysearch() {
  const divStyle = {
    marginLeft: '100px',
    height: '100vh',
    background: '#1F1D2B',

  };

  const [searchitem, setserahitem] = useState({

    input: ''
  })


  const handleInputChangesearch = (e) => {
    const { name, value } = e.target;
    setserahitem({
      ...searchitem,
      [name]: value,
    });


  };

  const [catagyres, setCatagres] = useState([]);
  const [showModaldelet, setShowModaldelet] = useState(false);
  const [catagytoedit, setCatagytoedit] = useState();
  const [showModal, setShowModal] = useState(false);
  const [catId, setcatId] = useState();
  const [category, setCategory] = useState({
    id: '',
    name: '',
    image: null,
  });

  const params = useParams();
  console.log("proms=" + params.name);

  const showcatagres = async (cat) => {
    try {
      const response = await fetch(`${API_URL}/searchcatgy/?q=${cat}`);
      const data = await response.json();
      setCatagres(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }

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
        stats_show: catagytoedit.stats_show || true,
      });
    }
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCategory({
      ...category,
      [name]: files ? files[0] : value,
    });

  };

  const handleEditCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', category.name);

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

    showcatagres(params.name);


  }, [])

  const deletecatagyre = (id) => {
    const response = fetch(`${API_URL}/catagyres/${id}/`, {
      method: 'DELETE',

    });
  }


  return (
    <>
      <SideBar />
      <div style={divStyle} >

        <div className=" d-flex   justify-content-between ">
          <div className=" ms-3  mt-3">
            <div className="">
              <p className="font-semibold text-base">Hello 👋</p>
            </div>
          </div>
          <div>
            <div className=" d-flex    ">
              <div className="w-100  mt-2">
                <input type="text" name="input" value={searchitem.input} onChange={handleInputChangesearch} className="form-control mt-1 " />
              </div>

            
                <div >
                  <button className="btn btn-outline-warning p-2 m-3 "
                    onClick={() => {

                      console.log(searchitem.input);
                      showcatagres(searchitem.input);


                    }}
                  > Search </button>
                </div>


              

            </div>

          </div>




        </div>

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

                        <label className="  m-4 " >
                          <input type="checkbox" className="m-2" />

                          show
                        </label>

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
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
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
          <Modal.Title>Delete Item ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p className="text_dark " > Delete Item ? </p>


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