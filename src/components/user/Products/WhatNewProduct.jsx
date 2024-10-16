import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // นำเข้าไฟล์สไตล์ของ AOS
import ProductCard from './ProductCard';
import axiosInstance from '../../../utils/axiosInstance';

const WhatNewProduct = () => {
    const [limitedProducts, setLimitedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                // เรียงตาม timestamp ที่มีอยู่แล้วของสินค้า
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
            duration: 800, // ระยะเวลาแอนิเมชัน
            easing: 'ease-in-out',
            once: false, // ไม่ให้แอนิเมชันแสดงเพียงครั้งเดียว
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto px-4 mt-8 max-w-screen-laptopl">
            <h1 className="text-2xl font-bold mb-2" data-aos="fade-up">What's New</h1>
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

export default WhatNewProduct;