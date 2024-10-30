import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';

const Keycap = ({ url, stickerUrl }) => {
  const { scene } = useGLTF(url);
  const texture = useTexture(stickerUrl); 

  scene.traverse((child) => {
    if (child.isMesh) {
      // ตั้งค่า texture เป็นภาพที่ผู้ใช้เลือก
      child.material.map = texture;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} />;
};

const CustomPage = () => {
  const [stickerUrl, setStickerUrl] = useState(null); 
  const [modelUrl] = useState('./model/scene.gltf');

  const handleStickerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setStickerUrl(url);
    }
  };

  return (
    <div className='mt-24 text-center'>
      <h1>Custom Keycap Design</h1>
      
      <label htmlFor="stickerUploader" style={{ marginBottom: '10px', display: 'block' }}>
        Upload Cartoon Image for Keycap:
      </label>
      <input
        type="file"
        id="stickerUploader"
        accept="image/*"
        onChange={handleStickerUpload}
        style={{ marginBottom: '20px' }}
      />

      <div className="canvas-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', width: '100%', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
        <Canvas style={{ height: '100%', width: '100%' }} shadows>
          <ambientLight intensity={0.5} color="#ffffff" />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
          
          {stickerUrl && <Keycap url={modelUrl} stickerUrl={stickerUrl} />}
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default CustomPage;













