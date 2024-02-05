import React, { useEffect, useState } from "react"
import "../pages/Orderspag/orderlist.css"
import axios from "axios";
import { API_URL } from "../BaseUrl";
import { Button, Form, Modal } from "react-bootstrap";
import Popofitenquanilty  from "./Popofitenquanilty";




export default function ItemsListTable() {
  const [change, setChange] = useState(1);
     const [items,setitems]=useState([]);
     const [catagyres, setCatagres] = useState([]);
     const [showModaldelet, setShowModaldelet] = useState(false);
     const [itemtoedit,setitemstoedit]=useState([]);
     const [itemdelet,setitemmdelet]=useState([]);

     const [showItemModl, setShowitemModel] = useState(false);

     const [item, setItem] = useState({
        name: '',
        Purchasingprice: 1,
        Sellingprice: 1,
        quanitity: 1,
        category: 1,  
        packingtype: '',
        status_show:'true',
      });

      const showcatagres = async()=>{
        axios.get(`${API_URL}/catagyres/`).then((response) => {
            setCatagres(response.data);
        });
       setChange(change+1);
       
    }

     const showitems=  async()=>{
      axios.get(`${API_URL}/items/`).then((response) => {
                setitems(response.data);
            });
          setChange(change+1)    
     }
     
     useEffect(()=>{
        showitems();
        showcatagres();
     },[])

     const deleteitem = (id )=>{
        const response =  fetch(`${API_URL}/items/${id}/`, {
            method: 'DELETE',
          
          });
          setChange(change+1);  
      }

    const getitemByid = async(id)=>{
        axios.get(`${API_URL}/item/${id}/`).then((response) => {
            setitemstoedit(response.data);
        });
        console.log("??????????")
        console.log(itemtoedit)

    }

    const edititem=()=>{
        if (itemtoedit) {
            setItem({
                id:itemtoedit.id,
                name: itemtoedit.name,
                Purchasingprice: itemtoedit.purshingPrice,
                Sellingprice: itemtoedit.sellingPrice,
                quanitity: itemtoedit.quanilty,
                category: itemtoedit.catagyName,  
                packingtype: itemtoedit.packingType,
                status_show:itemtoedit.status_show,
            });
          }
          setChange(change+1);  
    }

    const handleInputChangeItem = (e) => {
        const { name, value, type, checked } = e.target;
        setItem({
          ...item,
          [name]: type === 'checkbox' ? checked  : value,
        });
    
        
        };
        const handleedititem = (e) => {
            e.preventDefault();     
            const formData = new FormData();
         
            formData.append('name', item.name);
            formData.append('purshingPrice',item.Purchasingprice);
            formData.append('sellingPrice', item.Sellingprice);
            formData.append('quanilty', item.quanitity);
            formData.append('catagyName', item.category);
            formData.append('status_show', item.status_show);
            formData.append('packingType', item.packingtype);
            
        
            axios.put( `${API_URL}/items/${item.id}/`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            console.log("add item ")
              
            setShowitemModel(false);
            setChange(change+1);  
                  
        
          };
        
 
  
 return(
     <>
        
        <div  >
               
            <div className="row  text-light   text-center   shadow-lg m-2  rounded ">
                <div className=" row col-lg-12    ">
               
                    <table className="      " >
                        <thead className="  ">
                            <tr>
                               {/* <th scope="col">  Id   </th> */}
                                <th scope="col">Name</th>

                                <th scope="col"> Purchasing price</th>
                                <th scope="col">   selling price  </th>
                              
                                <th scope="col">  Qunality </th>

                                <th scope="col"> Packing type </th>
                                <th scope="col">  catagrey name  </th>

                            </tr>
                        </thead>
                        {
                            items.map((item)=>(
                                <tbody>
                                
                                <td> {item.name} </td>
                                <td> {item.purshingPrice} </td>
                                <td> {item.sellingPrice}$  </td>
                                <td> {item.quanilty}</td>
                                <td> {item.packingType}  </td>
                                <td> {item.catagyName.name}  </td>

                                    <td>

                                      {

                                    item.quanilty < 5 ? ( 
                                      <Popofitenquanilty item={item.name}/>
                                    ):( <p></p> )
                                      }

                                    { item.status_show ? (
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
                                    
                                    </td>
                                
                                 <button className=" btn btn-outline-success mb-4 rounded "  onClick={()=>{
                                   getitemByid(item.id);
                                   edititem();
                                   setShowitemModel(true);

                                 }} > edit 
                                 
                                  </button>
                                 <button className=" btn btn-outline-danger mb-4 rounded ms-4 " 
                                 onClick={()=>{
                                  showitems();
                                   setitemmdelet(item.id);
                                    // deleteitem(item.id);
                                    setShowModaldelet(true)
                                    showitems();
                                 }}
                                 > delete   </button> 
                                 
        
                                 
                          </tbody>
                            ))
                          
                            
                           

                        }
                       
                     
                    </table>
                </div>

            </div>


      <Modal show={showItemModl}  backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group controlId="bookName">
            <Form.Label className=" text-dark" > Item Name:</Form.Label>
            <Form.Control className=" border rounded border-dark  bg-secondary"
              type="text"
              name="name"
              value={item.name}
              onChange={handleInputChangeItem}
            />
            {/* {errors.name && <Form.Text className="text-danger">{errors.name || backendErrors.name}</Form.Text>} */}
          </Form.Group>
         
          <Form.Group controlId="bookPrice">
            <Form.Label className=" text-dark">Purchasing price:</Form.Label>
            <Form.Control className=" border rounded border-dark bg-secondary text-danger"
              type="number"
              name="Purchasingprice"
              value={item.Purchasingprice}
              onChange={handleInputChangeItem}
            />
            {/* {errors.price && <Form.Text className="text-danger">{errors.price}</Form.Text>} */}
          </Form.Group>
          <Form.Group controlId="bookPrice">
            <Form.Label className=" text-dark"> selling  price:</Form.Label>
            <Form.Control className=" border rounded border-dark bg-secondary  text-dark"
              type="number"
              name="Sellingprice"
              value={item.Sellingprice}
              onChange={handleInputChangeItem}
            />
            {/* {errors.price && <Form.Text className="text-danger">{errors.price}</Form.Text>} */}
          </Form.Group>
          
          <Form.Group controlId="bookStock">
            <Form.Label className=" text-dark">Quanilty:</Form.Label>
            <Form.Control className=" border rounded border-dark bg-secondary text-dark"
              type="number"
              name="quanitity"
             value={item.quanitity}
              onChange={handleInputChangeItem}
            />
            {/* {errors.stock && <Form.Text className="text-danger">{errors.stock}</Form.Text>} */}
          </Form.Group>
          
          <Form.Group controlId="bookCategory">
            <Form.Label className=" text-dark"> Packing Type </Form.Label>
            <Form.Control className=" border rounded border-dark  text-dark bg-secondary"
              as="select"
              name="packingtype"
              value={item.packingtype}
              onChange={handleInputChangeItem}
            >
            
              <option key="carton" value='carton'>carton</option>
              <option key="pill" value='pill'>'pill</option>


              
            </Form.Control>
            {/* {errors.category && <Form.Text className="text-danger">{errors.category}</Form.Text>} */}
          </Form.Group>

          <Form.Group controlId="bookCategory">
            <Form.Label className=" text-dark" >Category:</Form.Label>
            <Form.Control className=" border rounded border-dark   bg-secondary"
              as="select"
              name="category"
              value={item.category}
              onChange={handleInputChangeItem}
            >
              <option value="" disabled>Select a category</option>
              {catagyres.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Control>
          
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox"  name="status_show" onChange={handleInputChangeItem} label="show item" />
      </Form.Group>
          
         
          <button  className="btn btn-danger rounded p-2 w-50 mt-2 "  onClick={handleedititem} type="submit">
          Save Changes
          </button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowitemModel(false)}>
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
               showitems();
                deleteitem(itemdelet);
                showitems();
                 // deleteitem(item.id);
                 
              setShowModaldelet(false);
              showitems();
            
            }} class="btn btn-danger  mt-2 rounded p-2"> Confirm </button> 
          </Modal.Footer>
        </Modal>

    </div>
 </>
    )
}