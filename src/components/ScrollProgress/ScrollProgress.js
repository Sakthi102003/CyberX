import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <motion.div
        className="scroll-progress-bar"
        style={{
          scaleX: scrollProgress / 100,
        }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
      <div className="scroll-progress-glow" />
    </div>
  );
};

export default ScrollProgress;