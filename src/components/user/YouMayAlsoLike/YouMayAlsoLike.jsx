import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // นำเข้าไฟล์สไตล์ของ AOS
import ProductCard from '../Products/ProductCard';
import axiosInstance from '../../../utils/axiosInstance';

const YouMayAlsoLike = () => {
    const [products, setProducts] = useState([]); // Store all products
    const [limitedProducts, setLimitedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to shuffle the products array
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
                const response = await axiosInstance.get('/products'); // แก้ไข URL ให้ตรงกับ API ของคุณ
                const products = response.data.products;

                // ตรวจสอบประเภทของข้อมูล
                console.log('Fetched products:', products);

                if (!Array.isArray(products)) {
                    throw new Error('Products is not an array');
                }

                // Set all fetched products to state
                setProducts(products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []); // Runs once on mount

    useEffect(() => {
        // AOS initialization
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
        });

        // Timer to change displayed products every 5 seconds
        const intervalId = setInterval(() => {
            if (products.length > 0) {
                const shuffledProducts = shuffleArray([...products]); // Shuffle products
                setLimitedProducts(shuffledProducts.slice(0, 4)); // Show 4 random products
            }
        }, 5000); // Change every 5 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [products]);

    // Initial display of products after loading
    useEffect(() => {
        if (!loading && products.length > 0) {
            const shuffledProducts = shuffleArray([...products]);
            setLimitedProducts(shuffledProducts.slice(0, 4));
        }
    }, [loading, products]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto px-4 mt-8 max-w-screen-laptopl">
            <h1 className="text-2xl font-bold mb-2" data-aos="fade-up">You May Also Like</h1>
            <div className="overflow-hidden">
                <div
                    data-aos="slide-up"
                    data-aos-offset="50"
                    data-aos-delay="100"
                    data-aos-duration="900"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="false"
                    data-aos-once="false"
                >
                    <div className="hidden mobile:flex overflow-x-auto whitespace-nowrap gap-4">
                        {limitedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouMayAlsoLike;

