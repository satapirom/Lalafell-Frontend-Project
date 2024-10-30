import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Keycap({ color }) {
  const meshRef = useRef();

  // ขนาดของคีย์แคป
  const bottomWidth = 0.6;  // ความกว้างด้านล่าง
  const topWidth = 0.4;     // ความกว้างด้านบน
  const height = 0.3;       // ความสูงของคีย์แคป
  const depth = 0.4;        // ความลึกของคีย์แคป

  // สร้างรูปทรงที่มีด้านล่างกว้างกว่าด้านบนแบบสมมาตร
  const shape = new THREE.Shape();
  shape.moveTo(-bottomWidth / 2, 0);         // มุมซ้ายล่าง
  shape.lineTo(bottomWidth / 2, 0);          // มุมขวาล่าง
  shape.lineTo(topWidth / 2, height);        // มุมขวาบน
  shape.lineTo(-topWidth / 2, height);       // มุมซ้ายบน
  shape.lineTo(-bottomWidth / 2, 0);         // ปิดเส้นรอบวงกลับไปที่จุดเริ่มต้น

  const extrudeSettings = {
    steps: 1,
    depth: depth, // ความลึก
    bevelEnabled: true,
    bevelThickness: 0.05, // ความหนาของ bevel
    bevelSize: 0.05,      // ขนาด bevel
  };

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial 
        color={color}           // ใช้ prop color
        roughness={0.4}        // ปรับ roughness ให้ดูมีเงา
        metalness={0.2}        // ปรับ metalness เพื่อให้มีความเงางามเล็กน้อย
      />
    </mesh>
  );
}




