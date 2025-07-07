import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiCode,
  FiExternalLink,
  FiEye,
  FiGithub,
  FiLayers,
  FiShield,
  FiStar
} from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const projects = [
    {
      id: 1,
      title: 'PhishShield - Phishing Website Detector',
      category: 'cybersecurity',
      description: 'An advanced ML-based web app that detects phishing websites in real-time. Features include URL validation, threat analysis, and user-friendly reporting with a clean UI.',
      longDescription: 'Built an advanced machine learning-based web application that detects phishing websites in real-time. The system uses sophisticated algorithms to analyze URLs and website characteristics, providing instant threat assessment with detailed reporting and user-friendly interface.',
      image: '/images/phishshield-demo.png',
      technologies: ['Python', 'Machine Learning', 'Flask', 'HTML', 'CSS', 'JavaScript'],
      features: [
        'Real-time URL Analysis',
        'ML-based Threat Detection',
        'User-friendly Reporting',
        'Clean UI Design',
        'Threat Intelligence',
        'Security Recommendations'
      ],
      github: 'https://github.com/Sakthi102003/PhisShield',
      live: 'https://phisshield.onrender.com/',
      status: 'completed',
      year: '2025'
    },
    {
      id: 2,
      title: 'GitHub User Insights Finder',
      category: 'frontend',
      description: 'A React-based tool to analyze GitHub user activity, including repo count, tech stacks used, usage statistics, account pricing, and downloadable reports with user comparison features.',
      longDescription: 'Developed a comprehensive React-based analytics tool that provides deep insights into GitHub user activity. The application analyzes repositories, technology stacks, contribution patterns, and generates detailed reports with comparison features between users.',
      image: '/images/github-insights-demo.png',
      technologies: ['React.js', 'GitHub API', 'Chart.js', 'HTML', 'CSS', 'JavaScript'],
      features: [
        'User Activity Analysis',
        'Repository Statistics',
        'Tech Stack Analysis',
        'Usage Statistics',
        'Downloadable Reports',
        'User Comparison Features'
      ],
      github: 'https://github.com/Sakthi102003/Reposcope',
      live: 'https://reposcope-2003.web.app',
      status: 'completed',
      year: '2025'
    },
    {
      id: 3,
      title: 'File Integrity Checker',
      category: 'cybersecurity',
      description: 'Developed a Python-based CLI and GUI tool that generates and verifies cryptographic hashes (MD5/SHA256) of files to detect tampering. Supports JSON log generation and optional email alerts.',
      longDescription: 'Created a comprehensive file integrity monitoring solution with both command-line and graphical interfaces. The tool generates and verifies cryptographic hashes to detect file tampering, maintains detailed logs, and can send email alerts for security incidents.',
      image: '/images/file-intergrity.png',
      technologies: ['Python', 'Tkinter', 'Cryptography', 'JSON', 'Email APIs'],
      features: [
        'MD5/SHA256 Hash Generation',
        'File Tampering Detection',
        'CLI and GUI Interfaces',
        'JSON Log Generation',
        'Email Alert System',
        'Batch File Processing'
      ],
      github: 'https://github.com/Sakthi102003/File-Integrity-Checker',
      live: null,
      status: 'completed',
      year: '2025'
    },
    {
      id: 4,
      title: 'Tech IQ',
      category: 'fullstack',
      description: 'An AI-powered full-stack web application that provides intelligent technology stack recommendations for software projects. Built with React frontend, Node.js backend, and integrated with multiple AI providers.',
      longDescription: 'An innovative AI-powered platform that helps developers and teams make informed decisions about their technology stack. The application leverages OpenAI and Google Gemini to provide intelligent recommendations, cost estimations, and development roadmaps.',
      image: '/images/tech-iq-demo.png',
      technologies: [
        'React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router', 
        'Zustand', 'Firebase', 'Node.js', 'Express.js', 'OpenAI API', 
        'Google Gemini API'
      ],
      features: [
        '🤖 AI-Powered Recommendations',
        '⚡ Flexible AI Configuration',
        '📊 Provider Comparison',
        '💰 Cost Estimation',
        '📅 Development Roadmap',
        '📄 PDF Export',
        '🔥 GitHub Templates'
      ],
      github: 'https://github.com/Sakthi102003/Tech-IQ',
      live: 'https://tech-iq.onrender.com/',
      status: 'completed',
      year: '2025'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', icon: FiLayers },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: FiShield },
    { id: 'frontend', label: 'Frontend', icon: FiCode },
    { id: 'fullstack', label: 'Full Stack', icon: FiLayers }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  const projectVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="projects section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              Featured <span className="cyber-text">Projects</span>
            </h2>
            <p className="section-subtitle">
              A showcase of secure, scalable applications built with modern technologies
            </p>
          </motion.div>

          <motion.div className="projects-filters" variants={itemVariants}>
            <div className="filter-buttons">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filter.icon className="filter-icon" />
                  <span>{filter.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="projects-count">
              {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          </motion.div>

          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={projectVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image-container">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/api/placeholder/600/400';
                      }}
                    />
                    <div className="project-overlay">
                      <div className="overlay-buttons">
                        <motion.button
                          className="overlay-button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiEye />
                        </motion.button>
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="overlay-button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub />
                          </motion.a>
                        )}
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="overlay-button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiExternalLink />
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <div className="project-status">
                      <span className={`status-badge ${project.status}`}>
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>

                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-year">{project.year}</span>
                    </div>
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-technologies">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-more">+{project.technologies.length - 3}</span>
                      )}
                    </div>

                    <div className="project-actions">
                      <motion.button
                        className="action-button primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiEye />
                        View Details
                      </motion.button>
                      
                      <div className="action-links">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-link"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub />
                          </motion.a>
                        )}
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-link"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiExternalLink />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div className="projects-cta" variants={itemVariants}>
            <div className="cta-content">
              <FiStar className="cta-icon" />
              <h3>Interested in My Work?</h3>
              <p>Check out my GitHub for more projects and contributions</p>
              <motion.a
                href="https://github.com/Sakthi102003"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub />
                View All Projects
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{selectedProject.title}</h3>
                <button
                  className="modal-close"
                  onClick={() => setSelectedProject(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="modal-image-container">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="modal-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/api/placeholder/600/400';
                    }}
                  />
                </div>
                
                <div className="modal-details">
                  <p className="modal-description">{selectedProject.longDescription}</p>
                  
                  <div className="modal-features">
                    <h4>Key Features</h4>
                    <ul>
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="modal-technologies">
                    <h4>Technologies Used</h4>
                    <div className="tech-list">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-button"
                      >
                        <FiGithub />
                        View Code
                      </a>
                    )}
                    {selectedProject.live && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-button primary"
                      >
                        <FiExternalLink />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;