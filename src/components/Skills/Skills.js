import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
    FiCode,
    FiDatabase,
    FiLayers,
    FiMonitor,
    FiShield,
    FiTool
} from 'react-icons/fi';
import {
    SiCentos,
    SiCss3,
    SiFirebase,
    SiFlask,
    SiGit,
    SiGithub,
    SiHtml5,
    SiJavascript,
    SiKalilinux,
    SiPython,
    SiReact,
    SiTailwindcss,
    SiUbuntu,
    SiVisualstudiocode
} from 'react-icons/si';
import { useInView } from 'react-intersection-observer';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('languages');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skillCategories = {
    languages: {
      title: 'Programming Languages',
      icon: FiCode,
      color: '#3b82f6',
      skills: [
        { name: 'Python', icon: <SiPython />, color: '#3776ab' },
        { name: 'HTML', icon: <SiHtml5 />, color: '#e34f26' },
        { name: 'CSS', icon: <SiCss3 />, color: '#1572b6' },
        { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' }
      ]
    },
    frontend: {
      title: 'Frontend Development',
      icon: FiMonitor,
      color: '#00ff41',
      skills: [
        { name: 'React.js', icon: <SiReact />, color: '#61dafb' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06b6d4' },
        { name: 'ShadCN UI', icon: '🎨', color: '#000000' },
        { name: 'Chart.js', icon: '📊', color: '#ff6384' }
      ]
    },
    backend: {
      title: 'Backend & ML',
      icon: FiDatabase,
      color: '#00d4ff',
      skills: [
        { name: 'Flask', icon: <SiFlask />, color: '#000000' },
        { name: 'GitHub API', icon: <SiGithub />, color: '#181717' },
        { name: 'Machine Learning', icon: '🤖', color: '#ff6b35' },
        { name: 'Firebase', icon: <SiFirebase />, color: '#ffca28' }
      ]
    },
    tools: {
      title: 'Tools & OS',
      icon: FiTool,
      color: '#8b5cf6',
      skills: [
        { name: 'Git', icon: <SiGit />, color: '#f05032' },
        { name: 'GitHub', icon: <SiGithub />, color: '#181717' },
        { name: 'VS Code', icon: <SiVisualstudiocode />, color: '#007acc' },
        { name: 'Ubuntu', icon: <SiUbuntu />, color: '#e95420' },
        { name: 'Kali Linux', icon: <SiKalilinux />, color: '#557c94' },
        { name: 'CentOS', icon: <SiCentos />, color: '#932279' }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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



  const categories = Object.keys(skillCategories);

  return (
    <section className="skills section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              Technical <span className="cyber-text">Skills</span>
            </h2>
            <p className="section-subtitle">
             🛠️ A comprehensive skill set for building 🔒 secure and 🚀 scalable applications
            </p>
          </motion.div>

          <motion.div className="skills-navigation" variants={itemVariants}>
            {categories.map((category) => {
              const categoryData = skillCategories[category];
              const IconComponent = categoryData.icon;
              
              return (
                <motion.button
                  key={category}
                  className={`nav-button ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ '--category-color': categoryData.color }}
                >
                  <IconComponent className="nav-icon" />
                  <span className="nav-label">{categoryData.title}</span>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div className="skills-display" variants={itemVariants}>
            <div className="skills-header">
              <div className="category-info">
                {React.createElement(skillCategories[activeCategory].icon, {
                  className: 'category-icon',
                  style: { color: skillCategories[activeCategory].color }
                })}
                <h3>{skillCategories[activeCategory].title}</h3>
              </div>
              <div className="skills-count">
                {skillCategories[activeCategory].skills.length} Skills
              </div>
            </div>

            <div className="skills-grid">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="skill-header">
                    <div className="skill-info">
                      <span 
                        className="skill-icon" 
                        style={{ color: skill.color || 'var(--text-primary)' }}
                      >
                        {skill.icon}
                      </span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="skills-summary" variants={itemVariants}>
            <div className="summary-grid">
              <div className="summary-item">
                <FiCode className="summary-icon" />
                <div className="summary-content">
                  <h4>Frontend Mastery</h4>
                  <p>Modern frameworks and libraries for creating engaging user interfaces</p>
                </div>
              </div>
              
              <div className="summary-item">
                <FiShield className="summary-icon" />
                <div className="summary-content">
                  <h4>Security Expertise</h4>
                  <p>Comprehensive knowledge of cybersecurity principles and practices</p>
                </div>
              </div>
              
              <div className="summary-item">
                <FiLayers className="summary-icon" />
                <div className="summary-content">
                  <h4>Full-Stack Capability</h4>
                  <p>End-to-end development with security considerations at every layer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;