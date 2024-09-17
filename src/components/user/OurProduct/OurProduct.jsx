import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // นำเข้าไฟล์สไตล์ของ AOS
import KeyboardCard from './KeyboardCard';
import KeycapCard from './KeycapCard';
import SwichesCard from './SwichesCard';

const OurProduct = () => {
    useEffect(() => {
        AOS.init({
            duration: 800, // ระยะเวลาแอนิเมชัน
            easing: 'ease-in-out',
            once: false, // ไม่ให้แอนิเมชันแสดงเพียงครั้งเดียว
        });
    }, []);

    return (
        <div className="container mx-auto px-4 mt-8 max-w-screen-laptopl">
            <h1 className="text-2xl font-bold mb-2" data-aos="fade-up">Our Products</h1>
            <div className="grid grid-cols-1 tablet:grid-cols-3 tablet:gap-4">
                <div
                    data-aos="slide-up" // เปลี่ยนเป็น slide-up แทนการ fade
                    data-aos-offset="50"
                    data-aos-delay="50"
                    data-aos-duration="700"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="false"
                    data-aos-once="false"
                >
                    <KeyboardCard />
                </div>
                <div
                    data-aos="slide-up"
                    data-aos-offset="50"
                    data-aos-delay="100"
                    data-aos-duration="900"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="false"
                    data-aos-once="false"
                >
                    <KeycapCard />
                </div>
                <div
                    data-aos="slide-up"
                    data-aos-offset="50"
                    data-aos-delay="150"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="false"
                    data-aos-once="false"
                >
                    <SwichesCard />
                </div>
            </div>
        </div>
    );
};

export default OurProduct;
