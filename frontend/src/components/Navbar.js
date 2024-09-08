import { Link,useNavigate } from "react-router-dom"
import Badge from 'react-bootstrap/Badge'
import { useState } from "react";
import Cart from "../screen/Cart";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  let data=useCart();
const [cartView,setCartView]=useState(false)
  const navigate=useNavigate();
  const handdleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'purple' }}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="#" style={{"fontStyle":"italic","fontSize":"25px"}}>FoodDelivery</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken"))?
          <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
        </li>
      :""}
      </ul>
      {(!localStorage.getItem("authToken"))?
      <div className="d-flex">
          <Link className="btn bg-white text-dark mx-1" to="/login">Login</Link>  
          <Link className="btn bg-white text-dark mx-1" to="/signup">Signup</Link>
      </div>
      :
      <div>
      <div className='btn bg-white mx-2' onClick={()=>{setCartView(true)}}>
          My Cart {" "}
          <Badge pill bg="danger">{data.length}</Badge>
        </div>
        {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
      <div className='btn bg-white mx-2 text-danger' onClick={handdleLogout}>
          Logout
        </div>
        </div>
        }
    </div>
  </div>
</nav>
    </div>
  )
}
