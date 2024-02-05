import React, { useEffect, useState } from "react"
import SideBar from "../../components/sidebar/SideBar";
import CatagryCard from "../../components/CatagryCard";
import "./orderpage.css"
import OrderList from "./OrderList";
import CatgyItemCard from "../../components/CatgyItemCard";
import axios from "axios";
import { API_URL } from "../../BaseUrl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Popofitenquanilty from "../../components/Popofitenquanilty";
import { Modal, Form, Button } from 'react-bootstrap';


export default function OrderPagef() {

  const catgstyle = {
    width: '7rem',
  }
  const imgstyle = {
    width: '2rem',
    hight: '2rem',

  }
  const divStyle = {
    marginLeft: '13vh',
    height: '100vh',
    background: '#1F1D2B',

  };
  const style = {
    width: '7rem',
    hight: '4',
  }


  const bgcolor = {
    background: '#1F1D2B',

  }
  const bootom = {
     position: 'bottom',
    bottom: '0',

  }

  const { state } = useLocation();
  const navigate = useNavigate();
  const [change, setChange] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModaldelet, setShowModaldelet] = useState(false);
  const [cancelorder, setCancelorder] = useState(false);
  const [catagyres, setCatagres] = useState([]);
  const [catagyresFilter, setCatagresFilter] = useState([]);
  const [itemscatgs, setItemscatgs] = useState([]);
  const [itemsShow, setItemshows] = useState([]);
  const [itemdeetId, setitemdeetId] = useState();
  const [tabledetial, setTabledetial] = useState([]);
  const [fee, setFee] = useState(2.5);
  const [paymentType, setPaymenttype] = useState('VISA');
  const [totalcost, settotalcost] = useState(0);
  const [orderselectItems, setorderselectItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = currentDate.toLocaleString();
  const [showmodel, setShowmodel] = useState(false);
  const [pillitems, setPillitems] = useState([]);


  const itemsOrder = [];

  const { tableId } = useParams();

  

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

  useEffect(() => {

    document.body.style.overflow = "hidden";
    fetchUserProfile();
    catgrestrueshow();
    handeltablname(tableId);
    showorders();

  }, [change]);



  console.log(tabledetial);

  const getcatgresItem = (catgyId) => {
    axios.get(`${API_URL}/itemscatgres/${catgyId}/`).then((response) => {
      setItemscatgs(response.data);
    });

  }

  const handeltablname = (catgyId) => {
    
      axios.get(`${API_URL}/tableid/${catgyId}/`).then((response) => {
        setTabledetial(response.data);
      });

  }

  const handleTablestate = (status) => {
    axios.put(`${API_URL}/tablestats/`, { item_ids: tableId, new_value: true })
      .then(response => {
        // Handle successful response
        console.log('Updated table:', response.data);

      })
      .catch(error => {
        // Handle error
        console.error('Error updating table:', error);
      });
  }

  const addItemToOrder = async (itemId) => {

    handleTablestate();

    await fetch(`${API_URL}/api/add-to-cart/`, {
      method: 'POST',

      body: JSON.stringify({

        t_number: tableId,
        orderstate: false,
        item: itemId,
        quantity: 1,

      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },

    });
    setChange(change + 1);
  }


  const handleSubmitOrder = async () => {

    console.log(itemsShow);
    setPillitems([...itemsShow]);

    await axios.post(
      `${API_URL}/orderx/`,
      {
        "totalcost": totalcost,
        "paymentType": paymentType,
        "adduser": userData.first_name,
        "tableNumber": tableId,
        "itemsorders": itemsOrder,
      },
      {
        headers: {
          'Content-Type': 'application/json',

        },

      }
    ).then(() => {
      axios.put(`${API_URL}/cartstatus/`, { item_ids: itemsOrder, new_value: true })
        .then(response => {
          // Handle successful response
          console.log('Updated items:', response.data);

        })
        .catch(error => {
          // Handle error
          console.error('Error updating items:', error);
        });

      axios.post(`${API_URL}/update_quantities/`, itemsShow)
        .then(response => {
          console.log(response.data.message);
        })
        .catch(error => {
          console.error('Error updating quantities:', error);
        });

      axios.put(`${API_URL}/tablestats/`, { item_ids: tableId, new_value: false })
        .then(response => {
          // Handle successful response
          console.log('Updated table:', response.data);

        })
        .catch(error => {
          // Handle error
          console.error('Error updating table:', error);
        });
    })

    setChange(change + 1);
  }



  const increaseCartItemQuantity = (cartItemId) => {
    setChange(change + 1);

    axios.post(
      `${API_URL}/api/increase-cart-item-quantity/`,
      { cart_item_id: cartItemId },
      {
        headers: {
          'Content-Type': 'application/json',

        },
      }
    )
      .then((res) => {
        // Handle successful increase of item quantity
        // You might want to update the cart state or perform necessary actions
        console.log('Item quantity increased successfully');

      })
      .catch((err) => {
        // Handle error if the item quantity couldn't be increased
        console.error('Error increasing item quantity:', err);
      });
    setChange(change + 1);
  };

  const decreceItemQuantity = (cartItemId) => {
    setChange(change + 1);

    axios.post(
      `${API_URL}/api/reduce-cart-item-quantity/`,
      { cart_item_id: cartItemId },
      {
        headers: {
          'Content-Type': 'application/json',

        },
      }
    )
      .then((res) => {
        // Handle successful increase of item quantity
        // You might want to update the cart state or perform necessary actions
        console.log('Item quantity increased successfully');

      })
      .catch((err) => {
        // Handle error if the item quantity couldn't be increased
        console.error('Error increasing item quantity:', err);
      });


  };




  const removeItemOrder = async (cartItemId) => {
    axios.post(
      `${API_URL}/api/remove-from-cart/`,
      { cart_item_id: cartItemId }, // Send the cart item ID in the request body
      {
        headers: {
          'Content-Type': 'application/json',

        },
      }
    )
      .then((res) => {
        // Handle successful removal (e.g., update the state to remove the item)

        console.log("Item removed from cart successfully");
      })
      .catch((err) => {
        // Handle error if the item couldn't be removed
        console.error("Error removing item from cart:", err);
      });

    setChange(change + 1);
  }

  const showorders = async () => {
    axios.post(`${API_URL}/cart_items/`,
      {
        orderstate: false,
        t_number: tableId,

      }

    ).then((response) => {
      setItemshows(response.data);

      const calculatedTotalCost = response.data.reduce((total, item) => total + item.item_cost, 0);
      settotalcost(calculatedTotalCost);
      console.log(calculatedTotalCost)
    });

  }


  const cancel_order = async () => {

    axios.delete(`${API_URL}/cancelorder/`, { data: { item_ids: itemsOrder } })
      .then(() => {

        axios.put(`${API_URL}/tablestats/`, { item_ids: tableId, new_value: false })
          .then(response => {
            // Handle successful response
            console.log('Updated table:', response.data);

          })
          .catch(error => {
            // Handle error
            console.error('Error updating table:', error);
          });

        navigate('/home/');


      })
      .catch(error => {
        // Handle error
        console.error('Error deleting items:', error);
      });


  }



  const catgrestrueshow = async () => {

    const response = await axios.get(`${API_URL}/catagyres/`);
    setCatagres(response.data);

    const filteredCatgyes = response.data.filter(item => item.status_Show === true);
    setCatagresFilter(filteredCatgyes);
    console.log('status_Show', filteredCatgyes);
  }


  const showcatgre1 = async () => {

    const response = axios.get(`${API_URL}/itemscatgres/2/`);
    setItemscatgs(response.data);


  }

  return (
    <>
      <SideBar />
      <div style={divStyle}  >
        <h1 className="  text-center text-light "> صفحة الطلب     </h1>
        <div>
          <div style={bgcolor}>
            <div className="bodydiv" style={bgcolor} >

              <div style={bgcolor} className=" topdiv row col-lg-12">
                <div className=" p-2 left col-lg-6 " >
                  {
                    itemscatgs.map((item) => (
                      <button className="card inline-block  bg-danger m-1   bg-opacity-80 text-white"
                        style={style} onClick={() => {
                          showorders();
                          addItemToOrder(item.id);
                          showorders();

                        }}

                      >
                        <div className="card-body   " >

                          <h6 className="card-title  mt-4"> {item.name} </h6>
                          <h6 className="card-title  mt-4">{item.sellingPrice} $ </h6>
                          {

                            item.quanilty < 5 ? (
                              <Popofitenquanilty item={item.name} />
                            ) : (<p></p>)
                          }

                        </div>
                      </button>))
                  }


                </div>
                <div className=" right col-lg-6  ">

                  <div  className=" " >

                    <div className="row  text-light   text-center   shadow-lg m-2  rounded ">
                      <div className=" row col-lg-12   ">
                        <div className="d-flex    justify-content-between" >
                          <h3 className=" text-start text-light">Order OF  {tabledetial.name} </h3>
                          <button type="button" class="btn btn-danger rounded m-2 "
                            onClick={() => {
                              showorders();
                              setCancelorder(true);
                              //  setItemshows([]);
                              showorders();

                            }} >Cancel x </button>
                        </div>
                        
                        <table className="    " >
                          <thead className="  ">
                            <tr>
                              <th scope="col"> </th>
                              <th scope="col">Name</th>
                              <th scope="col">price</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Total   </th>
                              <th scope="col"> </th>


                            </tr>
                          </thead>
                          {
                            itemsShow.length > 0 ? (

                              itemsShow.map((orderitem) => (

                                <tbody>
                                  <td>
                                    {itemsOrder.push(orderitem.id)}
                                  </td>

                                  <td>{orderitem.item.name} </td>
                                  <td > {orderitem.item.sellingPrice}  </td>

                                  <td>

                                    <i className="fa-solid fa-plus m-4 fs-4 " style={{ cursor: "pointer" }} onClick={
                                      () => {
                                        
                                          
                                        if (orderitem.quantity <   orderitem.item.quanilty) {
                                          increaseCartItemQuantity(orderitem.id);
                                        } else {
                                          // Display an alert or perform other actions when the condition is not met
                                          alert(" لم يحتوى على كميات كافيه  ");
                                        }
                                      
                                      }
                                    } > + </i>

                                    <span> {orderitem.quantity} </span>

                                    <i class="fa-solid fa-minus  m-4 fs-4 " style={{ cursor: "pointer" }} onClick={() => {
                                      showorders();
                                      decreceItemQuantity(orderitem.id);
                                      showorders();
                                    }}> -  </i>
                                  </td>


                                  <td>{orderitem.item_cost}</td>

                                  <img src="/images/deleteicon.png" style={imgstyle} className="mt-2" alt="delete"
                                    onClick={() => {
                                      showorders();
                                      setShowModaldelet(true);
                                      setitemdeetId(orderitem.id);
                                      // removeItemOrder(orderitem.id);
                                      showorders();
                                    }}
                                  />
                                </tbody>
                              ))
                            ) : (
                              <i className="fas fa-spinner fa-spin fa-2x justify-content-center"></i>
                            )

                          }

                        </table>
                      
                      </div>

                    </div>
                  </div>




                  <div style={bootom} className="w-100 p-4  bottom-0 " >

                    <div className=" d-flex justify-content-between  ">
                      <h5 className=" ml-auto mr-2 text-light"> Total </h5>
                      <h5 className="  text-light"> {totalcost}  $</h5>
                    </div>
                    <div className=" d-flex  justify-content-between " >
                      <h5 className="  text-light w-2" >  <button type="button" className="btn btn-danger  me-2 rounded  "
                        onClick={() => {
                          setShowModal(true);

                        }} >تعديل <FaEdit /> </button>
                        Fee : {fee}  % </h5>
                      <div className=" d-flex ">
                        <h5 className=" text-light"> Total with fee  </h5>
                        <h5 className=" ms-4 text-light"> {totalcost + totalcost * fee} $ </h5>
                      </div>


                    </div>
                    <div className="d-flex  justify-content-between">
                      <button type="button" onClick={() => {
                         handeltablname(tableId);
                        setPaymenttype('CASH');
                        setShowmodel(true);

                      }} class="btn btn-outline-success  w-25">Cash </button>
                      <button type="button" onClick={() => {
                         handeltablname(tableId);

                        setPaymenttype('VISA');

                        setShowmodel(true);

                      }} class="btn btn-outline-warning  w-25">visa  </button>

                    </div>

                  </div>
                </div>
              </div>

              <div className="bottomdiv">
                {
                  catagyresFilter.length > 0 ? (
                    catagyresFilter.map((catg) => (
                      <button className="card   bg-dark m-1  bg-opacity-80 text-white" style={catgstyle}
                        onClick={() => {
                          getcatgresItem(catg.id)
                        }
                        } >


                        <div className="card-body text-center" >
                          <img src={catg.image} style={imgstyle} />
                          <h6 className="card-title  mt-2"> {catg.name} </h6>

                        </div>

                      </button>

                    )

                    )
                  ) : (
                    <i className="fas fa-spinner fa-spin fa-2x justify-content-center"></i>
                  )
                }

              </div>
            </div>
          </div>

          <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
            <Modal.Header >
              <Modal.Title> اضافة القية المضافة </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form >
                <Form.Group controlId="categoryName">
                  <Form.Label className=" text-dark  " >Fee </Form.Label>
                  <Form.Control text="secondary"
                    className=" border rounded border-dark   p-2 bg-dark rounded "
                    type="number"

                    name="fee"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}

                  // onChange={handleInputChange}

                  />

                </Form.Group>

                <button className="btn btn-danger  mt-2 rounded p-2" onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false)
                }} >
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

          <Modal show={showModaldelet} onHide={() => setShowModaldelet(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
            <Modal.Header closeButton>
              <Modal.Title>تاكيد مسح ؟</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <p className="text_dark " > مسح ؟ </p>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className=" mt-2 rounded p-2" onClick={() => setShowModaldelet(false)}>
                الغاء
              </Button>
              <button type="button" onClick={() => {

                removeItemOrder(itemdeetId);

                setShowModaldelet(false);
                showorders();
              }} class="btn btn-danger  mt-2 rounded p-2"> تاكيد </button>
            </Modal.Footer>
          </Modal>

          <Modal show={cancelorder} onHide={() => setCancelorder(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
            <Modal.Header closeButton>
              <Modal.Title> الغاء الطلب</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <p className="text_dark " > الغاء الطلب </p>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className=" mt-2 rounded p-2" onClick={() => setShowModaldelet(false)}>
                الغاء
              </Button>
              <button type="button" onClick={() => {

                cancel_order();

                setCancelorder(false);
                showorders();
              }} class="btn btn-danger  mt-2 rounded p-2"> تاكبد </button>
            </Modal.Footer>
          </Modal>


          <Modal show={showmodel} onHide={() => setShowmodel(false)} backdrop="static" style={{ zIndex: "3000", backgroundColor: "dark" }}  >
            <Modal.Header closeButton>
              <Modal.Title className="modal-title-centered" >
                <div className="modal-title-centered" >
                  <h4> TABLE  </h4>
                  <h5>  {formattedDate}</h5>
                  <h5>  CHECK# 1285    TABLE#  {tableId} {tabledetial.name } </h5>
                </div>

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <table className=" table  table-bordered  w-100     " >
                <thead className="  ">
                  <tr>
                    <th scope="col">  الكمية  </th>
                    <th scope="col"> الاسم  </th>
                    <th scope="col"> السعر   </th>

                  </tr>
                </thead>
                {

                  itemsShow.map((cat) => (
                    <tbody>
                      <td> {cat.quantity}</td>
                      <td> {cat.item.name}  </td>

                      <td> {cat.item_cost} </td>

                    </tbody>
                  ))
                }
              </table>
              <div>
                <h3> TOTAL</h3>
                <p> {totalcost + totalcost * fee} </p>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className=" mt-2 rounded p-2" onClick={() => setShowmodel(false)}>
                الغاء
              </Button>
              <button type="button" onClick={() => {
                handleSubmitOrder();
                setShowmodel(false);

              }} class="btn btn-danger  mt-2 rounded p-2"> طباعة  </button>
            </Modal.Footer>
          </Modal>


        </div>
      </div>
    </>
  )
}