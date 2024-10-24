import React, { useEffect, useRef, useState } from 'react';
import { Camera, RotateCcw, Share2 } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const KeyboardBuilder = () => {
    const mountRef = useRef(null);
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [selectedKey, setSelectedKey] = useState(null);

    // Color palette
    const colorPalette = [
        '#FFFFFF', // White
        '#FFE4E1', // Misty Rose
        '#FFB6C1', // Light Pink
        '#E6E6FA', // Lavender
        '#B0C4DE', // Light Steel Blue
        '#98FB98', // Pale Green
        '#F0E68C', // Khaki
        '#DEB887', // Burlywood
        '#D3D3D3', // Light Gray
        '#A9A9A9', // Dark Gray
    ];

    useEffect(() => {
        let scene, camera, renderer, controls;
        let keycaps = [];

        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a202c);

        // Camera setup
        camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 5, 10);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Keyboard base
        const baseGeometry = new THREE.BoxGeometry(14, 0.5, 5);
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0x2a4365,
            shininess: 100
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -0.25;
        base.receiveShadow = true;
        scene.add(base);

        // Key layout data
        const keyLayout = [
            // Row 1 (Function keys)
            { x: -6, y: 0, z: -2, w: 0.7, h: 0.7, label: 'Esc' },
            { x: -4.5, y: 0, z: -2, w: 0.7, h: 0.7, label: 'F1' },
            { x: -3.5, y: 0, z: -2, w: 0.7, h: 0.7, label: 'F2' },
            { x: -2.5, y: 0, z: -2, w: 0.7, h: 0.7, label: 'F3' },
            { x: -1.5, y: 0, z: -2, w: 0.7, h: 0.7, label: 'F4' },
            { x: -0.5, y: 0, z: -2, w: 0.7, h: 0.7, label: 'F5' },
            { x: 0.5, y: 0, z: -2, w: 0.7, h: 0.7, label: 'F6' },
            // Row 2 (Number row)
            { x: -6, y: 0, z: -1, w: 0.7, h: 0.7, label: '`' },
            { x: -5, y: 0, z: -1, w: 0.7, h: 0.7, label: '1' },
            { x: -4, y: 0, z: -1, w: 0.7, h: 0.7, label: '2' },
            { x: -3, y: 0, z: -1, w: 0.7, h: 0.7, label: '3' },
            { x: -2, y: 0, z: -1, w: 0.7, h: 0.7, label: '4' },
            { x: -1, y: 0, z: -1, w: 0.7, h: 0.7, label: '5' },
            // Row 3 (QWERTY)
            { x: -5.75, y: 0, z: 0, w: 1, h: 0.7, label: 'Tab' },
            { x: -4.5, y: 0, z: 0, w: 0.7, h: 0.7, label: 'Q' },
            { x: -3.5, y: 0, z: 0, w: 0.7, h: 0.7, label: 'W' },
            { x: -2.5, y: 0, z: 0, w: 0.7, h: 0.7, label: 'E' },
            { x: -1.5, y: 0, z: 0, w: 0.7, h: 0.7, label: 'R' },
            { x: -0.5, y: 0, z: 0, w: 0.7, h: 0.7, label: 'T' },
        ];

        // Create keycaps
        keyLayout.forEach((key, index) => {
            // Keycap geometry
            const keycapGeometry = new THREE.BoxGeometry(key.w, 0.4, key.h);
            const keycapMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shininess: 100
            });
            const keycap = new THREE.Mesh(keycapGeometry, keycapMaterial);

            keycap.position.set(key.x, key.y, key.z);
            keycap.castShadow = true;
            keycap.userData = { index, label: key.label };

            scene.add(keycap);
            keycaps.push(keycap);
        });

        // Raycaster for mouse interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event) {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(keycaps);

            if (intersects.length > 0) {
                const hoveredKey = intersects[0].object;
                hoveredKey.material.emissive.setHex(0x666666);

                // Reset other keycaps
                keycaps.forEach(keycap => {
                    if (keycap !== hoveredKey) {
                        keycap.material.emissive.setHex(0x000000);
                    }
                });
            }
        }

        function onClick(event) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(keycaps);

            if (intersects.length > 0) {
                const clickedKey = intersects[0].object;
                clickedKey.material.color.setStyle(selectedColor);
                setSelectedKey(clickedKey.userData.label);
            }
        }

        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('click', onClick);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        // Cleanup
        return () => {
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('click', onClick);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    // Update keycap color when selected color changes
    useEffect(() => {
        if (selectedKey) {
            // Handle color update logic here
        }
    }, [selectedColor, selectedKey]);

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white">3D Mechanical Keyboard Builder</h1>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                    {/* Color Palette */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 p-6 rounded-lg sticky top-8">
                            <h2 className="text-xl font-semibold mb-4 text-white">Color Palette</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {colorPalette.map((color) => (
                                    <button
                                        key={color}
                                        className={`w-12 h-12 rounded-lg border-2 ${selectedColor === color ? 'border-white' : 'border-transparent'
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3D Keyboard Preview */}
                    <div className="lg:col-span-5">
                        <div
                            ref={mountRef}
                            className="w-full h-[600px] bg-gray-800 rounded-lg"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        <Camera className="w-5 h-5" />
                        Save as Image
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        <Share2 className="w-5 h-5" />
                        Share Design
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KeyboardBuilder;