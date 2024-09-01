import React from 'react'
import "./Navbar.css"
import navlogo from '../../assets/4732440.svg'
import navProfile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <img src={navlogo} alt="" className="nav-logo" style={{height:'50px', width:'100px'}}/>
      <h5>Admin Panel</h5>
      </div>
      <img src={navProfile} alt="" className="nav-profile" style={{height:'50px',width:'75px'}}/>
    </div>
  )
}

export default Navbar
