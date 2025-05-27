import React, { useEffect, useState, Suspense } from 'react';
import Slider from 'react-slick';
import '../styles/Home.css'; // Import the CSS file
import '../styles/bag.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovingS from '../components/MovingS.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import axios from '../utils/axios.js';
import Bag from '../3DModel/Bag.jsx'; 

// Preload the bag model for faster loading
useGLTF.preload('/src/3DModel/Bag.gltf');

const animatedTexts = [
  {
    h2: 'Discover the latest trends in fashion and accessories.',
    p: 'Shop now and elevate your style with our exclusive collection.'
  },
  {
    h2: 'Step into elegance with our curated seasonal arrivals.',
    p: 'Refresh your wardrobe and stand out with every look.'
  },
  {
    h2: 'Unleash your style with premium fashion essentials.',
    p: 'Find your perfect outfit and express your unique taste.'
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        let data = Array.isArray(response.data) ? response.data : [];
        // Shuffle and pick up to 20 random products
        data = data.sort(() => 0.5 - Math.random()).slice(0, 20);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % animatedTexts.length);
        setFade(true);
      }, 800); // fade out duration
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <div className='hero'>
        <div className="herol">
          <div className="head">
            <div className='h2n'>
              GIZMO
              <Canvas camera={{ position: [0, 0, 2] }} dpr={[1, 1]}> 
                <Suspense fallback={<Html center>Loading...</Html>}>
                  <ambientLight />
                  <OrbitControls enableZoom={false} minDistance={0.7} maxDistance={0.7} autoRotate autoRotateSpeed={7} />
                  <Bag />
                </Suspense>
              </Canvas>
            </div>
            <h1 className='h1n'>FASHION</h1>
          </div>
          <div className="descript">
            <h2 className={`fade-text${fade ? ' visible' : ''}`}>{animatedTexts[textIndex].h2}</h2>
            <p className={`fade-text${fade ? ' visible' : ''}`}>{animatedTexts[textIndex].p}</p>
          </div>
          <div className="btn btnhome">
            <Link to="/products">Explore Products</Link>
          </div>
        </div>
        <div className="heror">
          <img className='heroimg' src="src\Resources\Home Model2.png" alt="heroimg" />
        </div>
      </div>
      <MovingS />
      <section className="Section2">
        <div className="sec2l">
          <div className="sec11">
            <div className="btn sec2btn">
              <Link to="/products">Browse Collection</Link>
            </div>
          </div>
          <div className="sec12">
            <div className="btn sec2btn">
              <Link to="/products">View Catalog</Link>
            </div>
          </div>
        </div>
        <div className="sec2r">
          <div className="sec21">
            <div className="btn">
              <Link to="/products">Shop Now</Link>
            </div>
          </div>
          <div className="sec22">
            <div className="btn">
              <Link to="/products">See More</Link>
            </div>
          </div>
        </div>
      </section>
      <MovingS />
      <section>
        <div className='homeSec3'>
          <h1>Trending Products</h1>
        </div>
        <div className="homProducts">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.ProductID}
              className="product-card"
              onClick={() => {
                navigate("/Products/Page", {
                  state: {
                    productData: {
                      ProductName: product.ProductName,
                      Description: product.Description,
                      Price: product.Price,
                      CategoryID: product.CategoryID,
                      Cover: product.Cover,
                    },
                  },
                });
              }}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.Cover} alt={product.ProductName} className="product-image" />
              <h3>{product.ProductName}</h3>
              <p>{product.Description}</p>
              <p>{product.Price}$</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
