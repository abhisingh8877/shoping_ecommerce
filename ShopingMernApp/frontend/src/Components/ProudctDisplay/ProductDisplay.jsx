import React, { useContext } from 'react'
import "./ProuductDisplay.css"
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import  { ShopContextbase } from '../../Context/ShopContext'
const ProductDisplay = (props) => {
    const {product}=props;
    const {addToCart}=useContext(ShopContextbase);
  return (
    <div className='productdisplay'>
      <div className="proudctdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product?.image} alt=""/>
            <img src={product?.image} alt=""/>
            <img src={product?.image} alt=""/>
            <img src={product?.image} alt=""/>
            

        </div>
        <div className='productdisplay-img'>
           <img  className="productdisplay-main-img" src={product?.image} alt=""/>
        </div>
      </div>
      <div className='productdisplay-right'>
    <h1>{product?.name}</h1>
    <div className="productDisplay-right-stars">
        <img src={star_icon} alt=""/>
        <img src={star_icon} alt=""/>
        <img src={star_icon} alt=""/>
        <img src={star_icon} alt=""/>
        <img src={star_dull_icon} alt=""/>
       <p>{122}</p>
       
    </div>
    <div className='productdisplay-right-prices'>
      <div className='productdisplay-right-price-old'>
       ${product?.old_price}
      </div>
      <div className='productdisplay-right-price-new'>
       ${product?.new_price}
      </div>
      </div>
      <div className='productdisplay-right-description'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum totam possimus dolores deleniti ea! Nostrum, deserunt! Illum quasi at velit voluptates quam vitae! Iste inventore totam dolore debitis voluptas? Dolorem!
      </div>
      <div className="product-display-right-size">
        <h1>Select Size</h1>
        <div className="productdisplay-right-sizes">
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
          <div>XXL</div>
          
        </div>
      </div>
      <button onClick={()=>{addToCart(product?.id)}}>ADD TO CART</button>
      <p className='productdisplay-right-category'><span>Category:</span> Women , T-Shirt,Crop Top</p>
      <p className='productdisplay-right-category'><span>Tags:</span> Modern , Letest</p>
    </div>
      </div>
    
  )
}

export default ProductDisplay
