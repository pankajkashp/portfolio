'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Sphere, 
  MeshDistortMaterial, 
  Points, 
  PointMaterial, 
  Line, 
  PerspectiveCamera,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';

const OrbCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#ff6b00"
          emissive="#ff4500"
          emissiveIntensity={2}
          distort={0.4}
          speed={3}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
};

const OrbitalRings = () => {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, i) => {
        child.rotation.z = state.clock.getElapsedTime() * (0.1 + i * 0.05);
        child.rotation.x = state.clock.getElapsedTime() * (0.05 + i * 0.02);
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {[1.5, 1.8, 2.1].map((radius, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color="#ff6b00" 
            emissive="#ff6b00" 
            emissiveIntensity={5} 
            transparent 
            opacity={0.6 - i * 0.15} 
          />
        </mesh>
      ))}
    </group>
  );
};

const NeuralNetwork = () => {
  const count = 40;
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      const r = 2.5;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      p.push(new THREE.Vector3().setFromSphericalCoords(r, theta, phi));
    }
    return p;
  }, []);

  const lines = useMemo(() => {
    const l = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (points[i].distanceTo(points[j]) < 1.5) {
          l.push([points[i], points[j]]);
        }
      }
    }
    return l;
  }, [points]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line 
          key={i} 
          points={line} 
          color="#ff6b00" 
          lineWidth={0.5} 
          transparent 
          opacity={0.2} 
        />
      ))}
      <Points positions={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}>
        <PointMaterial 
          transparent 
          color="#ff6b00" 
          size={0.05} 
          sizeAttenuation={true} 
          depthWrite={false} 
          emissive="#ff6b00"
          emissiveIntensity={2}
        />
      </Points>
    </group>
  );
};

const Scene = () => {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const x = (mouse.x * viewport.width) / 8;
      const y = (mouse.y * viewport.height) / 8;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <OrbCore />
      <OrbitalRings />
      <NeuralNetwork />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff6b00" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
    </group>
  );
};

export const AIOrb = () => {
  return (
    <div className="w-full h-[100px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff6b0015,transparent_70%)] pointer-events-none" />
    </div>
  );
};
