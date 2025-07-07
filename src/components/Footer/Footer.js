import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMedium, FaXTwitter } from 'react-icons/fa6';
import {
    FiArrowUp,
    FiGithub,
    FiHeart,
    FiInstagram,
    FiLinkedin,
    FiShield
} from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Sakthi102003', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/sakthimurugan-s', label: 'LinkedIn' },
    { icon: FiInstagram, href: 'https://instagram.com/sakthimurugans._', label: 'Instagram' },
    { icon: FaXTwitter, href: 'https://twitter.com/Sakthimurugan_1', label: 'X (Twitter)' },
    { icon: FaMedium, href: 'https://medium.com/sakthimurugan102003', label: 'Medium' }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigateToHome = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-compact">
            <div className="footer-left">
              <div className="brand-logo" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
                <FiShield className="logo-icon" />
                <span className="logo-text">
                  <span className="cyber-text">Cyber</span>X
                </span>
              </div>
              <div className="datetime-display">
                <span className="date">{formatDate(currentTime)}</span>
                <span className="time">{formatTime(currentTime)}</span>
              </div>
              <div className="copyright">
                <p>© {currentYear} CyberX. Made with <FiHeart className="heart-icon" /> and <span className="cyber-text">secure code</span>.</p>
              </div>
            </div>

            <div className="footer-right">
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
              
              <motion.button
                className="scroll-to-top"
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <FiArrowUp />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-glow">
        <div className="glow-line"></div>
      </div>
    </footer>
  );
};

export default Footer;