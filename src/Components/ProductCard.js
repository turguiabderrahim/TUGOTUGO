import React from 'react';
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductCard({ product }) {
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

    const truncateTitle = (title, maxLength = 20) => {
        if (title.length <= maxLength) {
            return title;
        }
        return title.slice(0, maxLength) + '...';
    };

    return (
        <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <Link to={"product/"+product.slug} className="relative mx-3 flex-auto overflow-hidden rounded-xl aspect-square">
                <img className="object-scale-down w-full h-full p-4" src={product.image} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{product.discount}% OFF</span>
            </Link>
            <div className="mt-4 px-5 pb-5">
                <Link to={"product/"+product.slug} className='p-0'>
                    <h5 className="text-sm tracking-tight text-slate-900">{truncateTitle(product.title)}</h5>
                </Link>
                <div className="my-2 flex items-center justify-between">
                    <p>
                        <span className="text-base font-bold text-slate-900">{(product.price - (product.price * product.discount) / 100).toFixed(2)}$</span>
                        <span className="text-sm text-slate-900 line-through">{product.price}$</span>
                    </p>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} aria-hidden="true" className="h-2 md:h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                        ))}
                    </div>
                </div>
                <a href="#"
                    onClick={handleCopyCoupon}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-xs text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>

                    Coupon Code
                </a>
            </div>
        </div>
    );
};
