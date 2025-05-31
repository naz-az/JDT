# JDT Engineering Sdn Bhd - Corporate Website

A sophisticated, modern static website built for JDT Engineering Sdn Bhd using React TypeScript with Vite. The website showcases the company's engineering excellence in Power, Oil & Gas, and Heavy Industries sectors.

## 🚀 Live Preview

The development server is running at: `http://localhost:5174/`

## 🏢 Company Profile

**JDT Engineering Sdn Bhd** - Established in 2006, specializing in:
- **Power Generation** - Smart grid solutions, renewable energy systems
- **Oil & Gas** - Refinery optimization, offshore platform automation  
- **Heavy Industries** - Manufacturing automation, process optimization
- **Digital Solutions** - AI/ML integration, digital twin technology

## ✨ Features

### Design & UX
- **🎨 Modern Glassmorphism Design** - Premium visual effects with backdrop blur
- **🌓 Dark/Light Theme Toggle** - Sophisticated dual color schemes
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **✨ Micro-animations** - Smooth transitions and hover effects throughout
- **🌟 Glowing Accents** - Interactive elements with neon glow effects

### Technical Excellence
- **⚡ React 18 + TypeScript** - Modern development stack
- **🏗️ Vite Build Tool** - Lightning-fast development and building
- **🎭 Framer Motion** - Smooth animations and page transitions
- **💅 Styled Components** - Component-scoped styling with theme support
- **🧭 React Router** - Multi-page navigation with route animations

### Interactive Elements
- **🎯 Animated Statistics** - Real-time counting animations
- **🎪 Floating Particles** - Dynamic background animations
- **📊 Filterable Project Portfolio** - Interactive project showcase
- **📰 News Categories** - Organized content with smooth filtering
- **📝 Advanced Contact Form** - Form validation with animations
- **🔄 Scroll Animations** - Elements animate on scroll into view

## 📋 Pages Structure

### 🏠 Home
- **Hero Section** - Animated company introduction with floating particles
- **Statistics** - Animated counters showing company achievements
- **Company Overview** - Features list with lightning bolt icons
- **Call-to-Action** - Gradient buttons with hover effects

### 🛠️ Products & Services
- **Core Services** - Digital Solutions, Engineering Services, System Integration
- **Industry Expertise** - Power Generation, Oil & Gas, Heavy Industries  
- **Technology Stack** - Interactive tech icons with hover animations
- **Service Cards** - Detailed feature lists with checkmark icons

### 📂 Past Projects
- **Project Portfolio** - Filterable grid of completed projects
- **Category Filters** - Interactive filter buttons with smooth transitions
- **Project Cards** - Rich project information with gradient backgrounds
- **Project Details** - Technology tags and project statistics

### 📰 Newsroom
- **Latest News** - Company updates and industry insights
- **Category Tabs** - Filter news by Company News, Projects, Technology, Awards
- **Featured Section** - Highlighted company developments
- **News Cards** - Organized content with read-more buttons

### 📞 Contact Us
- **Professional Contact Form** - Multi-field form with validation
- **Real-time Validation** - Instant error feedback and success messages
- **Contact Information** - Multiple contact methods and office details
- **Interactive Elements** - Animated icons and hover effects

## 🛠️ Technical Stack

### Frontend Framework
```typescript
React 18.3.1 + TypeScript 5.6.2
```

### Build Tool
```typescript
Vite 5.4.8 - Next generation frontend tooling
```

### Styling & Animation
```typescript
styled-components 6.1.13 - CSS-in-JS styling
framer-motion 11.11.11 - Animation library
```

### Routing
```typescript
react-router-dom 6.28.0 - Declarative routing
```

## 🎨 Theme Configuration

The website features a sophisticated dual-theme system:

