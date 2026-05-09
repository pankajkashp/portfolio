'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const HeroScene = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sphereRef.current) return;
    const t = state.clock.getElapsedTime();
    sphereRef.current.rotation.x = t * 0.2;
    sphereRef.current.rotation.y = t * 0.3;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[2, 0, 0]}>
          <MeshDistortMaterial
            color="#ff6b00"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#ff3300"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={4} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2, 1, -2]}>
          <torusKnotGeometry args={[0.5, 0.15, 128, 32]} />
          <MeshWobbleMaterial
            color="#ffffff"
            speed={2}
            factor={0.6}
            roughness={0}
            metalness={1}
          />
        </mesh>
      </Float>

      <gridHelper args={[20, 20, '#ffffff05', '#ffffff05']} position={[0, -2, 0]} />
    </group>
  );
};
