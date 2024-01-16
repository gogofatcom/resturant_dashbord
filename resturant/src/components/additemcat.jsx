import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function additemcat() {
  const [book, setBook] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    cover_page: null,
    pages: 0,
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});


  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setBook({
      ...book,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (book.name.length < 5) {
      newErrors.name = 'Name must be at least 5 characters';
    }
    if (book.description.length < 20) {
      newErrors.description = 'Description must be at least 50 characters';
    }


    if (!book.category) {
      newErrors.category = 'Category must be selected';
    }
  
    if (!book.cover_page) {
      newErrors.cover_page = 'Please upload a cover page';
    }
  
  
    if (book.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (book.stock < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }

    if (book.pages <= 0) {
      newErrors.pages = 'Pages must be greater than 0';
    }

    if (!book.cover_page) {
      newErrors.cover_page = 'Please upload a cover page';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', book.name);
    formData.append('description', book.description);
    formData.append('price', book.price);
    formData.append('stock', book.stock);
    formData.append('category', book.category);
    formData.append('cover_page', book.cover_page);
    formData.append('pages', book.pages);

    axios.post('http://localhost:8000/api/create-book/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        onBookAdded(response.data);
        setBook({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          category: '',
          coverPage: null,
          pages: 0,
        });
        handleClose(); // Close the modal after successful addition
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          const newErrors = {};

          if (errorData.name) {
            newErrors.name = errorData.name;
          }
          if (errorData.description) {
            newErrors.description = errorData.description;
          }
          if (errorData.price) {
            newErrors.price = errorData.price;
          }
          if (errorData.stock) {
            newErrors.stock = errorData.stock;
          }
          if (errorData.category) {
            newErrors.category = errorData.category;
          }
          if (errorData.cover_page) {
            newErrors.cover_page = errorData.cover_page;
          }
          if (errorData.pages) {
            newErrors.pages = errorData.pages;
          }

        setBackendErrors(errorData);
        setErrors(newErrors); // Clear any existing frontend validation errors
              }
        console.error('Error adding book:', error);
      });
  };

  return (
    <>

<div className="modal " id="exampleModalitem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Add new item  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                  <form>
                    <div className="d-flex justify-content-between ">
                      <div   >
                        <label className=" text-dark" > Item Name </label> {<br />}
                        <input type="text" />
                      </div>
                      <div>
                        <label className=" text-dark m-4" >   <input type="checkbox" className="m-2" />

                          show item  </label>

                      </div>

                    </div>

                    <div>
                      <label className=" text-dark" > Purchasing price </label> {<br />}
                      <input type="number" />
                    </div>

                    <div>
                      <label className=" text-dark" > selling price </label> {<br />}
                      <input type="number" />
                    </div>

                    <div>
                      <label className=" text-dark" >Qualinity </label> {<br />}
                      <input type="number" />
                    </div>

                    <div className="dropdown mt-4">
                      <button className="btn btn-secondary  rounded  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Packing type
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Pill </a></li>
                        <li><a class="dropdown-item" href="#">carton</a></li>

                      </ul>
                    </div>

                    <div className="dropdown mt-4">
                      <button className="btn btn-secondary  rounded  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        catagrey name
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#"> hot drinks </a></li>
                        <li><a class="dropdown-item" href="#">cold</a></li>
                        <li><a class="dropdown-item" href="#">fresh </a></li>
                      </ul>
                    </div>
                  </form>

                </div>

                <div className="modal-footer">
                  <button className="button  btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button className="button  btn-danger" onClick={ ()=> hideModal}  >Save </button>
                </div>
              </div>
            </div>
          </div>
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddBook}>
          <Form.Group controlId="bookName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={book.name}
              onChange={handleInputChange}
            />
            {errors.name && <Form.Text className="text-danger">{errors.name || backendErrors.name}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="bookDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={book.description}
              onChange={handleInputChange}
            />
            {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="bookPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={book.price}
              onChange={handleInputChange}
            />
            {errors.price && <Form.Text className="text-danger">{errors.price}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="bookStock">
            <Form.Label>Stock:</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={book.stock}
              onChange={handleInputChange}
            />
            {errors.stock && <Form.Text className="text-danger">{errors.stock}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="bookCategory">
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={book.category}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Control>
            {errors.category && <Form.Text className="text-danger">{errors.category}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="bookCoverPage">
            <Form.Label>Cover Page:</Form.Label>
            <Form.Control
              type="file"
              name="cover_page"
              onChange={handleInputChange}
            />
            {errors.cover_page && <Form.Text className="text-danger">{errors.cover_page}</Form.Text>}
            </Form.Group>
          <Form.Group controlId="bookPages">
            <Form.Label>Pages:</Form.Label>
            <Form.Control
              type="number"
              name="pages"
              value={book.pages}
              onChange={handleInputChange}
            />
            {errors.pages && <Form.Text className="text-danger">{errors.pages}</Form.Text>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Book
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
     {/* { showModal &&    <div className="modal fade"    id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add new Category </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <form  enctype="multipart/form-data" >
                  <label className="m-4   text-dark" >Category name </label> 
                  <input type="text"  
                  name="name"
                   onChange={(e) => {
                            handleChange(e);
                        }}
                    isInvalid={!!errors.name}
                    value={category.name} 
                    required />

                  <label className="m-4  text-dark" >Category image  </label>  
                  <input  type="file"
                name="image"
                accept="image/jpeg,image/png,image/gif"
               onChange={(e) => {
                            handleImageChange(e);
                        }}
                isInvalid={!!errors.image}  />

                  <div>
                  <label className=" text-dark m-4" >   <input type="checkbox"  
                   onChange={handlechecked} className="m-2" />
                  
                  show Category </label> 
                 
                  </div>
                  
             </form>
                
              </div>

              <div className="modal-footer">
                <button className="button  btn-secondary" data-bs-dismiss="modal">Close</button>
                <button  onClick={addcatagrey }  className="button  btn-danger">Add Category </button>
              </div>
            </div>
          </div>
        </div>} */}
</>
    
  );
}

export default additemcat;
