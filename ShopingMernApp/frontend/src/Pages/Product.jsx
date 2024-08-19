import React, { useContext } from 'react'
import {ShopContextbase} from "../Context/ShopContext"
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProudctDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';


const Product = () => {
  const { all_product } = useContext(ShopContextbase);
    
    const {productId}=useParams();
    
    const product = all_product.find((e) => e.id === Number(productId));
  return (

    <div>
       <>
        <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProduct/>
      </>
    </div>
  )
}

export default Product
