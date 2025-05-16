import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useCursor, Html } from "@react-three/drei";
import * as THREE from "three";
import { useTranslation } from "react-i18next";

export type PlanetProps = {
  name: string;
  size: number;
  distance: number;
  speed: number;
  onClick: (planet: string, ref: THREE.Object3D) => void;
};

const Planet = ({ name, size, distance, speed, onClick }: PlanetProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const { t } = useTranslation();

  const texture = useLoader(THREE.TextureLoader, `/assets/${name}.jpg`);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed;
      ref.current.position.x = Math.cos(t) * distance;
      ref.current.position.z = Math.sin(t) * distance;
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh
      ref={ref}
      onClick={() => onClick(name, ref.current!)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 64, 64]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        alphaTest={0.5}
        side={THREE.DoubleSide}
        color={"white"}
      />
      {hovered && (
        <Html center distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg shadow-lg border border-white/30 backdrop-blur-sm animate-fade-in">
            🪐 <strong>{t(`planetNames.${name}`)}</strong>
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default Planet;
