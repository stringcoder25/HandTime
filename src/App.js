import { Route, Routes } from 'react-router-dom';
import Header1 from './components/header';
import AboutSection from './pages/aboutSection';
import ServiceSeaction from './pages/servicesSeaction';
import Login from './pages/login/login';
import Product from './pages/product/product';
import Main from './pages/main';
import './App.css';
import CartComponent from './components/cartComponent';
import Signup from './pages/login/signup';
import Profile from './pages/login/profile';


export default function App() {

  return (
    <>
      <Header1 />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<AboutSection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={< Signup/>} />
        <Route path='/service' element={<ServiceSeaction />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<CartComponent />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {/* <Footer/> */}
    </>
  );
}


