import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const StarsOverlay = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [0, 0, 1], fov: 75 }}
      >
        <Stars
          radius={150}
          depth={80}
          count={5000}
          factor={6}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
};

export default StarsOverlay;