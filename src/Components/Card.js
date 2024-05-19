import React, { useState, useEffect } from 'react';
import './Card.css';
import Sidebar from './Sidebar';

const Card = () => {
  const [dataArray, setDataArray] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost/api.php');
      const data = await response.json();
      setDataArray(data);
      console.log(data);
    };

    fetchData();
  }, []);
  return (   
    <div className="main-container">
          <Sidebar selectedProduct={selectedProduct} />
          <div className="card-container">
            {dataArray.map((item, index) => (
              <div key={index} className="card" onClick={() => setSelectedProduct(item)}>
                <img className="card-image" src={item.image} alt={item.title} />
                <div className="card-content">
                  <h5 className="card-title">{item.title} {index + 1}</h5>
                  <h6 className="card-subtitle">Category: {item.category}</h6>
                  {/* <p className="card-text">{item.description}</p> */}
                  <p className="card-text">Price: ${item.price}</p>
                  {/* <a href="/">Link of product</a> */}
                  <br></br>
                  <button className='buy-button'>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        
    </div>
  );
};

export default Card;
