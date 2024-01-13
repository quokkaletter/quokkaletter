'use client';

import React from 'react';
import { motion } from 'framer-motion';

const cloudData = [
  {
    // 왼쪽 → 오른쪽 이동
    initialX: '0%',
    animateX: '80%',
    duration: 6,
    left: '40%',
    top: '30%',
    animateY: ['30%', '50%', '30%'],
  },
  {
    initialX: '0%',
    animateX: '100%',
    duration: 15,
    left: '30%',
    top: '20%',
  },
  // 오른쪽 → 왼쪽 이동
  {
    initialX: '100%',
    animateX: '-100%',
    duration: 12,
    left: '60%',
    top: '20%',
  },
  {
    initialX: '100%',
    animateX: ['50%', '-50%'],
    duration: 10,
    left: '20%',
    top: '20%',
  },
  {
    initialX: '100%',
    animateX: ['50%', '-50%'],
    duration: 10,
    left: '10%',
    top: '40%',
    animateY: ['20%', '50%', '30%'],
  },
];

type CloudProps = {
  initialX: string;
  initialY?: string;
  animateX: string | string[];
  animateY?: string | string[];
  duration: number;
  left: string;
  top: string;
};

const Cloud: React.FC<CloudProps> = ({
  initialX,
  initialY = '0',
  animateX,
  animateY,
  duration,
  left,
  top,
}) => {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={{
        x: animateX,
        y: animateY,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{ left, top }}
      className="cloud-image"
    />
  );
};

export const CloudAnimation = () => {
  return cloudData.map((cloud, index) => (
    <Cloud
      key={index}
      initialX={cloud.initialX}
      animateX={cloud.animateX}
      duration={cloud.duration}
      left={cloud.left}
      top={cloud.top}
      {...(cloud.animateY && { animateY: cloud.animateY })}
    />
  ));
};
