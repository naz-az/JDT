import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ProductsServicesContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 2rem;
`;

const HeroSection = styled.section`
  padding: 3rem 2rem;
  text-align: center;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    ${props => props.theme.isDark 
      ? 'linear-gradient(rgba(12, 12, 12, 0.8), rgba(26, 26, 46, 0.9)), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
      : 'linear-gradient(rgba(245, 247, 250, 0.8), rgba(195, 207, 226, 0.9)), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
    };
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  z-index: 2;
  
  .highlight {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 20px ${props => props.theme.colors.glow}40;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
`;

const ServicesGrid = styled.section`
  padding: 5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const ServiceCard = styled(motion.div)<{ iconColor?: string }>`
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.iconColor || props.theme.colors.glow}20;
    border-color: ${props => props.iconColor || props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.iconColor || props.theme.colors.accent}10, transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ServiceImageContainer = styled.div<{ imageUrl: string }>`
  height: 250px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
  }
`;

const ServiceIconContainer = styled.div<{ iconColor?: string }>`
  position: relative;
  z-index: 2;
  width: 100px;
  height: 100px;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.iconColor || props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px ${props => props.iconColor || props.theme.colors.glow}30;
`;

const ServiceIcon = styled.div<{ iconColor?: string }>`
  font-size: 2.5rem;
  color: ${props => props.iconColor || props.theme.colors.accent};
  text-shadow: 0 0 20px ${props => props.iconColor || props.theme.colors.glow}40;
`;

const ServiceContent = styled.div`
  padding: 3rem 2rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.1rem;
`;

const ServiceFeatures = styled.ul<{ iconColor?: string }>`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  
  li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.95rem;
    padding: 0.8rem;
    background: ${props => props.theme.colors.background};
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.border};
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.iconColor || props.theme.colors.accent}10;
      border-color: ${props => props.iconColor || props.theme.colors.accent};
      transform: translateX(5px);
    }
    
    &::before {
      content: '⚡';
      color: ${props => props.iconColor || props.theme.colors.accent};
      font-size: 1.1rem;
      font-weight: bold;
      min-width: 20px;
    }
  }
`;

const ExploreButton = styled(motion.button)<{ iconColor?: string }>`
  background: linear-gradient(135deg, ${props => props.iconColor || props.theme.colors.accent}, ${props => props.iconColor || props.theme.colors.secondary});
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px ${props => props.iconColor || props.theme.colors.glow}40;
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

const CategoriesSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
`;

const CategoriesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  
  .highlight {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 20px ${props => props.theme.colors.glow}40;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  line-height: 1.6;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
`;

const CategoryCard = styled(motion.div)<{ iconColor?: string }>`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px ${props => props.iconColor || props.theme.colors.glow}15;
    border-color: ${props => props.iconColor || props.theme.colors.accent};
  }
`;

const CategoryImageContainer = styled.div<{ imageUrl: string }>`
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%);
  }
`;

const CategoryIconContainer = styled.div<{ iconColor?: string }>`
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.iconColor || props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px ${props => props.iconColor || props.theme.colors.glow}30;
`;

const CategoryContent = styled.div`
  padding: 2.5rem 2rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const CategoryDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
`;

const CategoryItems = styled.ul<{ iconColor?: string }>`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  
  li {
    color: ${props => props.theme.colors.textSecondary};
    padding: 0.8rem 1rem;
    background: ${props => props.theme.colors.surface};
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.border};
    font-size: 0.9rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.iconColor || props.theme.colors.accent}10;
      border-color: ${props => props.iconColor || props.theme.colors.accent};
      color: ${props => props.iconColor || props.theme.colors.accent};
    }
  }
`;

const TechnologiesSection = styled.section`
  padding: 5rem 2rem;
`;

const TechnologiesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TechItem = styled(motion.div)<{ iconColor?: string }>`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 2.5rem 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: ${props => props.iconColor || props.theme.colors.accent}10;
    border-color: ${props => props.iconColor || props.theme.colors.accent};
    transform: scale(1.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.iconColor || props.theme.colors.accent}05 0%, transparent 50%);
    animation: rotate 15s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const TechIconContainer = styled.div<{ iconColor?: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.iconColor || props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 25px ${props => props.iconColor || props.theme.colors.glow}25;
`;

