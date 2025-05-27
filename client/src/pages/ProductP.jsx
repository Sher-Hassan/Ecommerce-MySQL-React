import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import "../styles/ProductP.css";
import { useCart } from "../components/CartContext";

const ProductPage = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.productData;
  const { addToCart } = useCart();
  const [recommended, setRecommended] = useState([]);
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.CategoryID) {
      axios.get("/products").then((res) => {
        const data = res.data.filter(
          (p) => p.CategoryID === product.CategoryID && p.ProductID !== product.ProductID
        );
        setRecommended(data.slice(0, 4));
      });
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/Login');
      return;
    }
    const cartItem = {
      UserID: user.UserID, // Pass UserID for backend
      ProductID: product.ProductID,
      ProductName: product.ProductName,
      Price: product.Price,
      Size: selectedSize,
      Quantity: quantity,
      Cover: product.Cover,
    };

    try {
      await axios.post("/cart/add", cartItem);
      addToCart(cartItem);
      console.log("Product added to cart.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };


    return (
      <div className="container">
        <div className='container-top'>
          {/* Left Column / Product Image */}
          <div className="left-column">
            {product?.Cover ? (
              <img className="active" src={product.Cover} alt={product.ProductName} />
            ) : (
              <img className="active" src="images/red.png" alt="Product" />
            )}
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Product Description */}
            <div className="product-description">
              <h1>{product?.ProductName || 'Product Name'}</h1>
              <p>{product?.Description || 'Product description not available.'}</p>
              <p>Product ID: {product?.ProductID ?? 'nn'}</p>
            </div>

            {/* Product Configuration */}
            <div className="product-configuration">
              {/* Product Size */}
              <div className="product-size">
                <span>Size</span>
                <div className="size-choose">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <div key={size}>
                      <input type="radio" id={`size-${size.toLowerCase()}`} name="size" value={size} checked={selectedSize === size} onChange={() => setSelectedSize(size)} />
                      <label htmlFor={`size-${size.toLowerCase()}`}><span>{size}</span></label>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span>Quantity</span>
                <input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ width: '60px', marginLeft: '10px' }} />
              </div>
            </div>

            {/* Product Pricing */}
            <div className="product-price">
              <span>{product ? `$${Number(product.Price).toFixed(2)}` : 'Price not available'}</span>
              <a href="#" className="cart-btn" onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}>Add to cart</a>

            </div>
          </div>
        </div>
        <div className='container-bottom'>

          {/* Recommended Products */}
          {recommended.length > 0 && (
            <div style={{ width: '100%', marginTop: '45px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '50px' }}>Recommended Products</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                maxWidth: '70vw',
                margin: '0 auto',
              }}>
                {recommended.map(rp => (
                  <div key={rp.ProductID} style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate('/Products/Page', {
                        state: {
                          productData: {
                            ProductID: rp.ProductID,
                            ProductName: rp.ProductName,
                            Description: rp.Description,
                            Price: rp.Price,
                            CategoryID: rp.CategoryID,
                            Cover: rp.Cover,
                          },
                        },
                      });
                    }}
                  >
                    <img src={rp.Cover} alt={rp.ProductName} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '8px' }}>{rp.ProductName}</h3>
                    <p style={{ fontSize: '0.95rem', color: '#555', margin: '4px 0' }}>{rp.Description}</p>
                    <p style={{ fontWeight: 'bold', color: '#16a34a', fontSize: '1.05rem' }}>${Number(rp.Price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  export default ProductPage;
