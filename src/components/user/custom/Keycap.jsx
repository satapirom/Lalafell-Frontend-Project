import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Keycap = ({ textureUrl, color = '#ffffff' }) => {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);

  // Dimensions for the keycap
  const bottomWidth = 0.65;
  const topWidth = 0.45;
  const height = 0.35;
  const depth = 0.45;
  const bevelSize = 0.015;
  const hollowDepth = 0.15; // ความลึกของแอ่ง

  // Create outer keycap shape
  const outerShape = new THREE.Shape();
  outerShape.moveTo(-bottomWidth / 2, 0);
  outerShape.lineTo(bottomWidth / 2, 0);
  outerShape.lineTo(topWidth / 2, height - bevelSize);
  outerShape.quadraticCurveTo(topWidth / 2, height, 0, height);
  outerShape.quadraticCurveTo(-topWidth / 2, height, -topWidth / 2, height - bevelSize);
  outerShape.lineTo(-bottomWidth / 2, 0);

  // Create inner shape for the hollow part (the hollow area)
  const innerShape = new THREE.Shape();
  const hollowWidth = 0.4; // ความกว้างของรู
  const hollowHeight = height - hollowDepth; // ความสูงของรู
  innerShape.moveTo(-hollowWidth / 2, 0);
  innerShape.lineTo(hollowWidth / 2, 0);
  innerShape.lineTo(hollowWidth / 2, hollowHeight - bevelSize);
  innerShape.quadraticCurveTo(hollowWidth / 2, hollowHeight, 0, hollowHeight);
  innerShape.quadraticCurveTo(-hollowWidth / 2, hollowHeight, -hollowWidth / 2, hollowHeight - bevelSize);
  innerShape.lineTo(-hollowWidth / 2, 0);

  // Extrude settings
  const outerExtrudeSettings = {
    steps: 2,
    depth: depth,
    bevelEnabled: true,
    bevelThickness: bevelSize,
    bevelSize: bevelSize,
    bevelSegments: 5,
  };

  const innerExtrudeSettings = {
    steps: 1,
    depth: hollowDepth, // ความลึกของการเว้า
    bevelEnabled: false,
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.updateMatrixWorld();
    }
  });

  // Texture loading
  useEffect(() => {
    if (textureUrl) {
      const loader = new THREE.TextureLoader();
      loader.load(textureUrl, (loadedTexture) => {
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.repeat.set(1, 1);
        loadedTexture.encoding = THREE.sRGBEncoding;
        loadedTexture.anisotropy = 16;
        loadedTexture.generateMipmaps = true;
        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
      }, undefined, (error) => {
        console.error("Error loading texture:", error);
        setTexture(null);
      });
    }
  }, [textureUrl]);

  return (
    <group ref={meshRef}>
      {/* Outer keycap */}
      <mesh>
        <extrudeGeometry args={[outerShape, outerExtrudeSettings]} />
        <meshPhysicalMaterial
          color={color}
          map={texture}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          reflectivity={1}
          envMapIntensity={1.5}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.95}
        />
      </mesh>

      {/* Inner hollow part (concave) */}
      <mesh position={[0, 0, -depth + hollowDepth]}>
        <extrudeGeometry args={[innerShape, innerExtrudeSettings]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.0} />
      </mesh>
    </group>
  );
};

export default Keycap;


