import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../assets/upload-to-cloud-svgrepo-com.svg"
const AddProduct = () => {
  const [image,setimage]=useState(false);
  const[productdetail,setProductdetail]=useState({name:"",image:"",category:"women",new_price:"",old_price:""});
  
  const imageHandler=(e)=>{
    setimage(e.target.files[0]);
    
  }
  const ChangeHandler=(e)=>{
    setProductdetail({...productdetail,[e.target.name]:e.target.value})
  }
  const Add_Product=async()=>{
   
    let responseData;
    let Product=productdetail;
    let formData=new FormData();
    formData.append('product',image);
    await fetch('https://shoping-ecommerce-1.onrender.com/upload',{
      method:'POST',
      headers:{
        Accept:'application/json'
      },
      body:formData
    }).then((resp)=>resp.json()).then(data=>{responseData=data})
    if(responseData.success)
    {
      Product.image=responseData.image_url;
      
      await fetch('https://shoping-ecommerce-1.onrender.com/addproduct',{
        method:"POST",
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(Product)
      }).then((resp)=>resp.json()).then((data)=>{
        if(data.success)
          alert("Product Added")
        else
        alert("Failed ")
      })
    }
  }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name='name' placeholder='Type here' value={productdetail.name} onChange={ChangeHandler}/>
      </div>
      <div className='addproduct-price'>
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input type='text' name="old_price" placeholder='Type here' value={productdetail.old_price} onChange={ChangeHandler}/>

        </div>
        <div className='addproduct-itemfield'>
            <p>Offer Price</p>
            <input type="text" name="new_price" placeholder='Type here' value={productdetail.new_price} onChange={ChangeHandler}/>
        </div>
        </div>
        <div className='addproduct-itemfield'>
            <p>Product Category</p>
            <select name="category" className='add-product-selector' value={productdetail.category} onChange={ChangeHandler}>
                <option value='women'>Women</option>
                <option value='men'>Men</option>
                <option value='kid'>Kid</option>
            </select>
        </div>
        <div className='addproduct-itemfield'>
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
            </label>
            <input type='file' name='image' id='file-input' onChange={imageHandler} hidden/>
        </div>
        <button className='addproduct-btn' onClick={Add_Product}>ADD</button>
      </div>
   
  )
}

export default AddProduct
