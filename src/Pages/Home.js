import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard';
import { ToastContainer } from 'react-toastify';


export default function Home() {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    // const response = await fetch('http://localhost/api/');
    // const response = await fetch('https://fakestoreapi.com/products');
    // const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const response = await fetch('https://tourgui.000.pe');
    const data = await response.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8"  basename="/">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
