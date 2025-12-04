'use client';

import { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// Оптимизированная версия NetworkLines с одним BufferGeometry
function NetworkLines({ count = 50, radius = 2.5 }) {
    const geometryRef = useRef<THREE.BufferGeometry>(null);
    
    const linesData = useMemo(() => {
        const tempLines: Float32Array[] = [];
        // Детерминированный генератор для стабильности
        const rng = (seed: number) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };
        
        for (let i = 0; i < count; i++) {
            const phi1 = Math.acos(-1 + (2 * i) / count);
            const theta1 = Math.sqrt(count * Math.PI) * phi1;
            
            // Используем детерминированный RNG вместо Math.random()
            const randomValue = rng(i * 0.1);
            const phi2 = Math.acos(-1 + (2 * randomValue * count) / count);
            const theta2 = Math.sqrt(count * Math.PI) * phi2;
            
            const start = new THREE.Vector3().setFromSphericalCoords(radius, phi1, theta1);
            const end = new THREE.Vector3().setFromSphericalCoords(radius, phi2, theta2);
            
            const mid = start.clone().add(end).multiplyScalar(1.25);
            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            // Уменьшено количество точек с 20 до 12 для оптимизации
            const points = curve.getPoints(12);
            tempLines.push(new Float32Array(points.flatMap(p => [p.x, p.y, p.z])));
        }
        return tempLines;
    }, [count, radius]);
    
    // Создаем один BufferGeometry для всех линий
    useEffect(() => {
        if (!geometryRef.current) return;
        
        const positions: number[] = [];
        const indices: number[] = [];
        let indexOffset = 0;
        
        linesData.forEach((linePoints) => {
            const pointCount = linePoints.length / 3;
            for (let i = 0; i < pointCount; i++) {
                positions.push(
                    linePoints[i * 3],
                    linePoints[i * 3 + 1],
                    linePoints[i * 3 + 2]
                );
            }
            
            // Создаем индексы для линии
            for (let i = 0; i < pointCount - 1; i++) {
                indices.push(indexOffset + i, indexOffset + i + 1);
            }
            indexOffset += pointCount;
        });
        
        geometryRef.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometryRef.current.setIndex(indices);
        geometryRef.current.computeBoundingSphere();
    }, [linesData]);
    
    return (
        <lineSegments>
            <bufferGeometry ref={geometryRef} />
            <lineBasicMaterial color="#00ffa3" transparent opacity={0.3} />
        </lineSegments>
    );
}

function Earth() {
    const meshRef = useRef<THREE.Mesh>(null);
    
    const texture = useLoader(TextureLoader, '/images/earth-map.png');
    
    // Правильное использование useEffect для настройки текстуры
    useEffect(() => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.colorSpace = THREE.SRGBColorSpace;
    }, [texture]);
    
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });
    
    // Мемоизируем материал для избежания пересоздания
    const material = useMemo(
        () => (
            <meshStandardMaterial
            map={texture}
            metalness={0.1}
            roughness={0.7}
            emissive="#4a90e2"
            emissiveIntensity={texture ? 0.05 : 0}
            color={texture ? '#ffffff' : '#1a3a3a'}
        />
        ),
        [texture]
    );
    
    // Уменьшена детализация сферы с 32x32 до 24x24
    return (
        <group ref={meshRef}>
            <Sphere args={[2.5, 24, 24]}>
                {material}
            </Sphere>
            
            <NetworkLines count={50} radius={2.5} />
            
            <mesh scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[2.5, 24, 24]} />
                <meshBasicMaterial
                    color="#5ba3d3"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

export default function Globe3D() {
    // Определяем количество звезд в зависимости от производительности
    const starsCount = useMemo(() => {
        if (typeof window !== 'undefined') {
            // Для мобильных устройств меньше звезд
            const isMobile = window.innerWidth < 768;
            return isMobile ? 2000 : 3000;
        }
        return 3000;
    }, []);
    
    return (
        <div className="w-full h-full">
            <Canvas 
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ 
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true
                }}
                dpr={[1, 2]} // Ограничиваем pixel ratio для производительности
            >
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                <pointLight position={[-5, -5, -5]} intensity={1} color="#00ffa3" />
                
                <Suspense fallback={null}>
                    <Earth />
                </Suspense>
                
                <Stars 
                    radius={100} 
                    depth={50} 
                    count={starsCount} 
                    factor={4} 
                    saturation={0} 
                    fade 
                    speed={0.5} 
                />
                <OrbitControls 
                    enableZoom={false} 
                    autoRotate 
                    autoRotateSpeed={0.5} 
                    enablePan={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                />
            </Canvas>
        </div>
    );
}
