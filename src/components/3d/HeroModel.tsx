'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshTransmissionMaterial, 
  Environment, 
  PerspectiveCamera,
  ContactShadows,
  Text
} from '@react-three/drei';
import * as THREE from 'three';

export const HeroModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (mouse.x * Math.PI) / 10, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -(mouse.y * Math.PI) / 12, 0.05);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      <Environment preset="studio" />
      
      <group ref={groupRef}>
        {/* Central Crystal — placeholder for GLB model */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <CrystalCore />
        </Float>

        {/* Orbiting Rings */}
        <OrbitRing radius={4} speed={0.3} color="#ff6b00" thickness={0.015} tilt={Math.PI / 3} />
        <OrbitRing radius={4.5} speed={-0.2} color="#ffffff" thickness={0.008} tilt={-Math.PI / 4} opacity={0.2} />

        {/* Floating Tech Labels */}
        <FloatingLabels />

        {/* Particles */}
        <Particles count={80} />
      </group>

      {/* Warm Cinematic Lighting */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={200} color="#ff6b00" />
      <spotLight position={[-10, 8, 5]} angle={0.2} penumbra={1} intensity={80} color="#ffffff" />
      <pointLight position={[0, -5, 5]} intensity={30} color="#ff8c33" />
      
      <ContactShadows position={[0, -4, 0]} opacity={0.35} scale={20} blur={2} far={4.5} />
    </>
  );
};

function CrystalCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[2.2, 2]} />
      <MeshTransmissionMaterial
        backside
        samples={16}
        resolution={512}
        transmission={0.92}
        roughness={0.08}
        thickness={1.5}
        ior={1.3}
        chromaticAberration={0.08}
        distortion={0.15}
        distortionScale={0.3}
        temporalDistortion={0.4}
        clearcoat={1}
        color="#ffffff"
      />
    </mesh>
  );
}

function OrbitRing({ radius, speed, color, thickness, tilt, opacity = 1 }: { radius: number; speed: number; color: string; thickness: number; tilt: number; opacity?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={opacity} />
    </mesh>
  );
}

function FloatingLabels() {
  const labels = [
    { text: 'AI', pos: [3.5, 2, 1] as [number, number, number] },
    { text: 'REACT', pos: [-3, 1.5, -1] as [number, number, number] },
    { text: 'NODE', pos: [2, -2.5, 2] as [number, number, number] },
    { text: '3D', pos: [-2.5, -1, -2] as [number, number, number] },
  ];
  return (
    <>
      {labels.map((l, i) => (
        <Float key={l.text} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={1}>
          <group position={l.pos}>
            <mesh>
              <boxGeometry args={[0.9, 0.9, 0.15]} />
              <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} transparent opacity={0.15} />
            </mesh>
            <Text position={[0, 0, 0.08]} fontSize={0.25} color="#ff6b00" anchorX="center" anchorY="middle">
              {l.text}
            </Text>
          </group>
        </Float>
      ))}
    </>
  );
}

function Particles({ count }: { count: number }) {
  const mesh = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(THREE.MathUtils.randFloatSpread(20), THREE.MathUtils.randFloatSpread(20), THREE.MathUtils.randFloatSpread(20));
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    if (mesh.current) mesh.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ff6b00" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}
