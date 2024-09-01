import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from "../../assets/Product_cart.svg"
import list_product_icon from "../../assets/Product_list_icon.svg"
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
      <div className='sidebar-item'>
        <img src={add_product_icon} alt="" style={{height:'50px',width:'50px'}}/>
        <p>Add Product</p>
      </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
      <div className='sidebar-item'>
        <img src={list_product_icon} alt="" style={{height:'50px',width:'50px'}}/>
        <p>Product List</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
