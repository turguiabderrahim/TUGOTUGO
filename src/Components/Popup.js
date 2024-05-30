import React, { useEffect } from 'react';

const WelcomePopup = () => {
    useEffect(() => {
        const popup = document.getElementById('popup');
        const closeBtn = document.querySelector('.text-gray-600');

        const closePopup = () => {
            popup.style.display = 'none';
        }

        closeBtn.onclick = closePopup;

        window.onclick = (event) => {
            if (event.target === popup) {
                closePopup();
            }
        }

        // Automatically open the popup after 5 seconds
        setTimeout(() => {
            popup.style.display = 'flex';
            // Hide the popup after 10 seconds
            setTimeout(() => {
                closePopup();
            }, 3000);
        }, 1000);

        return () => {
            closeBtn.onclick = null;
            window.onclick = null;
        };
    }, []);

    return (
        <div id="popup" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white mx-auto p-8 border border-gray-300 rounded-lg text-center">
                <span className="text-gray-600 text-3xl cursor-pointer">&times;</span>
                <p className="mt-4">Welcome to Our Website!</p>
                <p className="mt-2 text-sm text-gray-500">We're glad you're here. Explore our website to learn more about us.</p>
            </div>
        </div>
    );
};

export default WelcomePopup;
