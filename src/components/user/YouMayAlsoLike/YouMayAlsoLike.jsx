import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from '../Products/ProductCard';
import axiosInstance from '../../../utils/axiosInstance';

const YouMayAlsoLike = () => {
    const [products, setProducts] = useState([]);
    const [limitedProducts, setLimitedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axiosInstance.get('/products');
                const products = response.data.products;
                console.log('Fetched products:', products);

                if (!Array.isArray(products)) {
                    throw new Error('Products is not an array');
                }
                setProducts(products);
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

        const intervalId = setInterval(() => {
            if (products.length > 0) {
                const shuffledProducts = shuffleArray([...products]);
                setLimitedProducts(shuffledProducts.slice(0, 4));
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [products]);

    useEffect(() => {
        if (!loading && products.length > 0) {
            const shuffledProducts = shuffleArray([...products]);
            setLimitedProducts(shuffledProducts.slice(0, 4));
        }
    }, [loading, products]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
                    <span className="absolute top-20 left-1/2 transform -translate-x-1/2 text-primary-color font-medium">
                        Loading Magic ✨
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-6 bg-red-50 rounded-xl shadow-lg">
                <span className="text-2xl mb-2">🙈</span>
                <p className="text-red-600 font-medium">Oopsie! {error}</p>
            </div>
        );
    }

    return (
        <div className="relative container mx-auto px-4 py-12 mt-8 max-w-screen-laptopl overflow-hidden">
            {/* Fancy Background */}
            <div className="absolute inset-0 custom-bg opacity-80 rounded-lg"></div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-5 w-32 h-32 bg-primary-color/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-10 right-5 w-32 h-32 bg-primary-color/20 rounded-full blur-xl animate-float-delay"></div>
                <span className="absolute top-8 right-12 text-xl animate-bounce">✨</span>
                <span className="absolute bottom-12 left-8 text-xl animate-pulse">🌟</span>
                <div className="absolute top-1/2 left-4 w-2 h-2 bg-primary-color rounded-full animate-ping"></div>
                <div className="absolute top-1/4 right-8 w-2 h-2 bg-primary-color rounded-full animate-ping delay-300"></div>
            </div>

            <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-center" data-aos="fade-up">
                    <span className="relative inline-block group">
                        <span className="relative inline-block transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                            ✨ You May
                        </span>
                        <span className="absolute -top-1 right-0 text-sm animate-bounce">✦</span>
                    </span>
                    {" "}
                    <span className="relative inline-block group">
                        <span className="relative inline-block transform hover:-rotate-3 transition-transform duration-300 cursor-pointer">
                            Also
                        </span>
                        <span className="absolute -top-2 right-0 text-sm animate-ping">♡</span>
                    </span>
                    {" "}
                    <span className="relative inline-block group">
                        <span className="relative inline-block transform hover:rotate-3 transition-transform duration-300 cursor-pointer">
                            Like ✨
                        </span>
                        <span className="absolute -top-1 right-0 text-sm animate-bounce delay-75">★</span>
                    </span>

                    {/* Fancy animated underline */}
                    <div className="relative mt-2">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-secondary-color to-primary-color rounded-full"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-secondary-color to-primary-color rounded-full animate-shimmer"></div>
                    </div>
                </h1>

                <div className="relative overflow-hidden ">
                    <div
                        data-aos="fade-up"
                        data-aos-offset="50"
                        data-aos-delay="100"
                        data-aos-duration="900"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="false"
                        data-aos-once="false"
                        className="relative py-6 px-4"
                    >
                        <div className="hidden mobile:flex overflow-x-auto whitespace-nowrap gap-6 scrollbar-hide">
                            {limitedProducts.map((product, index) => (
                                <div
                                    key={product._id}
                                    className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                                    style={{
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >
                                    <div className="relative group">
                                        <ProductCard product={product} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouMayAlsoLike;


