import './App.css'
import Navbar from './components/user/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddNewProduct from './pages/admin/AddNewProducts';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/user/Home/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* User */}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Admin */}
        <Route path='/admin' element={<AddNewProduct />} />
      </Routes>
    </Router>
  )
}

export default App;


