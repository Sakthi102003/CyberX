import { motion } from 'framer-motion';
import { FaMedium, FaXTwitter } from 'react-icons/fa6';
import {
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield
} from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'sakthimurugan102003@gmail.com',
      href: 'mailto:sakthimurugan102003@gmail.com'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+91 97917 47058',
      href: 'https://wa.me/919791747058?text=Hi%20Sakthi,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Coimbatore, Tamil Nadu, India',
      href: null
    }
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Sakthi102003', label: 'GitHub', color: '#333' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/sakthimurugan-s', label: 'LinkedIn', color: '#0077b5' },
    { icon: FiInstagram, href: 'https://instagram.com/sakthimurugans._', label: 'Instagram', color: '#e4405f' },
    { icon: FaXTwitter, href: 'https://twitter.com/Sakthimurugan_1', label: 'X (Twitter)', color: '#000' },
    { icon: FaMedium, href: 'https://medium.com/sakthimurugan102003', label: 'Medium', color: '#00ab6c' }
  ];

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

  return (
    <section className="contact section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              Get In <span className="cyber-text">Touch</span>
            </h2>
            <p className="section-subtitle">
              Ready to build something secure and amazing together? Let's connect!
            </p>
          </motion.div>

          <motion.div className="contact-info-centered" variants={itemVariants}>
            <div className="info-header">
              <FiShield className="info-icon" />
              <h3>Let's Connect Securely</h3>
              <p>
                I'm always interested in discussing new opportunities, 
                collaborations, or just chatting about cybersecurity and 
                frontend development.
              </p>
            </div>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-item"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <info.icon className="contact-item-icon" />
                  <div className="contact-item-content">
                    <span className="contact-label">{info.label}</span>
                    {info.href ? (
                      <a href={info.href} className="contact-value">
                        {info.value}
                      </a>
                    ) : (
                      <span className="contact-value">{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="social-section">
              <h4>Follow Me</h4>
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
                      scale: 1.1, 
                      rotate: 5,
                      color: social.color 
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="security-note">
              <FiShield className="security-icon" />
              <div className="security-content">
                <h4>Secure Communication</h4>
                <p>
                  Feel free to reach out through any of the channels above. 
                  I respond to all inquiries within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;