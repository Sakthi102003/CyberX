import { useEffect, useState } from 'react';
import './TypewriterEffect.css';

const TypewriterEffect = ({ 
  texts = [], 
  speed = 100, 
  deleteSpeed = 50, 
  delaySpeed = 2000,
  loop = true 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const timeout = setTimeout(() => {
      // Safety check: ensure currentTextIndex is within bounds
      if (currentTextIndex >= texts.length) {
        setCurrentTextIndex(0);
        return;
      }
      
      const fullText = texts[currentTextIndex];
      
      // Safety check: ensure fullText exists and is a string
      if (!fullText || typeof fullText !== 'string') {
        return;
      }
      
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        // Deleting characters
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => 
            loop ? (prev + 1) % texts.length : Math.min(prev + 1, texts.length - 1)
          );
        }
      } else {
        // Adding characters
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setIsPaused(true);
        }
      }
    }, isPaused ? delaySpeed : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, delaySpeed, loop]);

  return (
    <span className="typewriter-container">
      <span className="typewriter-text">{currentText}</span>
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default TypewriterEffect;