import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from './ProductCard';
import axiosInstance from '../../../utils/axiosInstance';

const WhatNewProduct = () => {
    const [limitedProducts, setLimitedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axiosInstance.get('/products');
                const products = response.data.products;

                if (!Array.isArray(products)) {
                    throw new Error('Products is not an array');
                }

                // Sort products by timestamp
                const sortedProducts = products.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                const limitedProducts = sortedProducts.slice(0, 4);

                setLimitedProducts(limitedProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
        });
    }, []);

    if (loading) return <p>Loading the hottest products...</p>;
    if (error) return <p>Oops! There seems to be an error: {error}</p>;

    return (
        <div className="container mx-auto p-8 mt-8 max-w-screen-laptopl custom-bg rounded-lg">
            <div className="relative mb-10">
                <h1 className="text-4xl tablet:text-5xl font-extrabold text-center text-transparent bg-clip-text transform -rotate-2"
                    style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        WebkitTextStroke: '1px #000000',
                    }}
                    data-aos="zoom-in"
                    data-aos-duration="1200">
                    What's New
                </h1>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12">
                    <span className="inline-block bg-[#fcf1b1] text-yellow-800 text-sm font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
                        Hot!
                    </span>
                </div>
            </div>

            {/* Horizontal scrolling container */}
            <div className="flex justify-between overflow-x-auto scroll-smooth gap-4 transition duration-500 ">
                {limitedProducts.map((product) => (
                    <div key={product._id} className="flex-shrink-0 w-64  tablet:w-auto">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhatNewProduct;