const TechIcon = styled.div<{ iconColor?: string }>`
  font-size: 1.8rem;
  color: ${props => props.iconColor || props.theme.colors.accent};
  text-shadow: 0 0 15px ${props => props.iconColor || props.theme.colors.glow}30;
`;

const TechName = styled.div`
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  position: relative;
  z-index: 2;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)<{ iconColor?: string }>`
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.iconColor || props.theme.colors.accent};
  border-radius: 24px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div<{ imageUrl: string }>`
  height: 300px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 24px 24px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
    border-radius: 24px 24px 0 0;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ModalIconContainer = styled.div<{ iconColor?: string }>`
  position: relative;
  z-index: 2;
  width: 120px;
  height: 120px;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 3px solid ${props => props.iconColor || props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 40px ${props => props.iconColor || props.theme.colors.glow}40;
`;

const ModalIcon = styled.div<{ iconColor?: string }>`
  font-size: 3rem;
  color: ${props => props.iconColor || props.theme.colors.accent};
  text-shadow: 0 0 30px ${props => props.iconColor || props.theme.colors.glow}60;
`;

const ModalBody = styled.div`
  padding: 3rem;
`;

const ModalTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const ModalDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 3rem;
  text-align: center;
`;

const DetailedFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const DetailedFeature = styled(motion.div)<{ iconColor?: string }>`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.iconColor || props.theme.colors.accent};
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${props => props.iconColor || props.theme.colors.glow}20;
  }
`;

const FeatureIcon = styled.div<{ iconColor?: string }>`
  width: 50px;
  height: 50px;
  background: ${props => props.iconColor || props.theme.colors.accent}20;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.iconColor || props.theme.colors.accent};
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  font-size: 0.95rem;
`;

const BenefitsSection = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const BenefitsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const BenefitsList = styled.ul<{ iconColor?: string }>`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  
  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${props => props.theme.colors.textSecondary};
    padding: 1rem;
    background: ${props => props.theme.colors.background};
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.border};
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.iconColor || props.theme.colors.accent}10;
      border-color: ${props => props.iconColor || props.theme.colors.accent};
      transform: translateX(5px);
    }
    
    &::before {
      content: '✓';
      color: ${props => props.iconColor || props.theme.colors.accent};
      font-size: 1.2rem;
      font-weight: bold;
      min-width: 20px;
      text-align: center;
    }
  }
`;

const ProductsServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      title: 'Digital Solutions',
      description: 'Transform your operations with cutting-edge digital technologies that enhance efficiency, reduce costs, and drive innovation across all business processes.',
      image: 'https://images.unsplash.com/photo-1735825764452-7c77b0bbd7a7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      icon: '◈',
      iconColor: '#00c853',
      features: [
        'Custom Software Development',
        'Digital Twin Technology',
        'Cloud Migration Services'
      ],
      detailedFeatures: [
        {
          icon: '💻',
          title: 'Custom Software Development',
          description: 'Bespoke software solutions tailored to your specific business needs, built with modern technologies and scalable architecture.'
        },
        {
          icon: '🔄',
          title: 'Digital Twin Technology',
          description: 'Real-time digital replicas of physical systems enabling predictive maintenance, optimization, and advanced analytics.'
        },
        {
          icon: '☁️',
          title: 'Cloud Migration Services',
          description: 'Seamless transition to cloud infrastructure with enhanced security, scalability, and cost optimization strategies.'
        },
        {
          icon: '📊',
          title: 'Data Analytics & Visualization',
          description: 'Advanced data processing and visualization tools that transform raw data into actionable business insights.'
        },
        {
          icon: '🌐',
          title: 'IoT Integration Solutions',
          description: 'Connect and manage IoT devices with secure, scalable platforms for real-time monitoring and control.'
        },
        {
          icon: '⚡',
          title: 'Process Automation',
          description: 'Streamline operations through intelligent automation that reduces manual work and improves accuracy.'
        }
      ],
      benefits: [
        'Reduced operational costs by up to 40%',
        'Improved system reliability and uptime',
        'Enhanced data-driven decision making',
        'Faster time-to-market for new initiatives',
        'Scalable infrastructure for future growth',
        'Compliance with industry standards'
      ]
    },
    {
      title: 'Engineering Services',
      description: 'Comprehensive engineering solutions designed to optimize performance, ensure reliability, and deliver sustainable results in critical industrial applications.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '⬢',
      iconColor: '#FF6B6B',
      features: [
        'Process Engineering & Design',
        'Equipment Optimization',
        'Performance Analysis'
      ],
      detailedFeatures: [
        {
          icon: '🔧',
          title: 'Process Engineering & Design',
          description: 'Comprehensive process design and optimization services that improve efficiency and reduce environmental impact.'
        },
        {
          icon: '⚙️',
          title: 'Equipment Optimization',
          description: 'Advanced equipment performance tuning and lifecycle management to maximize operational efficiency.'
        },
        {
          icon: '📈',
          title: 'Performance Analysis',
          description: 'In-depth analysis of system performance with actionable recommendations for continuous improvement.'
        },
        {
          icon: '🛡️',
          title: 'Safety Systems Design',
          description: 'Robust safety system implementation ensuring compliance with international safety standards.'
        },
        {
          icon: '🔄',
          title: 'Maintenance Solutions',
          description: 'Predictive and preventive maintenance strategies that reduce downtime and extend equipment life.'
        },
        {
          icon: '📊',
          title: 'Efficiency Enhancement',
          description: 'Systematic approach to identifying and implementing efficiency improvements across all operations.'
        }
      ],
      benefits: [
        'Increased equipment efficiency by 25-35%',
        'Reduced maintenance costs and downtime',
        'Enhanced safety and compliance',
        'Extended equipment lifespan',
        'Optimized energy consumption',
        'Improved process reliability'
      ]
    },
    {
      title: 'System Integration',
      description: 'Seamless integration of complex systems creating unified, efficient operations that maximize productivity while minimizing operational complexity.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '⬣',
      iconColor: '#4ECDC4',
      features: [
        'SCADA Systems',
        'PLC Programming',
        'HMI Development'
      ],
      detailedFeatures: [
        {
          icon: '🖥️',
          title: 'SCADA Systems',
          description: 'Sophisticated supervisory control and data acquisition systems for comprehensive industrial monitoring.'
        },
        {
          icon: '🔌',
          title: 'PLC Programming',
          description: 'Expert programmable logic controller programming for automated industrial control systems.'
        },
        {
          icon: '📱',
          title: 'HMI Development',
          description: 'Intuitive human-machine interfaces that provide operators with clear, actionable system information.'
        },
        {
          icon: '🌐',
          title: 'Network Integration',
          description: 'Secure and reliable network infrastructure design for seamless system communication.'
        },
        {
          icon: '🔄',
          title: 'Legacy System Modernization',
          description: 'Upgrade and integrate legacy systems with modern technologies while preserving existing investments.'
        },
        {
          icon: '📡',
          title: 'Real-time Monitoring',
          description: 'Advanced monitoring solutions providing real-time visibility into all critical system parameters.'
        }
      ],
      benefits: [
        'Unified system operation and control',
        'Improved operational visibility',
        'Reduced system complexity',
        'Enhanced cybersecurity measures',
        'Streamlined maintenance procedures',
        'Better regulatory compliance'
      ]
    },
    {
      title: 'Advanced Technologies',
      description: 'Implementation of cutting-edge technologies including AI, machine learning, and predictive analytics that drive innovation and competitive advantage.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '◆',
      iconColor: '#A78BFA',
      features: [
        'Artificial Intelligence',
        'Machine Learning Algorithms',
        'Predictive Analytics'
      ],
      detailedFeatures: [
        {
          icon: '🤖',
          title: 'Artificial Intelligence',
          description: 'Advanced AI solutions that automate complex decision-making and optimize industrial processes.'
        },
        {
          icon: '🧠',
          title: 'Machine Learning Algorithms',
          description: 'Custom ML models that learn from operational data to improve performance and predict outcomes.'
        },
        {
          icon: '🔮',
          title: 'Predictive Analytics',
          description: 'Sophisticated analytics platforms that forecast equipment failures and optimize maintenance schedules.'
        },
        {
          icon: '⚡',
          title: 'Automation Solutions',
          description: 'Intelligent automation systems that adapt and optimize operations in real-time.'
        },
        {
          icon: '👥',
          title: 'Digital Twin Platforms',
          description: 'Advanced digital twin implementations for virtual testing and optimization of physical systems.'
        },
        {
          icon: '📊',
          title: 'Smart Monitoring Systems',
          description: 'Intelligent monitoring solutions with self-learning capabilities and automated alerting.'
        }
      ],
      benefits: [
        'Predictive maintenance reduces downtime by 50%',
        'AI-driven optimization improves efficiency',
        'Advanced analytics enable proactive decisions',
        'Automated quality control systems',
        'Real-time performance optimization',
        'Competitive advantage through innovation'
      ]
    }
  ];

  const industries = [
    {
      title: 'Power Generation',
      description: 'Comprehensive solutions for power plants, renewable energy systems, and electrical infrastructure with focus on efficiency and sustainability.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '▲',
      iconColor: '#FFD93D',
      items: ['Thermal Power Plants', 'Renewable Energy Systems', 'Smart Grid Integration', 'Power Distribution Networks', 'Energy Storage Solutions', 'Grid Optimization']
    },
    {
      title: 'Oil & Gas',
      description: 'Specialized engineering services for upstream, midstream, and downstream operations with emphasis on safety and operational excellence.',
      image: 'https://plus.unsplash.com/premium_photo-1682144333631-eac578433ea1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      icon: '●',
      iconColor: '#FF8C42',
      items: ['Refinery Operations', 'Pipeline Systems', 'Offshore Platforms', 'Process Optimization', 'Safety Systems', 'Environmental Compliance']
    },
    {
      title: 'Heavy Industries',
      description: 'Industrial automation and optimization solutions for manufacturing and processing facilities that enhance productivity and quality.',
      image: 'https://images.unsplash.com/photo-1565866926760-213f0b57e8b6?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      icon: '▣',
      iconColor: '#6BCF7F',
      items: ['Manufacturing Automation', 'Process Control Systems', 'Quality Management', 'Equipment Monitoring', 'Production Optimization', 'Robotics Integration']
    }
  ];

  const technologies = [
    { icon: '◉', name: 'AI/ML', color: '#A78BFA' },
    { icon: '◎', name: 'Cloud Computing', color: '#00e676' },
    { icon: '▦', name: 'Big Data Analytics', color: '#FF6B6B' },
    { icon: '◈', name: 'IoT Solutions', color: '#4ECDC4' },
    { icon: '⬢', name: 'Cybersecurity', color: '#FF8C42' },
    { icon: '◆', name: 'Mobile Platforms', color: '#6BCF7F' },
    { icon: '▲', name: 'Automation', color: '#FFD93D' },
    { icon: '⬣', name: 'Digital Twins', color: '#F472B6' },
    { icon: '◉', name: 'Edge Computing', color: '#34D399' },
    { icon: '▣', name: 'Blockchain', color: '#FBBF24' },
    { icon: '◎', name: 'SCADA Systems', color: '#8B5CF6' },
    { icon: '◈', name: '5G Connectivity', color: '#EC4899' }
  ];

  const closeModal = () => setSelectedService(null);

  return (
    <ProductsServicesContainer>
      <HeroSection>
        <HeroBackground />
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Products & <span className="highlight">Services</span>
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Comprehensive engineering solutions tailored for Power, Oil & Gas, and Heavy Industries. 
          We deliver cutting-edge technology and expertise to optimize your operations and drive sustainable growth.
        </HeroSubtitle>
      </HeroSection>

      <ServicesGrid>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Core <span className="highlight">Services</span>
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Innovative solutions that transform industrial operations and drive measurable results across all sectors.
        </SectionSubtitle>
        
        <ServicesContainer>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              iconColor={service.iconColor}
              onClick={() => setSelectedService(index)}
              style={{ cursor: 'pointer' }}
            >
              <ServiceImageContainer imageUrl={service.image}>
                <ServiceIconContainer iconColor={service.iconColor}>
                  <ServiceIcon iconColor={service.iconColor}>{service.icon}</ServiceIcon>
                </ServiceIconContainer>
              </ServiceImageContainer>
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceFeatures iconColor={service.iconColor}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ServiceFeatures>
                <ExploreButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  iconColor={service.iconColor}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(index);
                  }}
                >
                  Explore {service.title} →
                </ExploreButton>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesContainer>
      </ServicesGrid>

      {/* Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              iconColor={services[selectedService].iconColor}
            >
              <ModalHeader imageUrl={services[selectedService].image}>
                <CloseButton
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </CloseButton>
                <ModalIconContainer iconColor={services[selectedService].iconColor}>
                  <ModalIcon iconColor={services[selectedService].iconColor}>
                    {services[selectedService].icon}
                  </ModalIcon>
                </ModalIconContainer>
              </ModalHeader>
              
              <ModalBody>
                <ModalTitle>{services[selectedService].title}</ModalTitle>
                <ModalDescription>{services[selectedService].description}</ModalDescription>
                
                <DetailedFeaturesGrid>
                  {services[selectedService].detailedFeatures.map((feature, idx) => (
                    <DetailedFeature
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      iconColor={services[selectedService].iconColor}
                    >
                      <FeatureIcon iconColor={services[selectedService].iconColor}>
                        {feature.icon}
                      </FeatureIcon>
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                    </DetailedFeature>
                  ))}
                </DetailedFeaturesGrid>
                
                <BenefitsSection>
                  <BenefitsTitle>Key Benefits</BenefitsTitle>
                  <BenefitsList iconColor={services[selectedService].iconColor}>
                    {services[selectedService].benefits.map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        {benefit}
                      </motion.li>
                    ))}
                  </BenefitsList>
                </BenefitsSection>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <CategoriesSection>
        <CategoriesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Industry <span className="highlight">Expertise</span>
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Deep domain knowledge and proven track record across critical infrastructure sectors.
          </SectionSubtitle>
          
          <CategoriesGrid>
            {industries.map((industry, index) => (
              <CategoryCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                iconColor={industry.iconColor}
              >
                <CategoryImageContainer imageUrl={industry.image}>
                  <CategoryIconContainer iconColor={industry.iconColor}>
                    <ServiceIcon iconColor={industry.iconColor}>{industry.icon}</ServiceIcon>
                  </CategoryIconContainer>
                </CategoryImageContainer>
                <CategoryContent>
                  <CategoryTitle>{industry.title}</CategoryTitle>
                  <CategoryDescription>{industry.description}</CategoryDescription>
                  <CategoryItems iconColor={industry.iconColor}>
                    {industry.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </CategoryItems>
                </CategoryContent>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </CategoriesContainer>
      </CategoriesSection>

      <TechnologiesSection>
        <TechnologiesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technology <span className="highlight">Stack</span>
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cutting-edge technologies that power our innovative solutions and drive digital transformation.
          </SectionSubtitle>
          
          <TechGrid>
            {technologies.map((tech, index) => (
              <TechItem
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                iconColor={tech.color}
              >
                <TechIconContainer iconColor={tech.color}>
                  <TechIcon iconColor={tech.color}>{tech.icon}</TechIcon>
                </TechIconContainer>
                <TechName>{tech.name}</TechName>
              </TechItem>
            ))}
          </TechGrid>
        </TechnologiesContainer>
      </TechnologiesSection>
    </ProductsServicesContainer>
  );
};

export default ProductsServices; 