### Dark Theme (Default)
- **Primary Colors**: White text on dark gradients
- **Accent Color**: Cyan blue (#00d4ff) with glowing effects
- **Background**: Multi-layered dark gradients
- **Surface**: Semi-transparent glass panels

### Light Theme
- **Primary Colors**: Dark text on light gradients  
- **Accent Color**: Cyan blue (#00d4ff) with glowing effects
- **Background**: Light gradient overlays
- **Surface**: Semi-transparent white panels

### Color Palette
```css
/* Dark Theme */
--accent: #00d4ff (Cyan Blue)
--secondary: #00d4ff (Cyan Blue)
--background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)
--surface: rgba(255, 255, 255, 0.1)
--glow: #00d4ff (Glowing effects)

/* Light Theme */
--accent: #00d4ff (Cyan Blue)
--secondary: #2c3e50 (Dark Blue)
--background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)
--surface: rgba(255, 255, 255, 0.9)
--glow: #00d4ff (Glowing effects)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd JDT
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5174/
```

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run tsc

# Linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Navigation with glassmorphism
│   └── Footer.tsx       # Company information footer
├── pages/               # Route-based page components
│   ├── Home.tsx         # Landing page with hero section
│   ├── ProductsServices.tsx  # Services showcase
│   ├── PastProjects.tsx # Project portfolio
│   ├── Newsroom.tsx     # News and updates
│   └── Contact.tsx      # Contact form and info
├── App.tsx              # Main app with routing & themes
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite type definitions
```

## 🎯 Key Features Implemented

### ✅ Design Requirements
- [x] Professional & sophisticated modern design
- [x] Interactive elements with glowing effects
- [x] Light/premium and dark mode color schemes
- [x] Responsive layout for all devices
- [x] Micro-animations and transitions throughout
- [x] Glassmorphism visual effects
- [x] Bold typography with clear hierarchy

### ✅ Technical Requirements
- [x] React 18 + TypeScript
- [x] Vite build tool
- [x] React Router for multi-page navigation
- [x] Styled-components for styling
- [x] No external CSS frameworks

### ✅ Interactive Features
- [x] Smooth scrolling navigation
- [x] Hover effects on buttons/cards
- [x] Glowing accents and borders
- [x] Animated counters/statistics
- [x] Image galleries with transitions
- [x] Form validation with animations

## 🔧 Customization

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Update navigation in `Navbar.tsx`

### Modifying Themes
1. Edit theme objects in `App.tsx`
2. Update color values in styled components
3. Adjust glow effects and gradients

### Adding Animations
1. Import `motion` from framer-motion
2. Wrap components with `motion.div`
3. Add `initial`, `animate`, and `transition` props

## 📊 Performance Features

- **Code Splitting** - React Router lazy loading
- **Optimized Images** - Responsive image loading
- **Smooth Animations** - 60fps animations with Framer Motion
- **Fast Development** - Vite HMR for instant updates
- **Tree Shaking** - Automatic dead code elimination

## 🌟 Notable Implementation Details

### Glassmorphism Effects
```typescript
backdrop-filter: blur(20px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Animated Counters
```typescript
const AnimatedCounter: React.FC<{ end: number }> = ({ end }) => {
  // Real-time counting animation implementation
};
```

### Theme Switching
```typescript
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>();
```

### Scroll Animations
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

## 🏆 Engineering Excellence

This website demonstrates JDT Engineering's commitment to:
- **Innovation** - Cutting-edge web technologies
- **Quality** - TypeScript for type safety
- **Performance** - Optimized build and runtime
- **User Experience** - Intuitive navigation and interactions
- **Accessibility** - Semantic HTML and proper contrast
- **Maintainability** - Component-based architecture

## 📞 Contact Information

**JDT Engineering Sdn Bhd**
- 📍 Kuala Lumpur, Malaysia
- 📞 +60 3-XXXX XXXX
- 📧 info@jdtengineering.com
- 🌐 www.jdtengineering.com

---

**Built with ❤️ by JDT Engineering - Engineering Excellence Since 2006**
