import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, AccumulativeShadows, RandomizedLight, Lightformer, SoftShadows } from '@react-three/drei';
import Keycap from './Keycap';

const CustomPage = () => {
  const [textureUrl, setTextureUrl] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTextureUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Custom Keycap Mockup
          </h1>
          <div className="mt-4">
            <label className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
              Upload Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="h-[500px] w-full">
            <Canvas
              camera={{ position: [0, 0, 2], fov: 50 }}
              shadows="soft"
              gl={{ preserveDrawingBuffer: true }}
            >
              {/* เพิ่ม Soft Shadows */}
              <SoftShadows size={2.5} samples={16} focus={0.5} />

              {/* แสงสว่างพื้นฐาน */}
              <ambientLight intensity={0.3} />

              {/* แสงหลัก */}
              <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-bias={-0.0001}
              />

              {/* แสงเสริมด้านข้าง */}
              <pointLight position={[-5, 2, 0]} intensity={0.5} />
              <pointLight position={[5, 2, 0]} intensity={0.5} />

              {/* แสงสะท้อนจากพื้น */}
              <rectAreaLight
                position={[0, -2, 0]}
                width={10}
                height={10}
                intensity={0.5}
                rotation={[-Math.PI / 2, 0, 0]}
              />

              {/* Environment map สำหรับการสะท้อน */}
              <Environment preset="studio" />

              {/* เงาสะสม */}
              <AccumulativeShadows
                temporal
                frames={60}
                alphaTest={0.85}
                scale={10}
                position={[0, -0.5, 0]}
              >
                <RandomizedLight
                  amount={8}
                  radius={5}
                  ambient={0.5}
                  intensity={1}
                  position={[5, 5, -10]}
                  bias={0.001}
                />
              </AccumulativeShadows>

              <Keycap textureUrl={textureUrl} />

              <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={1}
                maxDistance={5}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPage;
