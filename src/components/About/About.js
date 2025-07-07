import { motion } from 'framer-motion';
import { FiAward, FiCode, FiShield, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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



  const achievements = [
    {
      icon: FiAward,
      title: 'PhishShield Project',
      description: 'ML-based phishing website detector',
      color: '#ff6b6b'
    },
    {
      icon: FiTrendingUp,
      title: 'GitHub User Insights',
      description: 'React-based analytics tool',
      color: '#4ecdc4'
    },
    {
      icon: FiUsers,
      title: 'File Integrity Checker',
      description: 'Python CLI/GUI security tool',
      color: '#45b7d1'
    }
  ];

  return (
    <section className="about section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              About <span className="cyber-text">Me</span>
            </h2>
            <p className="section-subtitle">
              Bridging the gap between beautiful design and bulletproof security
            </p>
          </motion.div>

          <div className="about-grid">
            <motion.div className="about-text" variants={itemVariants}>
              <div className="about-story">
                <h3>My Journey</h3>
                <p>
                  🛡️ A passionate cybersecurity enthusiast and web developer who still celebrates when Python scripts and websites both work on the first try💻. I’ve built real-world projects using Python, Machine Learning , and modern web technologies 🌐—and I’m definitely still learning (not an expert yet, just dangerously curious 😅).
                </p>
                <p>
                  💡 My interest in cybersecurity began during my studies, where I discovered how crucial—and fascinating—security is. Since then, I’ve explored ethical hacking, machine learning for security, and creating security-focused apps.
                </p>
                <p>
                 🔐 Today, I blend development skills and a security mindset to build web applications that protect user data while delivering smooth, user-friendly experiences—and I’m always leveling up, one bug and feature at a time 🚀.
                </p>
              </div>

              <div className="about-philosophy">
                <h3>My Philosophy</h3>
                <div className="philosophy-points">
                  <div className="philosophy-point">
                    <FiShield className="point-icon" />
                    <div>
                      <h4>Security First</h4>
                      <p>Every line of code is written with security considerations in mind</p>
                    </div>
                  </div>
                  <div className="philosophy-point">
                    <FiCode className="point-icon" />
                    <div>
                      <h4>Clean Code</h4>
                      <p>Maintainable, scalable, and well-documented code is essential</p>
                    </div>
                  </div>
                  <div className="philosophy-point">
                    <FiUsers className="point-icon" />
                    <div>
                      <h4>User-Centric</h4>
                      <p>Security shouldn't compromise user experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="about-visual" variants={itemVariants}>
              <div className="profile-card glass-effect">
                <div className="profile-image">
                  <div className="image-placeholder">
                    {/* Shield icon removed */}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="achievements-section" variants={itemVariants}>
            <h3>Key Projects</h3>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div 
                    key={index}
                    className="achievement-card"
                    style={{ '--accent-color': achievement.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="achievement-icon" />
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="cta-section" variants={itemVariants}>
            <div className="cta-content">
              <h3>Ready to Build Something Secure?</h3>
              <p>Let's create applications that are both beautiful and bulletproof</p>
              <motion.a
                className="cta-button primary"
                href="https://linkedin.com/in/sakthimurugan-s"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Work Together
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;