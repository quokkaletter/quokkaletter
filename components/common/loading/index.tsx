'use client';

import { motion } from 'framer-motion';
import QuokkaLoading from 'public/images/loading-quokka.png';

export const LoadingIndicator = () => {
  return (
    <div className="w-screen h-screen bg-black/50 absolute modalPosition z-50">
      <motion.div
        className="flex justify-center items-center flex-col h-full w-full"
        initial={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <motion.img
          src={QuokkaLoading.src}
          alt="Quokka Loading"
          style={{
            aspectRatio: '617/819',
            height: '350px',
          }}
          animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        />
        <p className="text-white text-lg mt-4">로딩하고 있어요 잠시만요...!</p>
      </motion.div>
    </div>
  );
};
