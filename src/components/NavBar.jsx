import React,{useState} from 'react'
import { Badge, Modal } from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom"
import "../index.css"
import Cart from "../screens/Cart"
import { useCart } from './contextReducer';
export default function NavBar() {
    const [cartView, setcartView] = useState(false)
    let data = useCart();
    const handleClick = () =>{
    localStorage.removeItem("authToken");
    localStorage.clear();
  }
  const navigate = useNavigate()
  return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">GO Food</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item me-3">
          <Link className="nav-Link disabled yi" aria-current="page" to="#">Home</Link>
        </li>
        {(localStorage.getItem("authToken")) && 
        <li className="nav-item me-3">
        <Link className="nav-Link disabled yi" aria-current="page" to="#">My Orders</Link>
      </li>
        } 

      </ul>
      {!(localStorage.getItem("authToken")) ?
      <div className = "d-flex ">
      <Link className="btn bg-white text-success mx-1" to = "/login" >login</Link>
      <Link className="btn bg-white text-success mx-1" to = "/creatuser" >Sign up</Link>
  </div>:
        <div>
        <div className="btn bg-white text-success mx-1" onClick = {()=>{setcartView(true)}} >My Cart {" "}

        <Badge pill bg = "danger">{data.length}</Badge>
        </div>
        {cartView && 
  <Modal show={cartView} onHide={() => setcartView(false)} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>My Cart</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Cart />
    </Modal.Body>
  </Modal>
}
        <Link className="btn bg-white text-danger mx-1" to = "/" onClick={handleClick}>Logout</Link>
        </div>
        }     
    </div>
  </div>
</nav>

    </div>
    )
}
