import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadcrumbComponent from "../Components/Breadcrumb";

const fetchProduct = async (slug) => {
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:iDNrOW_s/product/' + slug);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProduct = async () => {
      const fetchedProduct = await fetchProduct(slug);
      setProduct(fetchedProduct);
      setLoading(false);
    };
    
    getProduct();
  }, [slug]);
  const handleCopyCoupon = () => {
    const couponCode = product.coupon;
    navigator.clipboard.writeText(couponCode).then(function () {
        toast.success("Coupon code copied to clipboard: " + couponCode, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }, function () {
        toast.error("Failed to copy coupon code to clipboard.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-100 animate-pulse">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-300 h-64 w-full rounded-lg"></div>
          <div>
            <div className="h-8 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 bg-gray-300 rounded mb-6"></div>
            <div className="h-10 bg-gray-300 rounded mb-6"></div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  if (!product || product.code === "ERROR_CODE_NOT_FOUND" || product.code === "ERROR_CODE_TOO_MANY_REQUESTS") {
    navigate("/not-found");
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg border">
        <BreadcrumbComponent />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* <img src={product.image} alt={product.title} className="object-scale-down w-full h-full p-4 rounded-lg" /> */}
            <div className="relative flex-auto overflow-hidden rounded-xl aspect-square">
                <img className="object-scale-down w-full h-full p-4 rounded" src={product.image} alt={product.title} />
            </div>
            <div className="flex mt-4 space-x-2">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-500 mb-2">Category: {product.category}</p>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-red-600 mr-2">{(product.price - (product.price * product.discount) / 100).toFixed(2)}$</span>
              <span className="text-sm text-gray-500 line-through">{product.price}$</span>
              <span className="ml-2 text-green-600">{product.discount}% off</span>
            </div>
            <p className="text-gray-500 mb-4">Coupon: {product.coupon}</p>
            <div className="flex space-x-4 mb-6">
              <a href={product.Link} target="_blank" rel="noreferrer" className="flex items-center cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 duration-100">
                <FontAwesomeIcon icon={faAmazon} className="mr-2 text-black" />
                Buy on Amazon
              </a>
              <button onClick={handleCopyCoupon} className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                Copy Coupon Code</button>
            </div>
            {/* <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Reviews ({product.reviews.length})</h2>
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index}>
                    <p className="font-bold">{review.author}</p>
                    <p className="text-sm text-gray-600">{review.date}</p>
                    <p className="text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div> */}
            {/* <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <p>Applicable People: {product.details.applicablePeople}</p>
              <p>Application: {product.details.application}</p>
            </div> */}
          </div>
        </div>
      </div>
    <ToastContainer />
    </div>
  );
};

export default ProductPage;
