
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from "./Pages/Shop.jsx"
import ShopCategory from "./Pages/ShopCategory.jsx"
import Product from "./Pages/Product.jsx"
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart.jsx';
import Footer from './Components/Footer/Footer.jsx';
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png"
import kids_banner from "./Components/Assets/banner_kids.png"
function App() {
  return (
    <div >
    <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route path="/" element={<Shop/>}></Route>
     <Route path="/mens" element={<ShopCategory category="men" banner={men_banner}/>}></Route>
     <Route path="/womens" element={<ShopCategory category="women" banner={women_banner} />}></Route>
     <Route path="/kids" element={<ShopCategory category="kid" banner={kids_banner} />}></Route>
     <Route path="/product/:productId" element={<Product/>} />
     <Route path="/cart" element={<Cart/>}/>
     <Route path="/login" element={<LoginSignup/>}/>
     </Routes>
     <Footer/>
     </BrowserRouter>

    </div>
  );
}

export default App;
