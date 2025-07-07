import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMoon, FiShield, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ currentSection, setCurrentSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const navItems = [
    { id: 'hero', label: 'Command Center', icon: '🖥️' },
    { id: 'about', label: 'whoami', icon: '💻' },
    { id: 'skills', label: 'Skill Matrix', icon: '🛠️' },
    { id: 'projects', label: 'Deployments', icon: '📦' },
    { id: 'blog', label: 'Tech Blog', icon: '📝' },
    { id: 'contact', label: 'Secure Channel', icon: '📧' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setCurrentSection('hero');
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="nav-container">
        <div className="nav-left-section">
          <button className="nav-logo" onClick={scrollToHome}>
            <FiShield className="logo-icon" />
            <span className="logo-text">
              <span className="cyber-text">Cyber</span>
              <span className="x-text">X</span>
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="nav-controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
