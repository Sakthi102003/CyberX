# CyberSec Portfolio Information

## Summary
A modern, professional portfolio website that combines front-end development and cybersecurity themes in a clean, engaging design. Built with React.js, featuring immersive animations, 3D elements, and security-focused design patterns.

## Structure
- **public/**: Contains static assets and the HTML entry point
- **src/**: Main source code directory
  - **components/**: Reusable UI components organized by feature
  - **context/**: React context providers for state management
  - **App.js**: Main application component
  - **index.js**: Application entry point

## Language & Runtime
**Language**: JavaScript/React
**Version**: React 18.2.0
**Build System**: React Scripts 5.0.1
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- `react` (18.2.0): Core React library
- `react-dom` (18.2.0): React DOM rendering
- `react-router-dom` (6.17.0): Routing library
- `framer-motion` (10.16.4): Animation library
- `@react-three/fiber` (8.15.0): React renderer for Three.js
- `@react-three/drei` (9.99.0): Useful helpers for React Three Fiber
- `three` (0.160.0): 3D graphics library
- `react-particles` (2.12.2): Particle effects
- `tsparticles` (2.12.0): Particle system
- `@emailjs/browser` (3.11.0): Email service integration

**Development Dependencies**:
- React testing utilities (via React Scripts)
- ESLint configuration for React

## Build & Installation
```bash
# Install dependencies
npm install

# Start development server (faster alternative)
npm run dev

# Start development server (standard)
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Main Files & Resources
**Entry Points**:
- `public/index.html`: HTML entry point
- `src/index.js`: JavaScript entry point
- `src/App.js`: Main React component

**Key Components**:
- `src/components/Hero/Hero.js`: Landing section with 3D elements
- `src/components/About/About.js`: About section
- `src/components/Projects/Projects.js`: Projects showcase
- `src/components/Skills/Skills.js`: Skills section
- `src/components/Contact/Contact.js`: Contact form with EmailJS integration

**State Management**:
- `src/context/ThemeContext.js`: Theme context for light/dark mode

## Deployment Options
**Netlify**:
```bash
# Build the project
npm run build

# Deploy the build folder to Netlify
```

**Vercel**:
- Connect GitHub repository for automatic deployment

**GitHub Pages**:
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add homepage and deploy scripts to package.json
# Run deployment
npm run deploy
```

## Features
- Dynamic 3D animations with Three.js
- Interactive particle background
- Light/dark theme support
- Responsive design for all devices
- Accessibility compliance
- Smooth page transitions with Framer Motion
- Contact form with EmailJS integration
- Security-focused design patterns