import React, { useEffect, useState } from "react"
import SideBar from "../../components/sidebar/SideBar";
import CatagryCard from "../../components/CatagryCard";
import "./orderpage.css"
import OrderList from "./OrderList";
import CatgyItemCard from "../../components/CatgyItemCard";
import axios from "axios";
import { API_URL } from "../../BaseUrl";
import { useLocation, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Modal, Form, Button } from 'react-bootstrap';


export default function OrderPagef() {

    const [catgyId, setCatgyId] = useState();

    const catgstyle = {
        width: '7rem',
    }
    const imgstyle = {
        width: '2rem',
        hight: '2rem',

    }
    const divStyle = {
        marginLeft: '100px',
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
        position: 'absolute',
        bottom: '0',

    }

    const { state } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showModaldelet, setShowModaldelet] = useState(false);
  const [cancelorder, setCancelorder] = useState(false);
    const [catagyres, setCatagres] = useState([]);
    const [catagyresFilter, setCatagresFilter] = useState([]);
    const [itemscatgs, setItemscatgs] = useState([]);
    const [itemsShow,setItemshows]=useState([]);
    const [itemdeetId,setitemdeetId]=useState();
    const [fee,setFee]= useState( 2.5)
   
    const [totalcost,settotalcost]=useState(0);
    const [orderselectItems,setorderselectItems]=useState([]); 
    const [filtercart,setfiltercart]=useState([]);
    const [cartIdf,setcartIdf] = useState( 0 );
    const itemsOrder=[];
   

    
    const {tableId}= useParams();
    console.log(tableId)
   

    useEffect(() => {
        document.body.style.overflow = "hidden";
         
      showorders();
      
        // axios.get(`${API_URL}/catagyres/`).then((response) => {
        //     setCatagres(response.data);
        // });
        axios.get(`${API_URL}/itemscatgres/1/`).then((response) => {
            setItemscatgs(response.data);
        });
        
       // showorders();
       catgrestrueshow();
    }, []);

   

const getcatgresItem=(catgyId)=>{
    axios.get(`${API_URL}/itemscatgres/${catgyId}/`).then((response) => {
        setItemscatgs(response.data);
    });
   
  }

const addItemToOrder= async(itemId )=>{

    const response = await fetch(`${API_URL}/api/add-to-cart/`, {
        method: 'POST', 

        body: JSON.stringify({

          t_number:tableId,
          orderstate: false,
          item: itemId,
          quantity: 1,

          }),
        headers: {        
        'Content-Type': 'application/json; charset=UTF-8',
      },
      
      });
}


