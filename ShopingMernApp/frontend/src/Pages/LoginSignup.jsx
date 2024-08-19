import React, { useState } from 'react'
import "./CSS/LoginSignup.css"
const LoginSignup = () => {
       const [state,setState]=useState("Login");
       const [formData,setFormData]=useState({
        username:"",
        password:"",
        email:"",

       })
       const changeHandler=(e)=>{
          setFormData({...formData,[e.target.name]:e.target.value})
       }
       const login=async()=>{
          
          let responseData;
          await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
              accept:'application/form-data',
              'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
          }).then((resp)=>resp.json()).then((data)=>{
              responseData=data
          })
          if(responseData.success)
          {
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace('/')
          }
          else
          {
            alert(responseData.erros);
            
          }

       }
       const signup=async()=>{
          
          let responseData;
          await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
              accept:'application/form-data',
              'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
          }).then((resp)=>resp.json()).then((data)=>{
              responseData=data
          })
          if(responseData.success)
          {
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace('/')
          }
          else
          {
            alert(responseData.erros);
            
          }
       }
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="sign up"?<input name='username' type="text" placeholder='Your Name' value={formData.username} onChange={changeHandler}/>:<></>}
          <input name='email' type="email" placeholder='Email Address' value={formData.email} onChange={changeHandler}/>
          <input name='password' type="password" placeholder='PassWord' value={formData.password} onChange={changeHandler}/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="sign up"?<p className="loginsignup-login">
          Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span>
        </p>:<p className="loginsignup-login">
          Create an account? <span onClick={()=>setState("sign up")}>Click here</span>
        </p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, I agree to the terms of use &privacy policy. </p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
