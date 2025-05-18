'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei'; 
import * as THREE from 'three';

const NUM_DOTS = 150; 
const CONNECTION_DISTANCE = 1.4; 
const MOUSE_INFLUENCE_RADIUS = 1.5;
const MOUSE_REPEL_STRENGTH = 0.02;
const SPREAD_FACTOR = 7; 

interface Dot {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

const InterconnectedDotsVisualization: React.FC = () => {
  const { size, viewport } = useThree(); 
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.Group>(null!); 
  const mousePosition = useRef(new THREE.Vector2(0, 0));

  const [dots, setDots] = useState<Dot[]>(() => { 
    const initialDots: Dot[] = [];
    const aspectRatio = (typeof window !== 'undefined' && window.innerHeight !== 0) ? window.innerWidth / window.innerHeight : 1.6; 

    for (let i = 0; i < NUM_DOTS; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD_FACTOR * aspectRatio,
        (Math.random() - 0.5) * SPREAD_FACTOR,
        (Math.random() - 0.5) * SPREAD_FACTOR * 0.1 
      );
      initialDots.push({
        id: i,
        position: position.clone(),
        originalPosition: position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006, 
          (Math.random() - 0.5) * 0.006,
          0 
        ),
      });
    }
    return initialDots;
  });

  const dotPositions = useMemo(() => {
    if (dots.length === 0) return new Float32Array(0);
    const positions = new Float32Array(NUM_DOTS * 3);
    dots.forEach((dot, i) => {
      positions[i * 3] = dot.position.x;
      positions[i * 3 + 1] = dot.position.y;
      positions[i * 3 + 2] = dot.position.z;
    });
    return positions;
  }, [dots]);

  const lineSegments = useMemo(() => {
    if (dots.length === 0) return []; 
    const segments: JSX.Element[] = [];
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dist = dots[i].position.distanceTo(dots[j].position);
        if (dist < CONNECTION_DISTANCE) {
          const opacity = Math.max(0.05, 1 - dist / CONNECTION_DISTANCE); 
          segments.push(
            <Line
              key={`line-${dots[i].id}-${dots[j].id}`}
              points={[dots[i].position, dots[j].position]}
              color="#2c5773" 
              lineWidth={1 + (1 - opacity) * 1.5} 
              transparent
              opacity={opacity * 0.35} 
            />
          );
        }
      }
    }
    return segments;
  }, [dots]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / size.width) * 2 - 1;
      mousePosition.current.y = -(event.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]); 

  useFrame(() => {
    if (!viewport || viewport.width === 0 || viewport.height === 0) return; 

    const newDots = dots.map(dot => {
      const newPos = dot.position.clone().add(dot.velocity);

      const mouseWorldX = (mousePosition.current.x * viewport.width) / 2;
      const mouseWorldY = (mousePosition.current.y * viewport.height) / 2;
      const mouseVec = new THREE.Vector3(mouseWorldX, mouseWorldY, 0);
      
      const distToMouse = newPos.distanceTo(mouseVec);
      if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
        const repelForce = new THREE.Vector3().subVectors(newPos, mouseVec).normalize();
        const strength = (1 - distToMouse / MOUSE_INFLUENCE_RADIUS) * MOUSE_REPEL_STRENGTH;
        newPos.add(repelForce.multiplyScalar(strength));
      }

      const boundaryX = (viewport.width / 2) * 0.98; 
      const boundaryY = (viewport.height / 2) * 0.98;
      if (newPos.x > boundaryX || newPos.x < -boundaryX) {
        dot.velocity.x *= -1;
        newPos.x = Math.max(-boundaryX, Math.min(boundaryX, newPos.x)); 
      }
      if (newPos.y > boundaryY || newPos.y < -boundaryY) {
        dot.velocity.y *= -1;
        newPos.y = Math.max(-boundaryY, Math.min(boundaryY, newPos.y)); 
      }
      
      return { ...dot, position: newPos };
    });
    setDots(newDots);

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={dotPositions} stride={3}>
        <PointMaterial 
          transparent 
          color="#00ffff" 
          size={0.12}     
          sizeAttenuation 
          depthWrite={false}
        />
      </Points>
      <group ref={linesRef}>{lineSegments}</group>
    </group>
  );
};

const InteractiveThreeDeeScene: React.FC = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1, 
      background: 'transparent'
    }}>
      <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }}> 
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 60]} intensity={1.2} color="#ffffff" />
        <InterconnectedDotsVisualization />
      </Canvas>
    </div>
  );
};

export default InteractiveThreeDeeScene;