const handleSubmitOrder = async () => {
 
  console.log(itemsShow);
  

   const response = await axios.post(
        `${API_URL}/orderx/`,
        {
          "totalcost": 77,
          "paymentType": "VISA",
          "adduser": "eman",
          "created_at": "2024-01-12T18:21:07.171405Z",
          "tableNumber": 2,
          "itemsorders": itemsOrder ,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            
          },
        
        }
      ).then(()=>{
        axios.put(`${API_URL}/cartstatus/`, { item_ids: itemsOrder, new_value: true })
        .then(response => {
            // Handle successful response
            console.log('Updated items:', response.data);
        })
        .catch(error => {
            // Handle error
            console.error('Error updating items:', error);
        });
        

      })
      showorders();

  }



    const increaseCartItemQuantity = (cartItemId) => {
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
      };

      const decreceItemQuantity = (cartItemId) => {
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


      

  const removeItemOrder=async(cartItemId)=>{
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
  }    

 const showorders= async()=>{
    axios.post(`${API_URL}/cart_items/`,
    { 
        orderstate:false,
        t_number: tableId,
      
     }
   
    ).then((response) => {
        setItemshows(response.data);
        const calculatedTotalCost = response.data.reduce((total, item) => total + item.item_cost, 0);
        settotalcost(calculatedTotalCost);
        console.log(calculatedTotalCost)


    });
    
 }


 const handleDeleteAllDataofcart = async () => {
  try {
    const response = await axios.get(`${API_URL}/deletorder/`);
    console.log(response.data.message);  // Log the success message
  } catch (error) {
    console.error('Error deleting data:', error.response.data.error);
  }
};

const cancel_order = async ()=>{

  axios.delete(`${API_URL}/cancelorder/`, { data: { item_ids: itemsOrder } })
            .then(response => {
                // Handle successful response
                console.log('Items deleted:', response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error deleting items:', error);
            });
}
    


    console.log(catagyres)


    console.log("****")
    // console.log(itemscatgs);
    console.log(itemsShow);

    const catgrestrueshow = async ()=>{

      const response = await axios.get(`${API_URL}/catagyres/`);
    setCatagres(response.data);

    const filteredCatgyes = response.data.filter(item => item.status_Show === true);
    setCatagresFilter(filteredCatgyes);
    console.log('status_Show', filteredCatgyes);
    }

    

    // const handleClearRowsorder = () => {
    //     // Clear all rows by setting an empty array
    //     setTableData([]);
    //   };
    return (
        <>
            <SideBar />
            <div style={divStyle}  >
                <h1 className="  text-center text-light ">  Order Page     </h1>
                <div>
                    <div style={bgcolor}>
                        <div className="bodydiv" style={bgcolor} >

                            <div style={bgcolor} className=" topdiv row col-lg-12">
                                <div className=" p-2 left col-lg-6 " >
                                    {
                                        itemscatgs.map((item) => (
                                            <button className="card inline-block  bg-danger m-1   bg-opacity-80 text-white"
                                             style={style} onClick=  
                                                { ()=>{

                                                  addItemToOrder(item.id, cartIdf);
                                                    showorders();
                                                }
                                                  
                                              }
                                              >
                                                <div className="card-body   " >

                                                    <h6 className="card-title  mt-4"> {item.name} </h6>
                                                    <h6 className="card-title  mt-4">{item.sellingPrice} $ </h6>

                                                </div>
                                            </button>                                       ))
                                    }
                                   

                                </div>
            <div className=" right col-lg-6  ">

                  <div  >
               
               <div className="row  text-light   text-center   shadow-lg m-2  rounded ">
                   <div className=" row col-lg-12    ">
                       <div className="d-flex flex-row  justify-content-between" >
                       <h3 className=" text-start text-light">Order OF  </h3>
                       <button type="button" class="btn btn-danger rounded m-2 " 
                         onClick={()=>{ 
                          showorders();
                          setCancelorder(true);
                        //  setItemshows([]);
                        showorders();
                        
                       }} >Cancel x </button>
                       </div>
                      
                       <table className="   overflow-auto   " >
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

                                itemsShow.map((orderitem)=>(
                               
                              <tbody>
                                <td> 
                                {    itemsOrder.push( orderitem.id) }
                                </td>
                                
                               <td>{orderitem.item.name} </td>
                               <td > {orderitem.item.sellingPrice}  </td>
                               
                               <td>
                            
                                   <i className="fa-solid fa-plus m-4 fs-4 "  style={{ cursor: "pointer" }}  onClick={
                                    ()=>{  
                                      showorders(); 
                                        console.log("orderitem.id")
                                       console.log(orderitem.id);
                                       increaseCartItemQuantity(orderitem.id);
                                        showorders();
                                    }
                                   } > + </i>
                                  
                                   <span> {orderitem.quantity} </span> 

                                   <i class="fa-solid fa-minus  m-4 fs-4 "   style={{ cursor: "pointer" }} onClick={()=>{
                                   showorders();
                                   decreceItemQuantity(orderitem.id);
                                    showorders();
                                   } }> -  </i> 
                               </td>
                              
                               
                               <td>{ orderitem.item_cost}</td>
   
                               <img src="/images/deleteicon.png" style={imgstyle} className="mt-2" alt="delete" 
                                onClick={()=>{
                                  showorders();
                                   setShowModaldelet(true);
                                   setitemdeetId(orderitem.id);
                                    // removeItemOrder(orderitem.id);
                                     showorders();
                                }}
                               />
                           </tbody>
                                        ))
                                        ):  (
        <i className="fas fa-spinner fa-spin fa-2x justify-content-center"></i>
      )
                                    
                           }
                           
                       </table>
                   </div>
   
               </div>
       </div>                  

                
                                    

                                    <div style={bootom} className="w-100 p-4" >

                                        <div className=" d-flex justify-content-between  ">
                                            <h5 className=" ml-auto mr-2 text-light"> Total </h5>
                                            <h5 className="  text-light"> {totalcost}  $</h5>
                                        </div>
                                        <div className=" d-flex  justify-content-between " >
                                            <h5 className="  text-light " >  <button type="button" class="btn btn-danger rounded  " 
                         onClick={()=>{ 
                          setShowModal(true);

                       }} >Edit <FaEdit /> </button> 
                          Fee : {fee}  % </h5>
                                             <div className=" d-flex ">
                                                <h5 className=" text-light"> Total with fee  </h5>
                                                <h5 className=" ms-4 text-light"> { totalcost + totalcost * fee} $ </h5>
                                            </div>

                                        </div>
                                        <div className="d-flex  justify-content-between">
                                            <button type="button"  onClick={()=>{

                                               
                                            }} class="btn btn-outline-success  w-25">Cash </button>
                                            <button type="button" onClick={handleSubmitOrder} class="btn btn-outline-warning  w-25">visa  </button>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="bottomdiv">
                                {
                                  catagyresFilter.length > 0 ? (
                                    catagyresFilter.map((catg) => (
                                        <button className="card inline-block  bg-dark m-1  bg-opacity-80 text-white" style={catgstyle}
                                            onClick={()=>{
                                              getcatgresItem(catg.id) 
                                            }
                                               
                                              
                                            } >


                                            <div className="card-body text-center" >
                                                <img src="/images/someone.jpeg" style={imgstyle} />
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

    <Modal   show={showModal} onHide={() => setShowModal(false)} backdrop="static" style={{ zIndex: "3000" , backgroundColor:"dark" }}  >
          <Modal.Header >
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <Form.Group controlId="categoryName">
                <Form.Label className=" text-dark  " >Fee </Form.Label>
                <Form.Control  text="secondary" 
                className=" border rounded border-dark   p-2 bg-dark rounded " 
                  type="number"
                  
                  name="fee"
                  value={fee}
                 onChange={(e) => setFee(e.target.value)} 

                  // onChange={handleInputChange}
                 
                />
                
              </Form.Group>
             

            
              <button className="btn btn-danger  mt-2 rounded p-2" type="submit" onClick={() => setShowModal(false)}  >
                Add  Fee 
              </button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal   show={showModaldelet} onHide={() => setShowModaldelet(false)} backdrop="static" style={{ zIndex: "3000" , backgroundColor:"dark" }}  >
          <Modal.Header closeButton>
            <Modal.Title>Delete Item ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <p className="text_dark " > Delete Item ? </p>
       
 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className=" mt-2 rounded p-2"  onClick={() => setShowModaldelet(false)}>
              Close
            </Button>
            <button   type="button"  onClick={()=>{
              showorders();
              removeItemOrder(itemdeetId);
              showorders();
              setShowModaldelet(false);
              showorders();
            }} class="btn btn-danger  mt-2 rounded p-2"> Confirm </button> 
          </Modal.Footer>
        </Modal>

        <Modal   show={cancelorder} onHide={() => setCancelorder(false)} backdrop="static" style={{ zIndex: "3000" , backgroundColor:"dark" }}  >
          <Modal.Header closeButton>
            <Modal.Title> Cancal Order ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <p className="text_dark " > Cancel Order </p>
                  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className=" mt-2 rounded p-2"  onClick={() => setShowModaldelet(false)}>
              Close
            </Button>
            <button   type="button"  onClick={()=>{
              showorders();
             cancel_order();
             showorders();
              setCancelorder(false);
              showorders();
            }} class="btn btn-danger  mt-2 rounded p-2"> Confirm </button> 
           </Modal.Footer>
           </Modal>

                </div>
            </div>
        </>
    )
}