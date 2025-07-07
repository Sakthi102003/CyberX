# CyberSec Portfolio - Modern React Portfolio Website

A modern, professional portfolio website that combines front-end development and cybersecurity themes in a clean, engaging design. Built with React.js, featuring immersive animations, 3D elements, and security-focused design patterns.

## 🚀 Features

### Core Features
- **Dynamic Hero Section** with 3D animated elements using Three.js
- **Interactive Particle Background** with Particle.js that responds to user movement
- **Smooth Page Transitions** with unique animation styles using Framer Motion
- **Light/Dark Theme Support** with smooth toggling
- **Fully Responsive Design** across mobile, tablet, and desktop devices
- **Accessibility Compliant** with proper ARIA labels and keyboard navigation

### Sections
- **Hero Section**: 3D animated icon, typewriter effect, social links
- **About Section**: Personal story, philosophy, achievements
- **Skills Section**: Interactive skill categories with progress bars
- **Projects Section**: Filterable project gallery with detailed modals
- **Contact Section**: Secure contact form with validation
- **Footer**: Quick links, social media, scroll-to-top functionality

### Design Elements
- **Cybersecurity Theme**: Lock icons, matrix backgrounds, security badges
- **Modern UI**: Glass morphism effects, gradient backgrounds, smooth animations
- **Typography**: Inter font for UI, JetBrains Mono for code elements, Press Start 2P for cyber-themed elements
- **Color Scheme**: Cyber-inspired colors (blue, green, purple) with professional grays
- **Custom Favicon**: Stylized "X" with cyber circuit elements matching the navbar CyberX branding

## 🛠️ Technologies Used

### Frontend Framework
- **React.js 18** - Main framework
- **Framer Motion** - Animations and transitions
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js

### UI & Styling
- **CSS3** with custom properties for theming
- **React Icons** - Icon library
- **Particle.js** - Interactive background effects

### Development Tools
- **React Scripts** - Build tooling
- **React Intersection Observer** - Scroll-triggered animations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cybersec-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `src/components/Hero/Hero.js` - Name, titles, social links
- `src/components/About/About.js` - Personal story, achievements
- `src/components/Contact/Contact.js` - Contact information
- `src/components/Footer/Footer.js` - Footer details

### Projects
Add your projects in `src/components/Projects/Projects.js`:
```javascript
const projects = [
  {
    id: 1,
    title: 'Your Project Title',
    category: 'frontend', // or 'cybersecurity', 'fullstack'
    description: 'Project description',
    technologies: ['React', 'Node.js', 'etc'],
    github: 'https://github.com/your-repo',
    live: 'https://your-demo.com'
  }
];
```

### Skills
Modify skills in `src/components/Skills/Skills.js`:
```javascript
const skillCategories = {
  frontend: {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', level: 95, icon: '⚛️' }
    ]
  }
};
```

### Theme Colors
Customize colors in `src/index.css`:
```css
:root {
  --accent-primary: #3b82f6;
  --cyber-green: #00ff41;
  --cyber-blue: #00d4ff;
  /* Add your custom colors */
}
```

### Favicon
The custom favicon uses the CyberX branding style with:
- Stylized "X" in blue (#00d4ff) with glow effects
- Cyber circuit elements in green (#00ff41)
- Dark background for contrast

To modify the favicon:
1. Edit `public/favicon.svg` to change the design
2. The SVG automatically adapts to light/dark modes

## 📧 Contact Form Setup

The contact form is ready for integration with EmailJS or a backend service:

### EmailJS Integration
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update `src/components/Contact/Contact.js`:
   ```javascript
   import emailjs from '@emailjs/browser';
   
   const result = await emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     formData,
     'YOUR_PUBLIC_KEY'
   );
   ```

## 🔒 Security Features

- **Input Validation** on contact form
- **XSS Protection** through React's built-in sanitization
- **Secure Headers** (configure in hosting platform)
- **Privacy-focused** design with no tracking scripts

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## ⚡ Performance Optimizations

- **Lazy Loading** for heavy assets
- **Code Splitting** with React.lazy()
- **Optimized Images** and assets
- **Minimal Bundle Size** with tree shaking
- **Efficient Animations** with Framer Motion

## 🎯 SEO & Accessibility

- **Semantic HTML** structure
- **ARIA Labels** for screen readers
- **Keyboard Navigation** support
- **Meta Tags** for social sharing
- **Alt Text** for images
- **Focus Management** for modals

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure redirects for SPA routing

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically build and deploy

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/repository-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out:

- **Email**: your-email@example.com
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)

---

**Built with ❤️ and lots of secure code** 🔒