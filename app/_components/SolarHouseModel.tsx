'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    ContactShadows,
    Html,
    useTexture,
} from '@react-three/drei';
import { useRef, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Sun (draggable)                                                   */
/* ------------------------------------------------------------------ */
function Sun({
    position,
    setPosition,
}: {
    position: [number, number, number];
    setPosition: (pos: [number, number, number]) => void;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { camera, gl } = useThree();
    const [dragging, setDragging] = useState(false);

    // Simple drag in world space (horizontal plane + height)
    const handlePointerDown = (e: any) => {
        e.stopPropagation();
        setDragging(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerUp = (e: any) => {
        setDragging(false);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: any) => {
        if (!dragging) return;
        e.stopPropagation();

        // Project pointer onto a plane at current sun height
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -position[1]);
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (e.clientX / gl.domElement.clientWidth) * 2 - 1,
            -(e.clientY / gl.domElement.clientHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);
        const intersect = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersect);

        if (intersect) {
            // Keep a reasonable distance from the house
            const dist = Math.max(8, Math.min(25, intersect.length()));
            const dir = intersect.clone().normalize();
            setPosition([dir.x * dist, Math.max(4, position[1] + e.movementY * -0.05), dir.z * dist]);
        }
    };

    return (
        <group position={position}>
            {/* Sun sphere */}
            <mesh
                ref={meshRef}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerUp}
            >
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial color="#FDB813" />
            </mesh>

            {/* Glow */}
            <mesh scale={1.6}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial color="#FDB813" transparent opacity={0.25} />
            </mesh>

            {/* Label */}
            <Html center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                <div className="bg-yellow-400/90 text-black text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap shadow">
                    Drag me
                </div>
            </Html>
        </group>
    );
}

/* ------------------------------------------------------------------ */
/*  Sun rays (visual only)                                            */
/* ------------------------------------------------------------------ */
function SunRays({ sunPos }: { sunPos: [number, number, number] }) {
    const points = useMemo(() => {
        const start = new THREE.Vector3(...sunPos);
        const end = new THREE.Vector3(0, 3.5, 0); // roughly roof center
        return [start, end];
    }, [sunPos]);

    return (
        <line>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#FDB813" transparent opacity={0.45} linewidth={2} />
        </line>
    );
}

/* ------------------------------------------------------------------ */
/*  House + Solar Panels                                              */
/* ------------------------------------------------------------------ */
function House() {
    return (
        <group position={[0, 0, 0]}>
            {/* Main walls */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[6, 3, 5]} />
                <meshStandardMaterial color="#e8d5b7" roughness={0.8} />
            </mesh>

            {/* Roof (simple pitched) */}
            <mesh position={[0, 3.6, 0]} rotation={[0, 0, 0]} castShadow>
                <coneGeometry args={[4.8, 2.2, 4]} />
                <meshStandardMaterial color="#8B4513" roughness={0.9} />
            </mesh>

            {/* Terrace / balcony */}
            <mesh position={[0, 2.1, 2.7]} castShadow receiveShadow>
                <boxGeometry args={[5.5, 0.15, 1.4]} />
                <meshStandardMaterial color="#d4c4a8" />
            </mesh>
            {/* Terrace railing */}
            <mesh position={[0, 2.5, 3.35]}>
                <boxGeometry args={[5.5, 0.7, 0.08]} />
                <meshStandardMaterial color="#5c4033" />
            </mesh>

            {/* Door */}
            <mesh position={[0, 0.9, 2.51]}>
                <boxGeometry args={[1.1, 1.8, 0.1]} />
                <meshStandardMaterial color="#5c4033" />
            </mesh>

            {/* Windows */}
            {[-1.8, 1.8].map((x) => (
                <mesh key={x} position={[x, 1.8, 2.51]}>
                    <boxGeometry args={[1.2, 1.1, 0.08]} />
                    <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
                </mesh>
            ))}

            {/* Solar panels on roof */}
            <group position={[0, 4.1, 0]} rotation={[-0.35, 0, 0]}>
                {[-1.5, 0, 1.5].map((x, i) => (
                    <mesh key={i} position={[x, 0, 0]} castShadow>
                        <boxGeometry args={[1.3, 0.08, 2.2]} />
                        <meshStandardMaterial
                            color="#1a1a2e"
                            metalness={0.7}
                            roughness={0.3}
                            emissive="#0a1a3a"
                            emissiveIntensity={0.15}
                        />
                    </mesh>
                ))}
                {/* Panel frames */}
                {[-1.5, 0, 1.5].map((x, i) => (
                    <mesh key={`f-${i}`} position={[x, 0.05, 0]}>
                        <boxGeometry args={[1.35, 0.02, 2.25]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

/* ------------------------------------------------------------------ */
/*  Trees                                                             */
/* ------------------------------------------------------------------ */
function Tree({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, 1, 0]} castShadow>
                <cylinderGeometry args={[0.25, 0.35, 2, 8]} />
                <meshStandardMaterial color="#5c4033" />
            </mesh>
            {/* Foliage */}
            <mesh position={[0, 2.8, 0]} castShadow>
                <sphereGeometry args={[1.4, 12, 12]} />
                <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
            </mesh>
            <mesh position={[0.5, 3.4, 0.3]} castShadow>
                <sphereGeometry args={[0.9, 10, 10]} />
                <meshStandardMaterial color="#40916c" roughness={0.9} />
            </mesh>
        </group>
    );
}

/* ------------------------------------------------------------------ */
/*  Ground                                                            */
/* ------------------------------------------------------------------ */
function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="#4a7c59" roughness={0.95} />
        </mesh>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Scene                                                        */
/* ------------------------------------------------------------------ */
function Scene() {
    const [sunPos, setSunPos] = useState<[number, number, number]>([12, 10, 8]);

    return (
        <>
            {/* Lights */}
            <ambientLight intensity={0.35} />
            <directionalLight
                position={sunPos}
                intensity={1.8}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={50}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
            />
            <hemisphereLight args={['#87CEEB', '#4a7c59', 0.4]} />

            {/* Sun */}
            <Sun position={sunPos} setPosition={setSunPos} />
            <SunRays sunPos={sunPos} />

            {/* Environment */}
            <House />
            <Ground />

            {/* Trees */}
            <Tree position={[-7, 0, 4]} />
            <Tree position={[7.5, 0, 3]} />
            <Tree position={[-6, 0, -5]} />
            <Tree position={[8, 0, -4]} />
            <Tree position={[-9, 0, 0]} />

            {/* Soft contact shadow under house */}
            <ContactShadows
                position={[0, 0.01, 0]}
                opacity={0.45}
                scale={20}
                blur={2.5}
                far={8}
            />

            {/* Camera controls – 360° */}
            <OrbitControls
                makeDefault
                enablePan={true}
                enableZoom={true}
                minDistance={6}
                maxDistance={30}
                maxPolarAngle={Math.PI / 2.1}
                target={[0, 2, 0]}
            />
        </>
    );
}

/* ------------------------------------------------------------------ */
/*  Exported Component                                                */
/* ------------------------------------------------------------------ */
export default function SolarHouseModel() {
    return (
        <div className="relative w-full aspect-square max-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 shadow-xl">
            <Canvas
                shadows
                camera={{ position: [14, 9, 14], fov: 42 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            >
                <Suspense fallback={null}>
                    <Scene />
                    <Environment preset="sunset" />
                </Suspense>
            </Canvas>

            {/* UI Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-between items-end pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md text-white text-sm px-4 py-2 rounded-xl pointer-events-auto">
                    <p className="font-medium">Drag to rotate · Scroll to zoom</p>
                    <p className="text-xs text-white/70 mt-0.5">
                        Drag the yellow sun to change lighting angle
                    </p>
                </div>
            </div>
        </div>
    );
}