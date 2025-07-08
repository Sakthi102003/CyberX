import { motion } from 'framer-motion';
import { FaMedium, FaXTwitter } from 'react-icons/fa6';
import { FiDownload, FiGithub, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import TypewriterEffect from '../TypewriterEffect/TypewriterEffect';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Sakthi102003', label: 'GitHub', color: '#333' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/sakthimurugan-s', label: 'LinkedIn', color: '#0077b5' },
    { icon: FiInstagram, href: 'https://instagram.com/sakthimurugans._', label: 'Instagram', color: '#e4405f' },
    { icon: FaXTwitter, href: 'https://twitter.com/Sakthimurugan_1', label: 'X (Twitter)', color: '#000' },
    { icon: FaMedium, href: 'https://medium.com/sakthimurugan102003', label: 'Medium', color: '#00ab6c' }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sakthimurugan_Resume.pdf';
    link.target = '_blank';
    
    // Check if file exists before downloading
    fetch('/resume.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          link.click();
        } else {
          console.error('Resume file not found');
          alert('Resume file is currently unavailable. Please contact me directly.');
        }
      })
      .catch(error => {
        console.error('Error checking resume file:', error);
        // Fallback: try to download anyway
        link.click();
      });
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="matrix-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {Array.from({ length: 10 }).map((_, j) => (
                <span key={j} className="matrix-char">
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-left">
            <motion.div className="hero-greeting" variants={itemVariants}>
              <span className="greeting-text">Welcome to my domain—I'm</span>
              <span className="wave-emoji">👋</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              <span className="name-text">SAKTHIMURUGAN S</span>
              <br />
              <span className="title-gradient">
                <TypewriterEffect
                  texts={[
                    'Cybersecurity Enthusiast',
                    'Developer'
                  ]}
                  speed={100}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
              <motion.div className="status-badge" variants={itemVariants}>
                <span className="status-dot"></span>
                <span className="status-text">Available for work</span>
              </motion.div>
            </motion.h1>

            <motion.p className="hero-description" variants={itemVariants}>
              🛡️ A cybersecurity enthusiast and developer on a mission to outsmart the bad guys (and occasionally my own code 🤦‍♂️). 
              With hands-on experience building real-world projects using Python, Machine Learning 🤖, and modern web technologies 🌐, 
              I enjoy tackling security challenges and creating tools that (mostly) behave themselves. Staying ahead in tech isn’t just a goal—it’s my favorite way to keep boredom far, far away. 🚀
            </motion.p>

           

            <motion.div className="hero-actions" variants={itemVariants}>
              <motion.a
                className="cta-button primary"
                href="mailto:sakthimurugan102003@gmail.com"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail />
                Get In Touch
              </motion.a>

              <motion.button
                className="cta-button secondary"
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload />
                Download Resume
              </motion.button>
            </motion.div>

            <motion.div className="hero-social" variants={itemVariants}>
              <span className="social-label">Follow me:</span>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      color: social.color 
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>


        </motion.div>

       
      </div>
    </section>
  );
};

export default Hero;