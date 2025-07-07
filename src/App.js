import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './App.css';
import About from './components/About/About';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/Navbar/Navbar';
import Projects from './components/Projects/Projects';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Skills from './components/Skills/Skills';
import ThemeProvider from './context/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: 'hero', component: Hero },
    { id: 'about', component: About },
    { id: 'skills', component: Skills },
    { id: 'projects', component: Projects },
    { id: 'blog', component: Blog },
    { id: 'contact', component: Contact }
  ];

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -50
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.8
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <div className="App">
        <ScrollProgress />
        <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={currentSection}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="main-content"
          >
            {sections.map(({ id, component: Component }) => (
              <div
                key={id}
                id={id}
                className={`section ${currentSection === id ? 'active' : ''}`}
                style={{ display: currentSection === id ? 'block' : 'none' }}
              >
                <Component />
              </div>
            ))}
          </motion.main>
        </AnimatePresence>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;