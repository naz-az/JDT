import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView,
  useMotionValue,
  useAnimation
} from 'framer-motion';

// Add Google Fonts
const addGoogleFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

// Call font loading once
if (typeof window !== 'undefined' && !document.querySelector('link[href*="fonts.googleapis.com"]')) {
  addGoogleFonts();
}

// Custom hooks for animations
const useParallax = (value: any, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

const useScrollAnimation = (thresholdValue = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: thresholdValue,
    once: false,
    margin: "-100px 0px" 
  });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);
  
  return { ref, controls, isInView };
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  
  return mousePosition;
};

// Animation variants
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const slideInLeft = {
  hidden: { 
    opacity: 0, 
    x: -100,
    rotateY: -15
  },
  visible: { 
    opacity: 1, 
    x: 0,
    rotateY: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInRight = {
  hidden: { 
    opacity: 0, 
    x: 100,
    rotateY: 15
  },
  visible: { 
    opacity: 1, 
    x: 0,
    rotateY: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  font-family: 'Inter', 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
  
  * {
    font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'pnum' 1, 'tnum' 0, 'onum' 1, 'lnum' 0, 'dlig' 0;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
  perspective: 1000px;
`;

const HeroBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://images.unsplash.com/photo-1678532685208-54acdd41187d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  will-change: transform;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.isDark 
      ? 'radial-gradient(circle at 20% 50%, rgba(0, 200, 83, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(76, 175, 80, 0.15) 0%, transparent 50%)'
      : 'radial-gradient(circle at 20% 50%, rgba(0, 200, 83, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45, 90, 65, 0.15) 0%, transparent 50%)'
    };
    transition: all 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
  }
`;

const FloatingParticles = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${props => props.theme.colors.accent};
    border-radius: 50%;
    opacity: 0.6;
    filter: blur(0.5px);
    box-shadow: 0 0 10px ${props => props.theme.colors.accent}50;
    will-change: transform;
    
    &:nth-child(1) { left: 10%; animation: float1 25s infinite linear; }
    &:nth-child(2) { left: 20%; animation: float2 20s infinite linear; }
    &:nth-child(3) { left: 30%; animation: float3 30s infinite linear; }
    &:nth-child(4) { left: 40%; animation: float4 22s infinite linear; }
    &:nth-child(5) { left: 50%; animation: float5 28s infinite linear; }
    &:nth-child(6) { left: 60%; animation: float6 24s infinite linear; }
    &:nth-child(7) { left: 70%; animation: float7 26s infinite linear; }
    &:nth-child(8) { left: 80%; animation: float8 21s infinite linear; }
    &:nth-child(9) { left: 90%; animation: float9 29s infinite linear; }
  }
  
  @keyframes float1 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.6; }
    95% { opacity: 0.6; }
    100% { transform: translateY(-10vh) translateX(50px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes float2 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.4; }
    95% { opacity: 0.4; }
    100% { transform: translateY(-10vh) translateX(-30px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes float3 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.7; }
    95% { opacity: 0.7; }
    100% { transform: translateY(-10vh) translateX(70px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes float4 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.5; }
    95% { opacity: 0.5; }
    100% { transform: translateY(-10vh) translateX(-20px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes float5 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.8; }
    95% { opacity: 0.8; }
    100% { transform: translateY(-10vh) translateX(40px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes float6 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.3; }
    95% { opacity: 0.3; }
    100% { transform: translateY(-10vh) translateX(-50px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes float7 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.6; }
    95% { opacity: 0.6; }
    100% { transform: translateY(-10vh) translateX(25px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes float8 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.4; }
    95% { opacity: 0.4; }
    100% { transform: translateY(-10vh) translateX(-35px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes float9 {
    0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
    5% { opacity: 0.7; }
    95% { opacity: 0.7; }
    100% { transform: translateY(-10vh) translateX(60px) rotate(360deg); opacity: 0; }
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  z-index: 10;
  position: relative;
  perspective: 1000px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.1;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  will-change: transform;
  
  .jdt {
    color: #00c853;
    text-shadow: 0 0 40px #00c85380, 0 0 80px #00c85320;
    display: inline-block;
    background: linear-gradient(135deg, #00c853, #4caf50, #00e676);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 4s ease-in-out infinite;
  }
  
  .engineering {
    color: #ffffff;
    display: block;
    font-size: clamp(1.5rem, 4vw, 3rem);
    font-weight: 500;
    margin-top: 0.5rem;
    letter-spacing: 0.15em;
    font-family: 'Inter', sans-serif;
    text-shadow: 0 0 20px rgba(255,255,255,0.3);
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: #b0b0b0;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #00c853, #4caf50);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px #00c85320;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px #00c85350;
    scale: 1.02;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    border-radius: 50px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  color: #ffffff;
  border: 2px solid #00c853;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
  
  &:hover {
    background: #00c853;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 15px 35px #00c85350;
    scale: 1.02;
    border-color: transparent;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const StatsSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
`;

const StatsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const StatCard = styled(motion.div)<{ hoverColor?: string }>`
  text-align: center;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  
  &:hover {
    transform: translateY(-20px) scale(1.03) rotateX(5deg) rotateY(2deg);
    box-shadow: 
      0 30px 60px ${props => props.hoverColor || props.theme.colors.glow}40,
      0 0 0 1px ${props => props.hoverColor || props.theme.colors.accent}30,
      inset 0 1px 0 rgba(255,255,255,0.1);
    border-color: ${props => props.hoverColor || props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.hoverColor || props.theme.colors.accent}20, transparent);
    transition: left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.hoverColor || props.theme.colors.accent}08 0%, transparent 50%);
    animation: rotate 20s linear infinite;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StatIcon = styled(motion.div)<{ iconColor?: string }>`
  font-size: 2.5rem;
  color: ${props => props.iconColor || props.theme.colors.accent};
  text-shadow: 0 0 25px ${props => props.iconColor || props.theme.colors.glow}50;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: 'SF Pro Display', 'Inter', sans-serif;
  transform-style: preserve-3d;
  
  &:hover {
    transform: scale(1.2) rotateY(15deg) translateZ(20px);
    text-shadow: 0 0 40px ${props => props.iconColor || props.theme.colors.glow}80;
  }
`;

const StatNumber = styled(motion.div)<{ numberColor?: string }>`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${props => props.numberColor || props.theme.colors.accent};
  text-shadow: 0 0 30px ${props => props.numberColor || props.theme.colors.glow}60;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  transform-style: preserve-3d;
  
  &:hover {
    transform: scale(1.15) translateZ(15px);
    text-shadow: 0 0 40px ${props => props.numberColor || props.theme.colors.glow}80;
  }
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
  
  .stat-card:hover & {
    color: ${props => props.theme.colors.text};
    transform: translateY(-2px);
  }
`;

const ValuesSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.background};
`;

const ValuesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  
  .highlight {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 20px ${props => props.theme.colors.glow}40;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const ValueCard = styled(motion.div)<{ hoverColor?: string }>`
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  
  &:hover {
    transform: translateY(-25px) scale(1.03) rotateX(8deg) rotateY(3deg);
    box-shadow: 
      0 35px 70px ${props => props.hoverColor || props.theme.colors.glow}35,
      0 0 0 1px ${props => props.hoverColor || props.theme.colors.accent}40,
      inset 0 1px 0 rgba(255,255,255,0.15);
    border-color: ${props => props.hoverColor || props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.hoverColor || props.theme.colors.accent}15, transparent);
    transition: left 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.hoverColor || props.theme.colors.accent}06 0%, transparent 60%);
    animation: rotate 25s linear infinite;
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 1;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const ValueIcon = styled(motion.div)<{ iconColor?: string }>`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.iconColor || props.theme.colors.accent};
  text-shadow: 0 0 25px ${props => props.iconColor || props.theme.colors.glow}50;
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
  font-family: 'SF Pro Display', 'Inter', sans-serif;
  
  .value-card:hover & {
    transform: scale(1.15) rotate(5deg);
    text-shadow: 0 0 35px ${props => props.iconColor || props.theme.colors.glow}70;
  }
`;

const ValueTitle = styled.h3<{ titleColor?: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
  
  .value-card:hover & {
    color: ${props => props.titleColor || props.theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const ValueDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  
  .value-card:hover & {
    color: ${props => props.theme.colors.text};
  }
`;

const ServicesHighlightSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const ServiceHighlightCard = styled(motion.div)<{ hoverColor?: string }>`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  
  &:hover {
    transform: translateY(-20px) scale(1.02) rotateX(5deg) rotateY(2deg);
    box-shadow: 
      0 30px 60px ${props => props.hoverColor || props.theme.colors.glow}35,
      0 0 0 1px ${props => props.hoverColor || props.theme.colors.accent}30,
      inset 0 1px 0 rgba(255,255,255,0.1);
    border-color: ${props => props.hoverColor || props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.hoverColor || props.theme.colors.accent}15, transparent);
    transition: left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ServiceImage = styled.div<{ imageUrl: string }>`
  height: 220px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%);
    transition: all 0.4s ease;
  }
  
  .service-card:hover & {
    transform: scale(1.05);
  }
  
  .service-card:hover &::before {
    background: linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 100%);
  }
`;

const ServiceContent = styled.div`
  padding: 2.5rem 2rem;
  position: relative;
  z-index: 2;
`;

const ServiceTitle = styled.h3<{ titleColor?: string }>`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
  
  .service-card:hover & {
    color: ${props => props.titleColor || props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  
  .service-card:hover & {
    color: ${props => props.theme.colors.text};
  }
`;

const LearnMoreButton = styled(motion.button)<{ buttonColor?: string }>`
  background: transparent;
  color: ${props => props.buttonColor || props.theme.colors.accent};
  border: 2px solid ${props => props.buttonColor || props.theme.colors.accent};
  padding: 0.7rem 1.8rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  
  &:hover {
    background: ${props => props.buttonColor || props.theme.colors.accent};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.buttonColor || props.theme.colors.glow}40;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.background};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled(motion.div)<{ hoverColor?: string }>`
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  
  &:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow: 0 20px 40px ${props => props.hoverColor || props.theme.colors.glow}25;
    border-color: ${props => props.hoverColor || props.theme.colors.accent};
  }
  
  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 2rem;
    font-size: 4rem;
    color: ${props => props.hoverColor || props.theme.colors.accent};
    opacity: 0.2;
    transition: all 0.3s ease;
    z-index: 1;
    font-family: 'Inter', serif;
  }
  
  &:hover::before {
    opacity: 0.4;
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.hoverColor || props.theme.colors.accent}08, transparent);
    transition: left 0.7s;
    z-index: 1;
  }
  
  &:hover::after {
    left: 100%;
  }
`;

const TestimonialText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  font-style: italic;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  
  .testimonial-card:hover & {
    color: ${props => props.theme.colors.text};
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
`;

const AuthorAvatar = styled.div<{ avatarColor?: string }>`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: ${props => props.avatarColor || props.theme.colors.accent}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.avatarColor || props.theme.colors.accent};
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-family: 'Inter', sans-serif;
  
  .testimonial-card:hover & {
    background: ${props => props.avatarColor || props.theme.colors.accent};
    color: white;
    transform: scale(1.1);
    border-color: ${props => props.avatarColor || props.theme.colors.accent};
    box-shadow: 0 5px 15px ${props => props.avatarColor || props.theme.colors.glow}40;
  }
`;

const AuthorInfo = styled.div<{ infoColor?: string }>`
  h4 {
    color: ${props => props.theme.colors.text};
    font-weight: 600;
    margin-bottom: 0.2rem;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
  
  .testimonial-card:hover & h4 {
    color: ${props => props.infoColor || props.theme.colors.accent};
  }
  
  .testimonial-card:hover & p {
    color: ${props => props.theme.colors.text};
  }
`;

const ProjectShowcaseSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProjectCard = styled(motion.div)<{ hoverColor?: string }>`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  font-family: 'Inter', sans-serif;
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 40px ${props => props.hoverColor || props.theme.colors.glow}30;
    border-color: ${props => props.hoverColor || props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.hoverColor || props.theme.colors.accent}10, transparent);
    transition: left 0.6s;
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ProjectImage = styled.div<{ imageUrl: string }>`
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);
    transition: all 0.4s ease;
  }
  
  .project-card:hover & {
    transform: scale(1.05);
  }
  
  .project-card:hover &::before {
    background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const ProjectTitle = styled.h3<{ titleColor?: string }>`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
  
  .project-card:hover & {
    color: ${props => props.titleColor || props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const ProjectCategory = styled.span<{ categoryColor?: string }>`
  background: ${props => props.categoryColor || props.theme.colors.accent}20;
  color: ${props => props.categoryColor || props.theme.colors.accent};
  padding: 0.4rem 1.2rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
  
  .project-card:hover & {
    background: ${props => props.categoryColor || props.theme.colors.accent};
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.categoryColor || props.theme.colors.glow}40;
  }
`;

const CTASection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.background};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.theme.colors.accent}03 0%, transparent 50%);
    animation: rotate 30s linear infinite;
    opacity: 0.8;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CTAContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  
  h2 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.text};
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.02em;
    
    .highlight {
      color: ${props => props.theme.colors.accent};
      text-shadow: 0 0 25px ${props => props.theme.colors.glow}50;
    }
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 3rem;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
`;

const AnimatedCounter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
};

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const mousePosition = useMousePosition();
  
  // Parallax transforms
  const backgroundY = useParallax(scrollYProgress, -50);
  const particlesY = useParallax(scrollYProgress, -100);
  const heroContentY = useParallax(scrollYProgress, 30);
  
  // Scroll-based opacity
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Smooth spring animations
  const smoothY = useSpring(backgroundY, { damping: 50, stiffness: 100 });
  const smoothParticlesY = useSpring(particlesY, { damping: 30, stiffness: 80 });
  
  // Animation controls for sections
  const { ref: statsRef, controls: statsControls, isInView: statsInView } = useScrollAnimation(0.2);
  const { ref: valuesRef, controls: valuesControls } = useScrollAnimation(0.1);
  const { ref: servicesRef, controls: servicesControls } = useScrollAnimation(0.1);
  const { ref: testimonialsRef, controls: testimonialsControls } = useScrollAnimation(0.1);
  const { ref: projectsRef, controls: projectsControls } = useScrollAnimation(0.1);
  const { ref: ctaRef, controls: ctaControls } = useScrollAnimation(0.2);

  const values = [
    {
      icon: '◆',
      title: 'Innovation Excellence',
      description: 'Pioneering cutting-edge solutions that drive industry transformation and set new standards for engineering excellence.',
      color: '#00c853'
    },
    {
      icon: '⬢',
      title: 'Reliability & Safety',
      description: 'Uncompromising commitment to safety and reliability in every project, ensuring maximum uptime and operational security.',
      color: '#FF6B6B'
    },
    {
      icon: '◈',
      title: 'Partnership Focus',
      description: 'Building long-term partnerships with clients through trust, transparency, and exceptional service delivery.',
      color: '#4ECDC4'
    },
    {
      icon: '▲',
      title: 'Sustainable Solutions',
      description: 'Developing environmentally conscious engineering solutions that balance performance with sustainability.',
      color: '#A78BFA'
    }
  ];

  const serviceHighlights = [
    {
      title: 'Digital Transformation',
      description: 'Revolutionizing industrial operations with AI, IoT, and advanced analytics for enhanced efficiency and productivity.',
      image: 'https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=2586&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      color: '#FFD93D'
    },
    {
      title: 'Process Engineering',
      description: 'Optimizing complex industrial processes through advanced engineering design and innovative automation solutions.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: '#FF8C42'
    },
    {
      title: 'System Integration',
      description: 'Seamlessly connecting diverse systems and technologies to create unified, efficient operational environments.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: '#6BCF7F'
    }
  ];

  const testimonials = [
    {
      text: "JDT Engineering transformed our power generation facility with their smart grid implementation. The 15% efficiency improvement exceeded our expectations.",
      author: "Sarah Chen",
      position: "Chief Operations Officer, PowerGen Malaysia",
      avatar: "SC",
      color: '#00e676'
    },
    {
      text: "Their refinery optimization project delivered outstanding results - 20% reduction in downtime and significant cost savings. Exceptional expertise.",
      author: "Ahmed Rahman",
      position: "Plant Manager, Petronas Refinery",
      avatar: "AR",
      color: '#FF6B6B'
    },
    {
      text: "The digital twin platform JDT developed gives us unprecedented visibility into our operations. A game-changer for predictive maintenance.",
      author: "David Kumar",
      position: "Engineering Director, Steel Dynamics",
      avatar: "DK",
      color: '#4ECDC4'
    }
  ];

  const featuredProjects = [
    {
      title: 'Smart Grid Integration',
      category: 'Power Generation',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: '#FFD93D'
    },
    {
      title: 'Refinery Optimization',
      category: 'Oil & Gas',
      image: 'https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      color: '#FF8C42'
    },
    {
      title: 'Manufacturing Automation',
      category: 'Heavy Industries',
      image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      color: '#6BCF7F'
    }
  ];

  const statData = [
    { number: 18, label: 'Years of Excellence', icon: '◇', color: '#00e676' },
    { number: 500, label: 'Projects Completed', icon: '⬣', color: '#FF6B6B' },
    { number: 100, label: 'Industry Partners', icon: '◈', color: '#4ECDC4' },
    { number: 99, label: 'Client Satisfaction', icon: '▲', color: '#A78BFA' }
  ];

  return (
    <HomeContainer ref={containerRef}>
      <HeroSection>
        <HeroBackground 
          style={{ 
            y: smoothY,
            scale: backgroundScale,
            opacity: heroOpacity
          }}
        />
        
        <FloatingParticles style={{ y: smoothParticlesY }}>
          {[...Array(9)].map((_, i) => (
            <motion.div 
              key={i} 
              className="particle"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0], 
                opacity: [0, 0.8, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </FloatingParticles>
        
        <HeroContent 
          style={{ y: heroContentY }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <HeroTitle variants={fadeInUp}>
            <motion.span 
              className="jdt"
              animate={floatAnimation}
              style={{
                rotateX: useTransform(
                  useMotionValue(mousePosition.y),
                  [0, window.innerHeight],
                  [5, -5]
                ),
                rotateY: useTransform(
                  useMotionValue(mousePosition.x),
                  [0, window.innerWidth],
                  [-5, 5]
                )
              }}
            >
              JDT
            </motion.span>
            <motion.span 
              className="engineering"
              variants={slideInRight}
            >
              ENGINEERING
            </motion.span>
          </HeroTitle>
          
          <HeroSubtitle variants={fadeInUp}>
            Pioneering digital solutions and engineering excellence since 2006. 
            Specializing in Power, Oil & Gas, and Heavy Industries for process optimization.
          </HeroSubtitle>
          
          <HeroButtons variants={fadeInUp}>
            <PrimaryButton
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 200, 83, 0.4)",
                rotateX: 5,
                rotateY: 5
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              Explore Services
            </PrimaryButton>
            <SecondaryButton
              whileHover={{ 
                scale: 1.05,
                rotateX: -5,
                rotateY: -5
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              View Projects
            </SecondaryButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <motion.div
          ref={statsRef}
          animate={statsControls}
          initial="hidden"
          variants={staggerContainer}
        >
          <StatsContainer>
            {statData.map((stat, index) => (
              <StatCard
                key={index}
                hoverColor={stat.color}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 8,
                  rotateY: index % 2 === 0 ? 5 : -5,
                  z: 50
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <StatIcon 
                  iconColor={stat.color}
                  whileHover={{ 
                    rotateY: 360,
                    scale: 1.3
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </StatIcon>
                <StatNumber 
                  numberColor={stat.color}
                  whileHover={{ 
                    scale: 1.2,
                    rotateX: 15
                  }}
                >
                  {statsInView && <AnimatedCounter end={stat.number} />}
                  {stat.label.includes('Satisfaction') ? '%' : '+'}
                </StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsContainer>
        </motion.div>
      </StatsSection>

      <ValuesSection>
        <motion.div
          ref={valuesRef}
          animate={valuesControls}
          initial="hidden"
          variants={staggerContainer}
        >
          <ValuesContainer>
            <SectionTitle variants={fadeInUp}>
              Our Core <span className="highlight">Values</span>
            </SectionTitle>
            
            <ValuesGrid>
              {values.map((value, index) => (
                <ValueCard
                  key={index}
                  hoverColor={value.color}
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.03,
                    rotateX: 10,
                    rotateY: index % 2 === 0 ? 8 : -8,
                    z: 50
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ValueIcon 
                    iconColor={value.color}
                    whileHover={{ 
                      rotateZ: 180,
                      scale: 1.4
                    }}
                    transition={{ duration: 0.8, type: "spring" }}
                  >
                    {value.icon}
                  </ValueIcon>
                  <ValueTitle titleColor={value.color}>{value.title}</ValueTitle>
                  <ValueDescription>{value.description}</ValueDescription>
                </ValueCard>
              ))}
            </ValuesGrid>
          </ValuesContainer>
        </motion.div>
      </ValuesSection>

      <ServicesHighlightSection>
        <motion.div
          ref={servicesRef}
          animate={servicesControls}
          initial="hidden"
          variants={staggerContainer}
        >
          <ValuesContainer>
            <SectionTitle variants={fadeInUp}>
              Service <span className="highlight">Excellence</span>
            </SectionTitle>
            
            <ServicesGrid>
              {serviceHighlights.map((service, index) => (
                <ServiceHighlightCard
                  key={index}
                  hoverColor={service.color}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    rotateX: 6,
                    rotateY: index % 2 === 0 ? 4 : -4,
                    z: 30
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ServiceImage imageUrl={service.image} />
                  <ServiceContent>
                    <ServiceTitle titleColor={service.color}>{service.title}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                    <LearnMoreButton
                      buttonColor={service.color}
                      whileHover={{ 
                        scale: 1.05,
                        rotateX: 10
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More →
                    </LearnMoreButton>
                  </ServiceContent>
                </ServiceHighlightCard>
              ))}
            </ServicesGrid>
          </ValuesContainer>
        </motion.div>
      </ServicesHighlightSection>

      <TestimonialsSection>
        <motion.div
          ref={testimonialsRef}
          animate={testimonialsControls}
          initial="hidden"
          variants={staggerContainer}
        >
          <ValuesContainer>
            <SectionTitle variants={fadeInUp}>
              Client <span className="highlight">Success Stories</span>
            </SectionTitle>
            
            <TestimonialsGrid>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  hoverColor={testimonial.color}
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  whileHover={{ 
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: index % 3 === 0 ? 3 : (index % 3 === 1 ? -3 : 0),
                    z: 40
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <TestimonialText>{testimonial.text}</TestimonialText>
                  <TestimonialAuthor>
                    <AuthorAvatar 
                      avatarColor={testimonial.color}
                      as={motion.div}
                      whileHover={{ 
                        scale: 1.2,
                        rotateY: 360
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {testimonial.avatar}
                    </AuthorAvatar>
                    <AuthorInfo infoColor={testimonial.color}>
                      <h4>{testimonial.author}</h4>
                      <p>{testimonial.position}</p>
                    </AuthorInfo>
                  </TestimonialAuthor>
                </TestimonialCard>
              ))}
            </TestimonialsGrid>
          </ValuesContainer>
        </motion.div>
      </TestimonialsSection>

      <ProjectShowcaseSection>
        <motion.div
          ref={projectsRef}
          animate={projectsControls}
          initial="hidden"
          variants={staggerContainer}
        >
          <ValuesContainer>
            <SectionTitle variants={fadeInUp}>
              Featured <span className="highlight">Projects</span>
            </SectionTitle>
            
            <ProjectsGrid>
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  hoverColor={project.color}
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.02,
                    rotateX: 8,
                    rotateY: index % 2 === 0 ? 6 : -6,
                    z: 50
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ProjectImage imageUrl={project.image} />
                  <ProjectContent>
                    <ProjectCategory 
                      categoryColor={project.color}
                      as={motion.span}
                      whileHover={{ 
                        scale: 1.1,
                        rotateX: 10
                      }}
                    >
                      {project.category}
                    </ProjectCategory>
                    <ProjectTitle titleColor={project.color}>{project.title}</ProjectTitle>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </ValuesContainer>
        </motion.div>
      </ProjectShowcaseSection>

      <CTASection>
        <motion.div
          ref={ctaRef}
          animate={ctaControls}
          initial="hidden"
          variants={fadeInUp}
        >
          <CTAContent>
            <motion.h2 
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                textShadow: "0 0 40px rgba(0, 200, 83, 0.6)"
              }}
            >
              Ready to Transform Your <span className="highlight">Operations?</span>
            </motion.h2>
            <motion.p variants={fadeInUp}>
              Partner with JDT Engineering for innovative solutions that drive efficiency, 
              enhance safety, and deliver measurable results. Let's build the future together.
            </motion.p>
            <CTAButtons>
              <PrimaryButton
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 200, 83, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                Start Your Project
              </PrimaryButton>
              <SecondaryButton
                whileHover={{ 
                  scale: 1.05,
                  rotateX: -5,
                  rotateY: -5
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                Schedule Consultation
              </SecondaryButton>
            </CTAButtons>
          </CTAContent>
        </motion.div>
      </CTASection>
    </HomeContainer>
  );
};

export default Home; 