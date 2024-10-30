import { Canvas } from '@react-three/fiber';
import Keycap from './Keycap';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

const CustomPage = () => {
  const [keycapColor, setKeycapColor] = useState("#F5F5DC"); // สีเริ่มต้น

  const handleColorChange = (event) => {
    setKeycapColor(event.target.value); // อัพเดตสีเมื่อผู้ใช้เลือก
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <Canvas>
        <ambientLight color={0xffffff} intensity={3} />
        <directionalLight color={0xffffff} position={[5, 5, 5]} intensity={1} />
        <Keycap color={keycapColor} /> {/* ส่ง prop color */}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      
      <input 
        type="color" 
        value={keycapColor} 
        onChange={handleColorChange} 
        className="mt-4" 
      />
    </div>
  );
}

export default CustomPage;
