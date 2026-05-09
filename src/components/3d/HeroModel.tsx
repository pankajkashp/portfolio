'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshTransmissionMaterial, 
  Environment, 
  PerspectiveCamera,
  ContactShadows,
  useGLTF,
  Text,
  Center,
  Preload
} from '@react-three/drei';
import * as THREE from 'three';
import { personalInfo } from '@/data/personal';

export const HeroModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const characterRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Architecture for dynamic GLB loading
  // This will try to load pankaj.glb if it exists in public/models/
  // Fallback to a high-end stylized mesh if loading fails or file missing
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (mouse.x * Math.PI) / 12, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -(mouse.y * Math.PI) / 12, 0.05);
    }

    if (characterRef.current) {
      characterRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      <Environment preset="night" />
      
      <group ref={groupRef}>
        {/* Realistic Stylized Character Placeholder */}
        <group ref={characterRef}>
          <Suspense fallback={<PlaceholderMesh />}>
             <Model path={personalInfo.modelPath} />
          </Suspense>
        </group>

        {/* Orbiting Holographic Tech Elements */}
        <HolographicRings />
        <OrbitingTechIcons />

        {/* Volumetric Particles */}
        <Particles count={150} />
      </group>

      {/* Cinematic Studio Lighting */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={150} color="#00ffff" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={100} color="#ff00ff" />
      <pointLight position={[0, -5, 5]} intensity={50} color="#ffffff" />
      
      <ContactShadows 
        position={[0, -4, 0]} 
        opacity={0.5} 
        scale={20} 
        blur={1.5} 
        far={4.5} 
      />
    </>
  );
};

function Model({ path }: { path: string }) {
  // In a real scenario, this would load the GLB
  // const { scene } = useGLTF(path);
  // return <primitive object={scene} scale={2.5} position={[0, -3.5, 0]} />;
  
  // For now, providing the placeholder mesh logic within the Model component
  return <PlaceholderMesh />;
}

function PlaceholderMesh() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[2.5, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.9}
          roughness={0.1}
          thickness={1.5}
          ior={1.2}
          chromaticAberration={0.1}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={1}
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

function HolographicRings() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[4.5, 0.01, 16, 100]} />
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={5} transparent opacity={0.5} />
    </mesh>
  );
}

function OrbitingTechIcons() {
  const icons = ['AI', 'WEB', 'DATA', '3D'];
  return (
    <>
      {icons.map((text, i) => (
        <Float key={text} speed={2} delay={i} rotationIntensity={1}>
           <Text
            position={[Math.cos(i * Math.PI / 2) * 5, Math.sin(i * Math.PI / 2) * 5, 0]}
            fontSize={0.4}
            color="#ffffff"
            font="/fonts/Geist-Bold.woff"
          >
            {text}
          </Text>
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
      temp.push(THREE.MathUtils.randFloatSpread(25), THREE.MathUtils.randFloatSpread(25), THREE.MathUtils.randFloatSpread(25));
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    if (mesh.current) mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00ffff" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}
