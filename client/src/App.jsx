import React, {useState, useEffect} from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import ProductP from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductPage from './pages/ProductP'; 
import About from './pages/About';
import { CartProvider } from './components/CartContext';
import gsap from 'gsap';

import './styles/App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {

  const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear token cookie
    };

    useEffect(() => {
      function startLoader() {
      let counterElement = document.querySelector(".counter");
      let currentValue = 0;
      function updateCounter() {
        if (currentValue >= 100) {
        currentValue = 100;
        if (counterElement) counterElement.textContent = currentValue;
        return;
        }
        currentValue += 1;
        if (counterElement) counterElement.textContent = currentValue;
        setTimeout(updateCounter, 15); // Decreased from 10 to 5 for faster counting
      }
      updateCounter();
      }
      startLoader();
      gsap.to(".counter", { duration: 0.25, delay: 3.5, opacity: 0, ease: "power4.inOut" });
      gsap.to(".bar", { duration: 1.5, delay: 2.5, height: 0, stagger: { amount: 0.5 }, ease: "power4.inOut" });
      
    }, []);

  return (
    <CartProvider>
      <div className="app" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <ScrollToTop />
        <div className="overlay">
        <h1 className="counter">0</h1>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
    </div>
        <Navbar user={user} handleLogout={handleLogout}/>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Products" element={<ProductP />} />
            <Route path="/About" element={<About />} />
            <Route path="/Products/Page" element={<ProductPage user={user} />} />
            <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
