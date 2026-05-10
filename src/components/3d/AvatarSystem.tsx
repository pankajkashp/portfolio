'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, ContactShadows, Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// A stylized futuristic AI Avatar
function RobotAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Breathing (subtle scale and Y movement)
    const breatheScale = 1 + Math.sin(t * 2) * 0.02;
    if (groupRef.current) {
      groupRef.current.scale.set(breatheScale, breatheScale, breatheScale);
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1;

      // React to mouse movement (look at cursor)
      const targetX = (mouse.x * Math.PI) / 4;
      const targetY = -(mouse.y * Math.PI) / 6;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.1);
    }

    // Blinking naturally
    const blinkTime = t % 4; // blink every ~4 seconds
    const isBlinking = blinkTime > 3.8 && blinkTime < 3.9;
    const eyeScaleY = isBlinking ? 0.1 : 1;
    
    if (leftEyeRef.current) leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScaleY, 0.5);
    if (rightEyeRef.current) rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScaleY, 0.5);

    // Slightly smile
    if (mouthRef.current) {
      const smileAmount = 0.5 + Math.sin(t * 0.5) * 0.2; // Slowly curve
      // For a capsule, we just stretch it slightly or change its rotation
      mouthRef.current.scale.x = 1 + smileAmount * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head - Glass Material */}
      <mesh ref={headRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshTransmissionMaterial 
          backside 
          samples={16} 
          resolution={512} 
          transmission={0.9} 
          roughness={0.15} 
          thickness={1.5} 
          ior={1.4} 
          chromaticAberration={0.06} 
          distortion={0.2} 
          distortionScale={0.3} 
          temporalDistortion={0.5} 
          color="#ffffff"
        />
      </mesh>

      {/* Internal Brain / Core */}
      <mesh position={[0, 0, -0.2]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={2} wireframe />
      </mesh>

      {/* Eyes */}
      <group position={[0, 0.2, 1.1]}>
        <mesh ref={leftEyeRef} position={[-0.4, 0, 0]}>
          <capsuleGeometry args={[0.08, 0.2, 4, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.4, 0, 0]}>
          <capsuleGeometry args={[0.08, 0.2, 4, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} />
        </mesh>
      </group>

      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, -0.4, 1.1]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.04, 0.4, 4, 16]} />
        <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={2} />
      </mesh>
      
      {/* Halo / Headset rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function FloatingTechIcons() {
  const icons = [
    { text: 'AI', pos: [2.5, 1.5, -1] as [number, number, number], rot: [0, -0.2, 0] },
    { text: 'SYSTEM', pos: [-2.5, 1, 1] as [number, number, number], rot: [0, 0.4, 0] },
    { text: 'CORE', pos: [2, -1.5, 1.5] as [number, number, number], rot: [0, -0.5, 0] },
    { text: 'DATA', pos: [-2, -2, -0.5] as [number, number, number], rot: [0, 0.2, 0] },
  ];

  return (
    <>
      {icons.map((icon, i) => (
        <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={1.5}>
          <group position={icon.pos} rotation={icon.rot as [number, number, number]}>
            <mesh>
              <boxGeometry args={[1.2, 0.4, 0.05]} />
              <MeshTransmissionMaterial transmission={0.9} roughness={0.2} thickness={0.1} color="#222" />
            </mesh>
            <mesh position={[0, 0, -0.03]}>
               <boxGeometry args={[1.22, 0.42, 0.02]} />
               <meshBasicMaterial color="#ff6b00" wireframe transparent opacity={0.3} />
            </mesh>
            <Text position={[0, 0, 0.03]} fontSize={0.15} color="#ff6b00" anchorX="center" anchorY="middle" letterSpacing={0.1}>
              {icon.text}
            </Text>
          </group>
        </Float>
      ))}
    </>
  );
}

function CinematicEnvironment() {
  const fogRef = useRef<THREE.FogExp2>(null);
  
  return (
    <>
      {/* Soft volumetric fog */}
      <fogExp2 attach="fog" args={['#0a0604', 0.04]} ref={fogRef} />
      
      {/* Moving Background Particles */}
      <Sparkles count={200} scale={15} size={3} speed={0.4} opacity={0.3} color="#ff6b00" />
      <Sparkles count={100} scale={10} size={1.5} speed={0.8} opacity={0.5} color="#ffffff" />
      
      {/* Large Glowing Orbs for ambient rim light effect */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-6, 4, -5]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#ff6b00" transparent opacity={0.05} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[6, -4, -6]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#ff8c33" transparent opacity={0.03} />
        </mesh>
      </Float>
    </>
  );
}

export const AvatarSystem = () => {
  return (
    <>
      <Environment preset="city" />
      
      <CinematicEnvironment />
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <RobotAvatar />
      </Float>

      <FloatingTechIcons />

      {/* Cinematic Lighting Setup */}
      {/* Orange Rim Light */}
      <spotLight position={[5, 5, -5]} angle={0.5} penumbra={1} intensity={150} color="#ff6b00" castShadow />
      {/* Blue/White Fill Light */}
      <spotLight position={[-5, 2, 5]} angle={0.5} penumbra={1} intensity={80} color="#ffffff" />
      {/* Core Ambient Glow */}
      <pointLight position={[0, 0, 0]} intensity={30} color="#ff8c33" distance={10} />
      
      <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#ff6b00" />
    </>
  );
};
