"use client";
import React, { useState, useEffect, createContext } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// create context
export const CursorContext = createContext();

// provider
const CursorProvider = ({ children }) => {
  const [cursor, setCursor] = useState({ size: 30, background: "#473936" });
  const [isHovering, setIsHovering] = useState(false);
  const [smallViewportIsActive, setSmallViewportIsActive] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Client-side media query check
  useEffect(() => {
    setIsClient(true);
    const checkViewport = () => {
      setSmallViewportIsActive(window.innerWidth <= 1200);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 290, mass: 0.45 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (isClient && !smallViewportIsActive) {
      mouseX.set(e.clientX - cursor.size / 2);
      mouseY.set(e.clientY - cursor.size / 2);
    } else if (isClient) {
      setCursor({ size: 0, background: "none" });
    }
  };

  useEffect(() => {
    if (isClient) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [cursor, isClient, smallViewportIsActive]);

  const mouseEnterHandler = () => {
    setCursor({ size: 90, background: "#00423a" });
    setIsHovering(true);
  };

  const mouseLeaveHandler = () => {
    setCursor({ size: 30, background: "#473936" });
    setIsHovering(false);
  };

  return (
    <CursorContext.Provider value={{ mouseEnterHandler, mouseLeaveHandler }}>
      {isClient && (
        <motion.div
          className="fixed z-[99] rounded-full pointer-events-none transition-all duration-300"
          style={{
            left: springX,
            top: springY,
            width: cursor.size,
            height: cursor.size,
            backgroundColor: cursor.background,
            mixBlendMode: isHovering ? "difference" : "normal",
            transition: "width 0.2s ease-in-out, height 0.2s ease-in-out",
          }}
        />
      )}
      {children}
    </CursorContext.Provider>
  );
};

export default CursorProvider;
