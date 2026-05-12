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
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 100, 100]}>
        <MeshDistortMaterial
          color="#ff6b00"
          emissive="#ff4500"
          emissiveIntensity={4}
          distort={0.5}
          speed={4}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.9}
        />
      </Sphere>
      {/* Internal Core Glow */}
      <Sphere args={[0.7, 32, 32]}>
        <meshStandardMaterial 
          color="#ffcc00" 
          emissive="#ffcc00" 
          emissiveIntensity={10} 
          transparent 
          opacity={0.4} 
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
        const speed = 0.1 + i * 0.08;
        child.rotation.z = state.clock.getElapsedTime() * speed;
        child.rotation.x = state.clock.getElapsedTime() * (speed * 0.5);
        // Subtle wobble
        child.position.y = Math.sin(state.clock.getElapsedTime() + i) * 0.1;
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {[1.4, 1.7, 2.0, 2.3].map((radius, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[radius, 0.015, 16, 100]} />
          <meshStandardMaterial 
            color="#ff6b00" 
            emissive="#ff6b00" 
            emissiveIntensity={8} 
            transparent 
            opacity={0.8 - i * 0.15} 
          />
        </mesh>
      ))}
    </group>
  );
};

const NeuralNetwork = () => {
  const count = 60;
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      const r = 2.8;
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
        if (points[i].distanceTo(points[j]) < 1.8) {
          l.push([points[i], points[j]]);
        }
      }
    }
    return l;
  }, [points]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line 
          key={i} 
          points={line} 
          color="#ff6b00" 
          lineWidth={0.8} 
          transparent 
          opacity={0.15} 
        />
      ))}
      <Points positions={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}>
        <PointMaterial 
          transparent 
          color="#ffcc00" 
          size={0.06} 
          sizeAttenuation={true} 
          depthWrite={false} 
          emissive="#ffcc00"
          emissiveIntensity={3}
        />
      </Points>
    </group>
  );
};

const DataStreams = () => {
  const particlesCount = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 1] -= 0.02; // Move down
        if (positions[i * 3 + 1] < -5) positions[i * 3 + 1] = 5;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial 
        transparent 
        color="#ff6b00" 
        size={0.03} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.4}
      />
    </Points>
  );
};

const Scene = () => {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const x = (mouse.x * viewport.width) / 6;
      const y = (mouse.y * viewport.height) / 6;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      <OrbCore />
      <OrbitalRings />
      <NeuralNetwork />
      <DataStreams />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff6b00" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff3300" />
    </group>
  );
};

export const AIOrb = () => {
  return (
    <div className="w-full h-full min-h-[120px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ReinhardToneMapping }}
      >
        <Scene />
      </Canvas>
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff6b0010,transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-30" />
    </div>
  );
};
