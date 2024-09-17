import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { AiFillInstagram, AiFillGithub, AiFillLinkedin, AiFillTwitterCircle, AiFillFacebook } from "react-icons/ai";
import { Link } from 'react-router-dom';

// ฟังก์ชัน Ball ใช้สร้างลูกบอลที่มีสีพื้นหลังและเคลื่อนไหวลงไปในแนวแกน y
function Ball({ position, color }) {
    const ref = useRef();

    useFrame(() => {
        // ลดตำแหน่ง y ของลูกบอลลงทุกๆ เฟรม
        ref.current.position.y -= 0.1;
        // ถ้าตำแหน่ง y ของลูกบอลต่ำกว่า -10 ให้รีเซ็ตตำแหน่ง y กลับไปที่ 10
        if (ref.current.position.y < -10) {
            ref.current.position.y = 10;
        }
        // หมุนลูกบอลบนแกน Y หรือ Z เพื่อให้หน้ายิ้มหันไปทางกล้อง
        ref.current.rotation.y += 0.02;  // ปรับการหมุนบนแกน Y
        ref.current.rotation.z += 0.01;  // ปรับการหมุนบนแกน Z (สามารถปรับค่าการหมุนตามที่ต้องการ)
    });

    return (
        // สร้างวัตถุ Sphere ที่มีการอ้างอิง ref
        <Sphere ref={ref} args={[1.5, 32, 32]} position={position}>
            {/* ตั้งค่าสีของวัสดุของ Sphere */}
            <meshPhysicalMaterial
                attach="material"
                color={color}
                metalness={0.1} // เพิ่มความมันวาวเล็กน้อย
                roughness={0.05} // ลดความหยาบของพื้นผิว
                transparent={true} // เปิดใช้งานความโปร่งใส
                opacity={0.5} // กำหนดความโปร่งใสของลูกบอล
                clearCoat={1} // เพิ่มความเงางาม
                clearCoatRoughness={0} // ลดความหยาบของ clear coat
                refractionRatio={0.98} // ตั้งค่า refraction เพื่อให้ดูเหมือนกระจก
            />
        </Sphere>
    );
}

// ฟังก์ชัน FallingBalls ใช้สร้างชุดของลูกบอลที่ตกลงมา
function FallingBalls() {
    // สร้างชุดของตำแหน่งและสีสำหรับลูกบอล
    const positions = new Array(10).fill().map(() => [
        (Math.random() - 0.5) * 20,
        Math.random() * 20 + 10, // เปลี่ยนให้ค่าเริ่มต้นไม่ต่ำกว่า 10
        (Math.random() - 0.5) * 20,
    ]);

    const colors = [
        '#FF8BA7',
        '#C3F0CA',
    ];

    return (
        <Canvas
            className="top-0 left-0 w-full h-full z-0"
            orthographic // เปิดใช้งานกล้องแบบ orthographic
            camera={{ zoom: 50, position: [0, 0, 100] }} // ปรับ zoom และตำแหน่งกล้องให้เหมาะสม
        >
            <ambientLight intensity={0.4} /> {/* แสงสว่างทั่วพื้นที่ */}
            <pointLight position={[1, 10, 10]} intensity={0.8} /> {/* จุดไฟ */}
            <directionalLight position={[0, 10, 5]} intensity={1} /> {/* แสงทิศทาง */}
            {positions.map((pos, i) => (
                <Ball key={i} position={pos} color={colors[i % colors.length]} />
            ))}
        </Canvas>
    );
}

const Footer = () => {
    return (
        <div className="relative tablet:h-96 container mx-auto py-4 mt-8 max-w-screen-laptopl">
            {/* ลูกบอลที่ตกลงมา */}
            <div className='absolute top-0 right-4 left-4 mx-auto rounded-lg w-screen-laptopl h-full overflow-hidden bg-[#E9E4D6]/60 z-0'>
                <FallingBalls />
            </div>

            {/* ส่วน Footer ที่จะอยู่ด้านบนสุด */}
            <footer className="relative bottom-0 tablet:top-20 rounded-2xl bg-white/60 z-10 max-w-screen-desktop mx-auto px-4 py-6 my-8">
                <div className="px-4">
                    <div className="grid grid-cols-1 tablet:grid-cols-5 content-around gap-4">
                        <div className='col-span-2 mb-4 tablet:mb-0'>
                            <h1
                                className="font-bold text-lg text-gray-800"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                Lalafell Keyboard
                            </h1>
                        </div>
                        <div className='col-span-3'>
                            <div className="grid grid-cols-2 tablet:grid-cols-3 gap-4">
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">Quick Links</h3>
                                    <ul>
                                        <li><a href="/about" className="text-gray-800 text-sm mb-2 hover:underline">About Us</a></li>
                                        <li><a href="/services" className="text-gray-800 text-sm mb-2 hover:underline">Services</a></li>
                                        <li><a href="/products" className="text-gray-800 text-sm mb-2 hover:underline">Products</a></li>
                                        <li><a href="/blog" className="text-gray-800 text-sm mb-2 hover:underline">Blog</a></li>
                                        <li><a href="/faq" className="text-gray-800 text-sm mb-2 hover:underline">FAQ</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">Policies</h3>
                                    <ul>
                                        <li><a href="/privacy" className="text-gray-800 text-sm mb-2 hover:underline">Privacy Policy</a></li>
                                        <li><a href="/terms" className="text-gray-800 text-sm mb-2 hover:underline">Terms of Service</a></li>
                                        <li><a href="/returns" className="text-gray-800 text-sm mb-2 hover:underline">Return & Refund Policy</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-2">Contact Us</h3>
                                    <ul>
                                        <li className='text-gray-800 text-sm mb-2'>Address: 123 Lalafell St, City, Country</li>
                                        <li className='text-gray-800 text-sm mb-2'>Phone: (123) 456-7890</li>
                                        <li className='text-gray-800 text-sm mb-2'>Email: support@lalafellkeyboards.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col laptop:flex-row justify-between">
                        <p className="text-xs text-gray-800 mt-4">© 2024 Lalafell Keyboard. All rights reserved.</p>
                        <div className='flex tablet:justify-end space-x-2 mt-4 laptop:mt-0'>
                            <AiFillGithub size={24} />
                            <AiFillInstagram size={24} />
                            <AiFillLinkedin size={24} />
                            <AiFillTwitterCircle size={24} />
                            <AiFillFacebook size={24} />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
