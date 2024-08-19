import React, { createContext, useCallback, useEffect, useMemo, useState} from 'react';


export const ShopContextbase = createContext(null);

const getDefaultCart=()=>{
  let cart={};
  for(let index=0;index<300+1;index++)
  {
    cart[index]=0;
  }
  return cart;
 }
// Change Props to props
const ShopContext = (props) => {
  const [all_product,setAll_product]=useState([]);
  const [cartItems,setCartItems]=useState(getDefaultCart());
  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
        .then((res) => res.json())
        .then((data) => setAll_product(data));

    if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`, // Corrected line
                'Content-Type': 'application/json',
            },
            body: "",
        })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
}, []);

     
  

  const addToCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    if(localStorage.getItem('auth-token'))
    {
        fetch('http://localhost:4000/addtocart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            "itemId":itemId
          })
        }).then((response)=>response.json())
       
    }
   
  }
  const removeFromCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token'))
      {
          fetch('http://localhost:4000/removefromcart',{
            method:'POST',
            headers:{
              Accept:'application/form-data',
              'auth-token':`${localStorage.getItem('auth-token')}`,
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              "itemId":itemId
            })
          }).then((response)=>response.json())
          
      }
  }
  const getTotalAmount=useMemo(()=>{
    let totalAmount=0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {
        let iteminfo=all_product.find((product)=>product.id===Number(item));
        totalAmount+=iteminfo.new_price*cartItems[item];
      }
    }
    return totalAmount;
  },[cartItems,all_product]);
  const getTotalCartItems=useMemo(()=>{
    let totalItem=0;
    
    for(const item in cartItems)
    {
       if(cartItems[item]>0)
       {
        totalItem+=cartItems[item];
       }
    }
    return totalItem;
  },[cartItems])
  const contextValue = { all_product,cartItems,addToCart,removeFromCart,getTotalAmount,getTotalCartItems};
  return (
    <ShopContextbase.Provider value={contextValue}>
      {props.children}  {/* Changed Props to props */}
    </ShopContextbase.Provider>
  );
};

export default ShopContext;
