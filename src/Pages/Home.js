import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Carousel } from 'antd';
import ProductsSection from '../Sections/ProductsSection';
import { useMediaQuery } from '@react-hook/media-query';

export default function Home() {
  const [products, setProducts] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:iDNrOW_s/products');
      //const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      const sortedData = data.sort((a, b) => b.id - a.id); // Sorting data from largest ID to smallest ID
      setProducts(sortedData);
      // setProducts(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="container max-w-9xl mx-auto px-4 pb-8" basename="/">
      <Carousel arrows infinite autoplay>
          <img src={isMobile ? "/slide_mobile.jpg" : "/slide.jpeg"} alt="carousel image" />
          <img src={isMobile ? "/slide_mobile.jpg" : "/slide.jpeg"} alt="carousel image" />
          <img src={isMobile ? "/BD.jpg" : "/BD.jpeg"} alt="carousel image" />
      </Carousel>
      <ProductsSection products={products} />
      <ToastContainer />
    </div>
  );
}
