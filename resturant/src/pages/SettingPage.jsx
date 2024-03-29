import React, { useEffect, useState } from "react"
import SideBar from "../components/sidebar/SideBar"
import CatagresListTable from "../components/CatagresListTable";
import ItemsListTable from "../components/ItemsListTable";
import TopSect from "../components/TopSect";
import axios, { Axios } from "axios";
import { API_URL } from "../BaseUrl";
import "./orderpages.css";

import { Modal, Form, Button } from 'react-bootstrap';
import Tableslist from "../components/Tableslist";
import Notallowpage from "./Notallowpage";




export default function SettingPage() {


  const inputStyle = {
    color: 'blue', // Change this to your desired text color
  };
  const [showAlert, setShowAlert] = useState(false)
  const [change, setChange] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [catagyres, setCatagres] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleitems, setVisibleitems] = useState(false);
  const [visibletables, setVisibletables] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showaddtable, setAddtable] = useState(false);

  const [showItemModl, setShowitemModel] = useState(false);
  const [category, setCategory] = useState({
    name: '',
    image: null,
    status_Show: '',
  });
  const [table, setTable] = useState({
    name: '',
    tableDetial: '',

  });

  const [item, setItem] = useState({
    name: '',
    Purchasingprice: 1,
    Sellingprice: 1,
    quanitity: 1,
    catagyName: 1,
    packingtype: '',
    status_show: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "scroll";

    axios.get(`${API_URL}/catagyres/`).then((response) => {
      setCatagres(response.data);
    });

 fetchUserProfile();
  }, [])
  
  const [userData, setUserData] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const storedData = localStorage.getItem('token');
      console.log(storedData);
      // const token = Cookies.get('access_token');
      const response = await axios.get(`${API_URL}/api/v1/auth/users/info`, {
        headers: {
          'Authorization': `Bearer ${storedData}`,
        },
      });
      console.log('User profile:', response.data);
      setUserData(response.data);
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  


  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setCategory({
      ...category,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const handleInputChangeTable = (e) => {
    const { name, tableDetial, value } = e.target;
    setTable({
      ...table,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };



  const handleAddtable = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', table.name);
    formData.append('tableDetial', table.tableDetial);


    axios.post(`${API_URL}/tables/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      console.log("add item ")

      setItem({
        name: '',
        tableDetial: '',

      })
      alert('Item add  successfully!');

    })
    setChange(change + 1);

  };



  const validateForm = () => {
    const newErrors = {};

    if (!category.name) {
      newErrors.name = 'Category name is required';
    } else if (category.name.length < 3) {
      newErrors.name = 'Category name should be at least 3 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleAddCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', category.name);

    if (category.image !== null) {
      formData.append('image', category.image);
    }
    formData.append('status_Show', category.status_Show)
    console.log(formData);

    axios
      .post(`${API_URL}/catagyres/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setCategory({
          name: '',
          image: null,
        });

        alert('تمت اضافة بنجاح ');
        // Optionally perform any action after adding the category if needed

      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.name) {
          setErrors({
            ...errors,
            name: ' this name already exists',
          });
        } else {
          console.error('Error adding category:', error);
        }

      });
    setChange(change + 1);
  };

  const handleInputChangeItem = (e) => {
    const { name, value, type, checked } = e.target;
    setItem({
      ...item,
      [name]: type === 'checkbox' ? checked : value,
    });

    setErrors({
      ...errors,
    });
  };

  const handleAdditem = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', item.name);
    formData.append('purshingPrice', item.Purchasingprice);
    formData.append('sellingPrice', item.Sellingprice);
    formData.append('quanilty', item.quanitity);
    formData.append('catagyName', item.catagyName);
    formData.append('status_show', item.status_show);
    formData.append('packingType', item.packingtype);

    axios.post(`${API_URL}/items/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      console.log("add item ")

      setItem({
        name: '',
        Purchasingprice: 1,
        Sellingprice: 1,
        quanitity: 1,
        category: 1,
        packingtype: '',
        status_show: false,

      })
      alert('Item add  successfully!');

    })
    setChange(change + 1);

  };






  const divStyle = {
    marginLeft: '100px',
    height: '100vh',
    background: '#1F1D2B',

  };
  const bgcol = { background: '#1F1D2B', };
  return (
    <>
      <SideBar />
      <div style={divStyle} >
       
        {  userData.is_superuser ? (
      <>
 <TopSect />
        <div className="   ">
          <div className="d-flex justify-content-center ">
            <div className="btn btn-dark text-white m-4  " >
              <h1 className="text-white">
                التصينيفات
              </h1>
              <button className="btn btn-danger p-2 m-2" onClick={() => setVisible(true)}  > عرض التصينيفات</button>
              <button className="btn btn-danger p-2 m-4" onClick={() => setShowModal(true)}   > اضافة صنف جديد </button>


            </div>

            <div className="btn btn-dark  m-4 " >
              <h1 className="text-white" >
                العناصر
              </h1>
              <button className="btn btn-danger m-2" onClick={() => setVisibleitems(true)} > عرض العناصر </button>
              <button className="btn btn-danger  m-4" onClick={() => setShowitemModel(true)} > اضافة عنصر جديد </button>

            </div>

            <div className="btn btn-dark  m-4 " >
              <h1 className="text-white" >
                الطاولات
              </h1>
              <button className="btn btn-danger m-2" onClick={() => setVisibletables(true)} >عرض الطاولات </button>
              <button className="btn btn-danger  m-4" onClick={() => setAddtable(true)} > اضافة طاولة جديده   </button>

            </div>
          </div>
          {visible &&
            <div style={bgcol} >
              <div className="d-flex flex-row  justify-content-between">
                <h1 className="text-white m-4  ">  show Categories </h1>
                <h4 className="text-white m-4  " onClick={() => setVisible(false)}  > X  </h4>
              </div>
              <CatagresListTable />

            </div>
          }
          {visibleitems && <div style={bgcol} >
            <div className="d-flex flex-row  justify-content-between">
              <h1 className="text-white m-4 ">  show Items </h1>
              <h5 className="text-white m-4  " onClick={() => setVisibleitems(false)}  > X  </h5>

            </div>
            <ItemsListTable />

          </div>
          }

          {visibletables && <div style={bgcol} >
            <div className="d-flex flex-row  justify-content-between">
              <h1 className="text-white m-4 ">  show tables</h1>
              <h5 className="text-white m-4  " onClick={() => setVisibletables(false)}  > X  </h5>

            </div>
            <Tableslist />

          </div>
          }

        </div>
        </> ):(  <Notallowpage/>  )
        }

        <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
          <Modal.Header >
            <Modal.Title>اضافة صنف جديد </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddCategory} enctype="multipart/form-data" >
              <Form.Group controlId="categoryName">
                <Form.Label className=" text-dark  " >Category Name</Form.Label>
                <Form.Control text="secondary"
                  className=" border rounded border-dark   p-2 bg-dark rounded "
                  type="text"

                  name="name"
                  value={category.name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="categoryImage">
                <Form.Label className="  text-dark" >Category Image</Form.Label>
                <Form.Control enctype="multipart/form-data" variant="secondary" className=" p-2 bg-dark rounded   "
                  type="file"
                  name="image"
                  onChange={handleInputChange}

                />

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" name="status_Show" label="show catagry" onChange={handleInputChange} className='m-4 text-dark ' />
                </Form.Group>
              </Form.Group>


              <button className="btn btn-danger  rounded p-2" type="submit" onClick={handleAddCategory}>
                اضافة
              </button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              الغاء
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={showaddtable} onHide={() => setAddtable(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
          <Modal.Header >
            <Modal.Title> اضافة طاولة </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddCategory} enctype="multipart/form-data" >
              <Form.Group controlId="categoryName">
                <Form.Label className=" text-dark  " >الاسم </Form.Label>
                <Form.Control text="secondary"
                  className=" border rounded border-dark   p-2 bg-dark rounded "
                  type="text"

                  name="name"
                  value={table.name}
                  onChange={handleInputChangeTable}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="categoryName">
                <Form.Label className=" text-dark  mt-2 " >التفاصيل </Form.Label>
                <Form.Control text="secondary"
                  className=" border rounded border-dark    p-2 bg-dark rounded "
                  type="text"

                  name="tableDetial"
                  value={table.tableDetial}
                  onChange={handleInputChangeTable}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <button className="btn btn-danger  rounded p-2" type="submit" onClick={handleAddtable}>
                اضافة
              </button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setAddtable(false)}>
              الغاء
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showItemModl} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <Form.Group controlId="bookName">
                <Form.Label className=" text-dark" > Item Name:</Form.Label>
                <Form.Control className=" border rounded border-dark  bg-dark "
                  type="text"
                  style={inputStyle}
                  name="name"
                  value={item.name}
                  onChange={handleInputChangeItem}
                  isInvalid={!!errors.name}

                />
                {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
              </Form.Group>

              <Form.Group controlId="bookPrice">
                <Form.Label className=" text-dark">Purchasing price:</Form.Label>
                <Form.Control className=" border rounded border-dark  bg-dark  "
                  type="number"
                  style={inputStyle}
                  name="Purchasingprice"
                  value={item.Purchasingprice}
                  onChange={handleInputChangeItem}
                  isInvalid={!!errors.name}
                />
                {errors.price && <Form.Text className="text-danger">{errors.price}</Form.Text>}
              </Form.Group>
              <Form.Group controlId="bookPrice">
                <Form.Label className=" text-dark"> selling  price:</Form.Label>
                <Form.Control className=" border rounded border-dark  bg-dark "
                  type="number"
                  style={inputStyle}
                  name="Sellingprice"
                  value={item.Sellingprice}
                  onChange={handleInputChangeItem}
                />
                {errors.price && <Form.Text className="text-danger">{errors.price}</Form.Text>}
              </Form.Group>

              <Form.Group controlId="bookStock">
                <Form.Label className=" text-dark">Quanilty:</Form.Label>
                <Form.Control className=" border rounded border-dark  bg-dark "
                  type="number"
                  style={inputStyle}
                  name="quanitity"
                  value={item.quanitity}
                  onChange={handleInputChangeItem}
                />
                {errors.stock && <Form.Text className="text-danger">{errors.stock}</Form.Text>}
              </Form.Group>

              <Form.Group controlId="bookCategory">
                <Form.Label className=" text-dark"> Packing Type </Form.Label>
                <Form.Control className=" border rounded border-dark  bg-dark "
                  as="select"
                  name="packingtype"
                  value={item.packingtype}
                  onChange={handleInputChangeItem}
                >

                  <option value="" disabled>Select a type</option>
                  <option key="carton" value='carton'>carton</option>
                  <option key="pill" value="pill">pill</option>


                </Form.Control>
                {errors.category && <Form.Text className="text-danger">{errors.category}</Form.Text>}
              </Form.Group>

              <Form.Group controlId="bookCategory">
                <Form.Label className=" text-dark" >Category:</Form.Label>
                <Form.Control className=" border rounded border-dark bg-dark  "
                  as="select"
                  name="catagyName"
                  value={item.catagyName}
                  onChange={handleInputChangeItem}
                >


                  {catagyres.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Form.Control>
                {errors.category && <Form.Text className="text-danger">{errors.category}</Form.Text>}
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" name="status_show" onChange={handleInputChangeItem} label="show item" />
              </Form.Group>

              <button className="btn btn-danger rounded p-2 w-25 mt-2 " onClick={handleAdditem} type="submit">
                Add Item
              </button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowitemModel(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* { showAlert && 
  <div  style={{ zIndex: "0"  }}class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
 


  } */}

      </div>



    </>
  )
}