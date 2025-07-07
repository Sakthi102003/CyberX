import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiCalendar,
  FiClock,
  FiExternalLink,
  FiEye,
  FiTag,
  FiUser
} from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import './Blog.css';

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const blogPosts = [
    {
      id: 1,
      title: 'File Transfer Protocol (FTP) for Beginners',
      excerpt: 'Understand how FTP works, its purpose, and how it enables reliable file transfers over the internet.',
      content: 'A beginner-friendly guide to FTP, exploring its commands, security considerations, and common use cases.',
      category: 'cybersecurity',
      tags: ['FTP', 'file transfer', 'network protocols'],
      author: 'Sakthimurugan S',
      date: '2024-07-10',
      readTime: '5 min read',
      image: '/images/blogs/FTP.jpg',
      featured: false,
      link: 'https://medium.com/@sakthimurugan102003/file-transfer-protocol-ftp-for-beginners-73910205d9f4'
    },
    {
      id: 2,
      title: 'Cybersecurity Beyond Buzzwords',
      excerpt: 'Cut through the hype and discover what cybersecurity really means for individuals and organizations.',
      content: 'This article discusses the practical aspects of cybersecurity, moving beyond superficial trends.',
      category: 'cybersecurity',
      tags: ['cybersecurity', 'risk management', 'awareness'],
      author: 'Sakthimurugan S',
      date: '2024-07-30',
      readTime: '6 min read',
      image: '/images/blogs/buzzword.png',
      featured: true,
      link: 'https://medium.com/@sakthimurugan102003/cybersecurity-beyond-buzzwords-8125325cc358'
    },
    {
      id: 3,
      title: 'Cybersecurity Shield: Hack-Proof Defense',
      excerpt: 'Learn strategies and frameworks for building strong, resilient cybersecurity defenses.',
      content: 'Explore multi-layered defense mechanisms and proactive protection strategies to fortify your digital assets.',
      category: 'cybersecurity',
      tags: ['defense', 'network security', 'threat prevention'],
      author: 'Sakthimurugan S',
      date: '2024-08-14',
      readTime: '7 min read',
      image: '/images/blogs/hackproof.png',
      featured: true,
      link: 'https://medium.com/@sakthimurugan102003/cybersecurity-shield-hack-proof-defense-ad6246d612b6'
    },
    {
      id: 4,
      title: 'Behind the Scenes: The Ethical Hacker\'s Playbook',
      excerpt: 'Step into the world of ethical hacking and learn how security professionals find and fix vulnerabilities.',
      content: 'A look at reconnaissance, exploitation, and reporting from an ethical hacker\'s perspective.',
      category: 'cybersecurity',
      tags: ['ethical hacking', 'penetration testing', 'security testing'],
      author: 'Sakthimurugan S',
      date: '2024-10-01',
      readTime: '8 min read',
      image: '/images/blogs/Phases-of-Ethical-Hacking.jpg',
      featured: false,
      link: 'https://medium.com/@sakthimurugan102003/behind-the-scenes-the-ethical-hackers-playbook-c86ff6704509'
    },
    {
      id: 5,
      title: 'Digital Deception',
      excerpt: 'Explore the art and science of deception techniques used by attackers in cyberspace.',
      content: 'This article unpacks social engineering, phishing, and psychological manipulation tactics.',
      category: 'cybersecurity',
      tags: ['social engineering', 'phishing', 'deception'],
      author: 'Sakthimurugan S',
      date: '2025-05-12',
      readTime: '6 min read',
      image: '/images/blogs/Digital Deception.png',
      featured: false,
      link: 'https://medium.com/@sakthimurugan102003/digital-deception-07362eae348b'
    },
    {
      id: 6,
      title: 'AI in Cybersecurity: A Double-Edged Sword',
      excerpt: 'Discover how AI empowers defenders—and attackers—in the modern threat landscape.',
      content: 'An in-depth look at AI-driven defense systems, adversarial attacks, and ethical considerations.',
      category: 'ai-security',
      tags: ['AI', 'machine learning', 'cybersecurity'],
      author: 'Sakthimurugan S',
      date: '2024-07-06',
      readTime: '7 min read',
      image: '/images/blogs/AI.png',
      featured: true,
      link: 'https://medium.com/@sakthimurugan102003/ai-in-cybersecurity-a-double-edged-sword-for-hackers-and-defenders-46cfaed484bc'
    }
  ];

const categories = [
  { id: 'all', label: 'All Posts', count: blogPosts.length },
  { id: 'cybersecurity', label: 'Cybersecurity', count: blogPosts.filter(post => post.category === 'cybersecurity').length },
  { id: 'ai-security', label: 'AI & Security', count: blogPosts.filter(post => post.category === 'ai-security').length }
];


  const filteredPosts = activeFilter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  const featuredPosts = blogPosts.filter(post => post.featured);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="blog section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="blog-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">
              Tech <span className="cyber-text">Blog</span>
            </h2>
            <p className="section-subtitle">
              Insights, tutorials, and thoughts on cybersecurity, development, and emerging technologies
            </p>
          </motion.div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <motion.div className="featured-section" variants={itemVariants}>
              <h3 className="featured-title">Featured Posts</h3>
              <div className="featured-posts">
                {featuredPosts.slice(0, 2).map((post) => (
                  <motion.article
                    key={post.id}
                    className="featured-post"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="post-image">
                      <img src={post.image} alt={post.title} />
                      <div className="post-overlay">
                        <span className="post-category">{post.category}</span>
                      </div>
                    </div>
                    <div className="post-content">
                      <div className="post-meta">
                        <span className="post-date">
                          <FiCalendar /> {formatDate(post.date)}
                        </span>
                        <span className="post-read-time">
                          <FiClock /> {post.readTime}
                        </span>
                        <span className="post-views">
                          <FiEye /> {post.views}
                        </span>
                      </div>
                      <h4 className="post-title">
                        <a href={post.link} target="_blank" rel="noopener noreferrer">
                          {post.title}
                        </a>
                      </h4>
                      <p className="post-excerpt">{post.excerpt}</p>
                      <div className="post-tags">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="post-tag">
                            <FiTag /> {tag}
                          </span>
                        ))}
                      </div>
                      <div className="post-footer">
                        <div className="post-author">
                          <FiUser /> {post.author}
                        </div>
                        <a href={post.link} className="read-more-btn">
                          Read More <FiExternalLink />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* Category Filter */}
          <motion.div className="blog-filters" variants={itemVariants}>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
                <span className="filter-count">({category.count})</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div className="blog-grid" variants={itemVariants}>
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="blog-post"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <div className="post-overlay">
                    <span className="post-category">{post.category}</span>
                  </div>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">
                      <FiCalendar /> {formatDate(post.date)}
                    </span>
                    <span className="post-read-time">
                      <FiClock /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="post-title">
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-tags">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="post-tag">
                        <FiTag /> {tag}
                      </span>
                    ))}
                  </div>
                  <div className="post-footer">
                    <div className="post-stats">
                      <span className="post-views">
                        <FiEye /> {post.views}
                      </span>
                    </div>
                    <a href={post.link} className="read-more-btn">
                      Read More <FiExternalLink />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Blog CTA */}
          <motion.div className="blog-cta" variants={itemVariants}>
            <div className="cta-content">
              <h3>Stay Updated</h3>
              <p>Get notified about new blog posts and cybersecurity insights</p>
              <div className="cta-buttons">
                <motion.a
                  href="#contact"
                  className="cta-btn primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe to Newsletter
                </motion.a>
                <motion.a
                  href="#"
                  className="cta-btn secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Posts
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;