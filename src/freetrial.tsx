import { useState } from "react";
import { motion } from "framer-motion";

import teaCan from "./assets/vecteezy_realistic-cans-white-for-mock-up-soda-can-mock-up_10064040.png"; // Replace with your actual image path

export const InteractiveCan = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e: React.MouseEvent) => {
      setPosition({ x: e.clientX - 50, y: e.clientY - 50 }); // Adjust to center can
    };
  
    return (
      <div className="relative w-screen h-screen bg-gray-900" onMouseMove={handleMouseMove}>
        <motion.img
          src={teaCan}
          alt="Tea Can"
          className="w-32 h-32 absolute"
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>
    );
  };
  