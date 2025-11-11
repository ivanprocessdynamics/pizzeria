"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimateInProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "bottom" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  direction = "bottom",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // La animación solo se dispara una vez
    threshold: threshold, // Porcentaje del elemento visible para disparar
  });

  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -100 };
      case "right":
        return { opacity: 0, x: 100 };
      case "bottom":
        return { opacity: 0, y: 50 };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={inView ? getAnimate() : getInitial()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};