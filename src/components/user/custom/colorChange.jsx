import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Keycap from './Keycap'; // Import Keycap component

const App = () => {
  const [textureUrl, setTextureUrl] = useState(null);

  // Function for uploading texture image
  const handleTextureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTextureUrl(url);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <input type="file" accept="image/*" onChange={handleTextureUpload} />
      <Canvas
        camera={{ position: [0, 0, 2] }} // Set camera position
        shadows
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} castShadow />
        <Keycap textureUrl={textureUrl} /> {/* Pass textureUrl to Keycap */}
      </Canvas>
    </div>
  );
};

export default App;

