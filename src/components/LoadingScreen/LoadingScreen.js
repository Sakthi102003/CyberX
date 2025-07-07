import { motion } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: {
        delay: 0.5,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="loading-screen"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="loading-content">
        <motion.div
          className="loading-logo"
          variants={logoVariants}
        >
          <div className="cyber-lock">
            <div className="lock-body">
              <div className="lock-shackle"></div>
              <div className="lock-keyhole"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="loading-text"
          variants={textVariants}
        >
          <h2 className="glitch" data-text="Initializing Security Protocols">
            Initializing Security Protocols
          </h2>
          <p>Loading Portfolio...</p>
        </motion.div>

        <motion.div className="loading-progress">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              variants={progressVariants}
            ></motion.div>
          </div>
        </motion.div>

        <div className="loading-matrix">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="matrix-char"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;