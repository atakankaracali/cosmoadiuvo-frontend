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
          radius={200}
          depth={120}
          count={8000}
          factor={10}
          saturation={0.5}
          fade
          speed={1.5}
        />
      </Canvas>
    </div>
  );
};

export default StarsOverlay;