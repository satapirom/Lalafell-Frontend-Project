import './App.css';
import Navbar from './components/user/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AddNewProduct from './pages/admin/AddNewProducts';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/user/Home';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Footer from './components/user/Footer/Footer';
import Product from './pages/user/Product.jsx';

// admin
import AddProducts from './pages/admin/AddProducts.jsx';
import Card from './components/user/OurProduct/Card.jsx';
import ProductDetail from './components/user/ProductDetail/ProductDetail.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
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


        {/* Admin */}
        <Route path="/products/new" element={<AddProducts />} />
      </Routes>

      {/* แสดง Footer ก็ต่อเมื่อไม่ใช่เส้นทาง Register หรือ Login */}
      {/* {!noFooterPaths.includes(location.pathname) && <Footer />} */}
    </>
  );
}

export default App;


