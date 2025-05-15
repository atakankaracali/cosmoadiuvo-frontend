import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState, useRef } from "react";
import { Object3D, TextureLoader, RepeatWrapping, SRGBColorSpace } from "three";
import Planet from "./PlanetViewer";
import PlanetInfoModal from "./PlanetInfoModal";
import "../styles/solarSystemCanvas.css";

const SolarSystemCanvas = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const selectedRef = useRef<Object3D | null>(null);

  const sunTexture = useLoader(TextureLoader, "/src/assets/Sun.jpg");
  sunTexture.wrapS = RepeatWrapping;
  sunTexture.wrapT = RepeatWrapping;
  sunTexture.anisotropy = 16;
  sunTexture.colorSpace = SRGBColorSpace;
  sunTexture.needsUpdate = true;

  const planets = [
    { name: "Mercury", size: 0.2, distance: 2, speed: 1.2 },
    { name: "Venus", size: 0.35, distance: 3, speed: 1.0 },
    { name: "Earth", size: 0.36, distance: 4, speed: 0.95 },
    { name: "Mars", size: 0.3, distance: 5, speed: 0.8 },
    { name: "Jupiter", size: 0.9, distance: 7, speed: 0.4 },
    { name: "Saturn", size: 0.75, distance: 9, speed: 0.3 },
    { name: "Uranus", size: 0.55, distance: 11, speed: 0.25 },
    { name: "Neptune", size: 0.5, distance: 13, speed: 0.2 },
  ];

  return (
    <div className="solar-canvas-container">

      <Canvas camera={{ position: [0, 6, 20], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={3.5} color={"#fff9c4"} />

        <Stars radius={120} depth={60} count={6000} factor={8} fade speed={2} />

        <OrbitControls
          enableZoom={true}
          minDistance={6}
          maxDistance={28}
          autoRotate
          autoRotateSpeed={0.3}
          enablePan={false}
        />

        <mesh onClick={() => setSelectedPlanet("Sun")}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial
            map={sunTexture}
            emissive={"#ffffff"}
            emissiveMap={sunTexture}
            emissiveIntensity={1.4}
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>

        {planets.map((planet) => (
          <Planet
            key={planet.name}
            {...planet}
            onClick={(name, ref) => {
              setSelectedPlanet(name);
              selectedRef.current = ref;
            }}
          />
        ))}
      </Canvas>
      {selectedPlanet && (
        <PlanetInfoModal
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  );
};

export default SolarSystemCanvas;