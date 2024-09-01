import React,{useContext} from 'react'
import './Cartitem.css'
import { ShopContextbase } from '../../Context/ShopContext';
import remove_icon from "../Assets/cart_cross_icon.png"
const CartItem = () => {
  const {all_product,cartItems,removeFromCart,getTotalAmount}=useContext(ShopContextbase);
  
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      <div>
        {all_product?.all_product.map((e,id)=>{
          if(cartItems[e.id]>0)
          {
            return(
              <div className='cartitem-format cartitems-format-main' key={id}>
          <img src={e.image} alt="" className='carticon-product-icon'/>
          <p>{e.name}</p>
          <p>${e.new_price}</p>
          <button className='cartitems-quantity'>{cartItems[e.id]}</button>
          <p>${e.new_price*cartItems[e.id]}</p>
          <img src={remove_icon} className='cartitems-remove-icon' onClick={()=>removeFromCart(e.id)} alt=""/>
        </div>
            )
          }
          else
          {
            return(
              <div></div>
            )
          }
        })}
        <hr/>
      </div>
      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalAmount}</p>
            </div>
            <hr/>
            <div className="cartitems-total-i">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr/>
            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>${getTotalAmount}</h3>
            </div>
          </div>
          <button>PROCCED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code ,Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
