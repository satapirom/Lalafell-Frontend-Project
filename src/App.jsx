import './App.css';
import Navbar from './components/user/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/user/Home';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Footer from './components/user/Footer/Footer';
import Product from './pages/user/Product.jsx';
import Profile from './pages/user/Profile.jsx';
import ProductDetail from './components/user/ProductDetail/ProductDetail.jsx';
import Settings from './pages/user/Settings.jsx';
import Checkout from './pages/user/Checkout.jsx';
import AddToCartPage from './pages/user/AddToCartPage.jsx';
import OrderedStatePage from './pages/user/OrderedStatePage.jsx';
import CartPage from './pages/user/CartPage.jsx';
import DeliveryAddressManagement from './components/user/Checkout/DeliveryAddressManagement.jsx';
import SelectPaymethod from './components/user/Checkout/SelectPayMethod.jsx';
import OrderSuccess from './components/user/Checkout/OrderSuccess.jsx';

// admin
import AddProducts from './pages/admin/AddProducts.jsx';
import Card from './components/user/OurProduct/Card.jsx';


function App() {
  return (
    <Router> {/* ห่อ Router ก่อน */}
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Router>
  );
}

// แยก MainApp ออกมาเพื่อใช้ useLocation
function MainApp() {
  const location = useLocation();

  // ตรวจสอบ pathname เพื่อซ่อน Footer ในหน้า Register และ Login
  const noFooterPaths = ['/register', '/login'];

  return (
    <>
      <Navbar />
      <Routes>
        {/* User */}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path='/cart' element={<AddToCartPage />} />
        <Route path='/ordered' element={<OrderedStatePage />} />
        <Route path='/cartpage' element={<CartPage />} />
        <Route path='/address' element={<DeliveryAddressManagement />} />
        <Route path='/paymethod' element={<SelectPaymethod />} />
        <Route path='/order-confirmation' element={<OrderSuccess />} />




        {/* Admin */}
        <Route path="/products/new" element={<AddProducts />} />
      </Routes>

      {/* แสดง Footer ก็ต่อเมื่อไม่ใช่เส้นทาง Register หรือ Login */}
      {/* {!noFooterPaths.includes(location.pathname) && <Footer />} */}
    </>
  );
}

export default App;



