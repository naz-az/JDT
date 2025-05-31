import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PastProjectsContainer = styled.div`
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
      ? 'linear-gradient(rgba(12, 12, 12, 0.8), rgba(26, 26, 46, 0.9)), url("https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'
      : 'linear-gradient(rgba(245, 247, 250, 0.8), rgba(195, 207, 226, 0.9)), url("https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'
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

const FilterSection = styled.section`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active 
    ? `linear-gradient(135deg, ${props.theme.colors.accent}, ${props.theme.colors.secondary})`
    : props.theme.colors.surface};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? 'transparent' : props.theme.colors.border};
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px ${props => props.theme.colors.glow}30;
    border-color: ${props => props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.accent}20, transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

const ProjectCard = styled(motion.div)<{ accentColor?: string }>`
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.accentColor || props.theme.colors.glow}25;
    border-color: ${props => props.accentColor || props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.accentColor || props.theme.colors.accent}10, transparent);
    transition: left 0.5s;
    z-index: 1;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ProjectImage = styled.div<{ imageUrl: string }>`
  height: 250px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
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

const ProjectIconContainer = styled.div<{ accentColor?: string }>`
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.accentColor || props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px ${props => props.accentColor || props.theme.colors.glow}30;
  font-size: 2rem;
  color: ${props => props.accentColor || props.theme.colors.accent};
  text-shadow: 0 0 15px ${props => props.accentColor || props.theme.colors.glow}40;
`;

const ProjectContent = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const ProjectCategory = styled.span<{ accentColor?: string }>`
  background: ${props => props.accentColor || props.theme.colors.accent}20;
  color: ${props => props.accentColor || props.theme.colors.accent};
  padding: 0.3rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProjectMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
`;

// const MetaItem = styled.div`
//   text-align: center;
  
//   .label {
//     font-size: 0.8rem;
//     color: ${props => props.theme.colors.textSecondary};
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//     margin-bottom: 0.3rem;
//   }
  
//   .value {
//     font-weight: 700;
//     color: ${props => props.theme.colors.text};
//     font-size: 0.9rem;
//   }
// `;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.span<{ accentColor?: string }>`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.accentColor || props.theme.colors.accent}10;
    border-color: ${props => props.accentColor || props.theme.colors.accent};
    color: ${props => props.accentColor || props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const ViewDetailsButton = styled(motion.button)<{ accentColor?: string }>`
  background: linear-gradient(135deg, ${props => props.accentColor || props.theme.colors.accent}, ${props => props.accentColor || props.theme.colors.secondary});
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px ${props => props.accentColor || props.theme.colors.glow}40;
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

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)<{ accentColor?: string }>`
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.accentColor || props.theme.colors.accent};
  border-radius: 24px;
  max-width: 1000px;
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

const ModalIconContainer = styled.div<{ accentColor?: string }>`
  position: relative;
  z-index: 2;
  width: 120px;
  height: 120px;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 3px solid ${props => props.accentColor || props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 40px ${props => props.accentColor || props.theme.colors.glow}40;
`;

const ModalIcon = styled.div<{ accentColor?: string }>`
  font-size: 3rem;
  color: ${props => props.accentColor || props.theme.colors.accent};
  text-shadow: 0 0 30px ${props => props.accentColor || props.theme.colors.glow}60;
`;

const ModalBody = styled.div`
  padding: 3rem;
`;

const ModalTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  line-height: 1.2;
`;

const ModalMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const MetaItem = styled.div<{ accentColor?: string }>`
  text-align: center;
  
  .label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-weight: 700;
    color: ${props => props.accentColor || props.theme.colors.accent};
    font-size: 1.1rem;
    background: ${props => props.accentColor || props.theme.colors.accent}15;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    display: inline-block;
  }
`;

const ModalDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 3rem;
  text-align: center;
`;

const ProjectDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const DetailSection = styled(motion.div)<{ accentColor?: string }>`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.accentColor || props.theme.colors.accent};
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${props => props.accentColor || props.theme.colors.glow}20;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionIcon = styled.span<{ accentColor?: string }>`
  font-size: 1.5rem;
  color: ${props => props.accentColor || props.theme.colors.accent};
`;

const DetailList = styled.ul<{ accentColor?: string }>`
  list-style: none;
  padding: 0;
  
  li {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0.8rem;
    padding: 0.8rem;
    background: ${props => props.theme.colors.surface};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.border};
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.accentColor || props.theme.colors.accent}10;
      border-color: ${props => props.accentColor || props.theme.colors.accent};
      transform: translateX(5px);
    }
    
    &::before {
      content: '▪';
      color: ${props => props.accentColor || props.theme.colors.accent};
      font-weight: bold;
      margin-right: 0.8rem;
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const TechItem = styled.span<{ accentColor?: string }>`
  background: ${props => props.accentColor || props.theme.colors.accent}15;
  color: ${props => props.accentColor || props.theme.colors.accent};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid ${props => props.accentColor || props.theme.colors.accent}30;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.accentColor || props.theme.colors.accent}25;
    transform: translateY(-2px);
  }
`;

const OutcomesSection = styled.div<{ accentColor?: string }>`
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${props => props.accentColor || props.theme.colors.accent}30;
`;

const OutcomesTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const OutcomesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const OutcomeItem = styled(motion.div)<{ accentColor?: string }>`
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
    background: ${props => props.accentColor || props.theme.colors.accent}10;
    border-color: ${props => props.accentColor || props.theme.colors.accent};
    transform: translateX(5px);
  }
  
  &::before {
    content: '✓';
    color: ${props => props.accentColor || props.theme.colors.accent};
    font-size: 1.2rem;
    font-weight: bold;
    min-width: 20px;
    text-align: center;
  }
`;

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  tags: string[];
  technologies: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  icon: string;
  imageUrl: string;
  accentColor: string;
  duration: string;
  year: string;
  value: string;
  client: string;
  teamSize: string;
}

const PastProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = ['All', 'Power Generation', 'Oil & Gas', 'Heavy Industries', 'Digital Solutions'];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Smart Grid Integration System',
      category: 'Power Generation',
      description: 'Advanced smart grid implementation for a major power distribution network, enabling real-time monitoring and automated load balancing across multiple substations.',
      fullDescription: 'This comprehensive smart grid project revolutionized power distribution across three major substations serving over 200,000 customers. The implementation included advanced metering infrastructure, distribution automation, and real-time grid monitoring systems.',
      tags: ['IoT', 'Smart Grid', 'Automation', 'Analytics', 'Real-time Monitoring'],
      technologies: ['SCADA Systems', 'IoT Sensors', 'Machine Learning', 'Cloud Computing', 'Cybersecurity'],
      challenges: [
        'Integration with legacy infrastructure',
        'Ensuring zero downtime during deployment',
        'Managing complex communication protocols',
        'Implementing robust cybersecurity measures'
      ],
      solutions: [
        'Phased deployment approach with redundancy',
        'Advanced protocol converters and gateways',
        'Multi-layered security architecture',
        'Comprehensive testing and validation procedures'
      ],
      outcomes: [
        '40% reduction in power outages',
        '25% improvement in grid efficiency',
        '60% faster fault detection and isolation',
        '15% reduction in operational costs'
      ],
      icon: '▲',
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#FFD93D',
      duration: '18 months',
      year: '2023',
      value: '$2.5M',
      client: 'Regional Power Utility',
      teamSize: '25 engineers'
    },
    {
      id: 2,
      title: 'Refinery Process Optimization',
      category: 'Oil & Gas',
      description: 'Complete digital transformation of refinery operations with AI-powered predictive maintenance and process optimization, resulting in significant efficiency gains.',
      fullDescription: 'A comprehensive digital transformation project for a 150,000 barrel-per-day refinery, implementing AI-driven optimization and predictive maintenance systems across all major processing units.',
      tags: ['AI', 'Predictive Maintenance', 'Process Control', 'SCADA', 'Digital Transformation'],
      technologies: ['AI/ML Algorithms', 'Digital Twin', 'Advanced Process Control', 'Real-time Analytics', 'Cloud Platform'],
      challenges: [
        'Complex process interdependencies',
        'Maintaining safety during upgrades',
        'Data integration from multiple systems',
        'Training operational staff on new technologies'
      ],
      solutions: [
        'Modular implementation with extensive testing',
        'Advanced safety interlocks and monitoring',
        'Unified data platform with real-time processing',
        'Comprehensive training and support programs'
      ],
      outcomes: [
        '12% increase in overall efficiency',
        '25% reduction in unplanned downtime',
        '8% improvement in product yield',
        '30% reduction in maintenance costs'
      ],
      icon: '●',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#FF8C42',
      duration: '24 months',
      year: '2022',
      value: '$4.2M',
      client: 'Major Oil Refinery',
      teamSize: '35 engineers'
    },
    {
      id: 3,
      title: 'Manufacturing Automation Suite',
      category: 'Heavy Industries',
      description: 'Comprehensive automation solution for steel manufacturing plant, including robotic systems, quality control, and integrated safety systems.',
      fullDescription: 'Complete automation overhaul of a steel manufacturing facility, implementing robotics, advanced quality control systems, and integrated safety protocols to maximize efficiency and ensure worker safety.',
      tags: ['Robotics', 'Quality Control', 'ERP Integration', 'Safety Systems', 'Manufacturing'],
      technologies: ['Industrial Robotics', 'Vision Systems', 'ERP Integration', 'Safety PLCs', 'MES Systems'],
      challenges: [
        'Harsh industrial environment',
        'Complex material handling requirements',
        'Integration with existing ERP systems',
        'Ensuring worker safety during automation'
      ],
      solutions: [
        'Ruggedized equipment with environmental protection',
        'Advanced robotic material handling systems',
        'Seamless ERP integration with real-time data sync',
        'Comprehensive safety systems with failsafe mechanisms'
      ],
      outcomes: [
        '35% increase in production efficiency',
        '50% reduction in quality defects',
        '20% decrease in material waste',
        '60% improvement in safety metrics'
      ],
      icon: '▣',
      imageUrl: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#6BCF7F',
      duration: '15 months',
      year: '2023',
      value: '$3.8M',
      client: 'Steel Manufacturing Corp',
      teamSize: '28 engineers'
    },
    {
      id: 4,
      title: 'Digital Twin Platform',
      category: 'Digital Solutions',
      description: 'Advanced digital twin implementation for real-time asset monitoring and predictive analytics across multiple facilities with cloud-based architecture.',
      fullDescription: 'Development and deployment of a comprehensive digital twin platform enabling real-time monitoring, predictive analytics, and virtual testing across multiple industrial facilities.',
      tags: ['Digital Twin', 'IoT', 'Machine Learning', 'Cloud Platform', 'Analytics'],
      technologies: ['IoT Platform', 'Machine Learning', 'Cloud Computing', '3D Modeling', 'Real-time Analytics'],
      challenges: [
        'Complex data integration from multiple sources',
        'Real-time processing requirements',
        'Scalable cloud architecture design',
        'Accurate virtual modeling of physical assets'
      ],
      solutions: [
        'Advanced data orchestration platform',
        'Edge computing for real-time processing',
        'Microservices architecture with auto-scaling',
        'High-fidelity 3D modeling with physics simulation'
      ],
      outcomes: [
        '30% improvement in asset utilization',
        '45% reduction in maintenance costs',
        '20% increase in operational efficiency',
        '50% faster decision-making processes'
      ],
      icon: '◈',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#00e676',
      duration: '12 months',
      year: '2023',
      value: '$1.9M',
      client: 'Multi-facility Corporation',
      teamSize: '20 engineers'
    },
    {
      id: 5,
      title: 'Power Plant Efficiency Enhancement',
      category: 'Power Generation',
      description: 'Modernization of thermal power plant control systems with advanced combustion optimization and emission reduction technologies.',
      fullDescription: 'Comprehensive modernization of a 500MW thermal power plant, implementing advanced control systems, combustion optimization, and emission reduction technologies to improve efficiency and environmental compliance.',
      tags: ['Control Systems', 'Combustion Optimization', 'Emissions Control', 'Efficiency', 'Thermal Power'],
      technologies: ['Advanced Process Control', 'Combustion Analytics', 'Emission Monitoring', 'SCADA Systems', 'Optimization Algorithms'],
      challenges: [
        'Aging infrastructure and equipment',
        'Strict environmental compliance requirements',
        'Maintaining power generation during upgrades',
        'Complex combustion optimization requirements'
      ],
      solutions: [
        'Phased upgrade approach with temporary redundancy',
        'Advanced emission monitoring and control systems',
        'Hot-swappable control systems for minimal downtime',
        'AI-driven combustion optimization algorithms'
      ],
      outcomes: [
        '15% improvement in thermal efficiency',
        '30% reduction in harmful emissions',
        '20% decrease in fuel consumption',
        '25% improvement in plant availability'
      ],
      icon: '▲',
      imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#FFD93D',
      duration: '20 months',
      year: '2022',
      value: '$5.1M',
      client: 'National Power Company',
      teamSize: '40 engineers'
    },
    {
      id: 6,
      title: 'Offshore Platform Automation',
      category: 'Oil & Gas',
      description: 'Complete automation and safety system upgrade for offshore drilling platform, including emergency response systems and environmental monitoring.',
      fullDescription: 'Comprehensive automation and safety system upgrade for a major offshore drilling platform, implementing advanced emergency response systems, environmental monitoring, and process automation.',
      tags: ['Safety Systems', 'Offshore Technology', 'Emergency Response', 'Process Safety', 'Environmental'],
      technologies: ['Safety Instrumented Systems', 'Emergency Shutdown Systems', 'Environmental Monitoring', 'Process Automation', 'Communication Systems'],
      challenges: [
        'Harsh offshore environment',
        'Critical safety requirements',
        'Remote location logistics',
        'Integration with existing platform systems'
      ],
      solutions: [
        'Marine-grade equipment with corrosion protection',
        'Redundant safety systems with SIL-3 certification',
        'Modular design for efficient offshore installation',
        'Comprehensive integration testing and validation'
      ],
      outcomes: [
        '70% improvement in safety response times',
        'Zero safety incidents since commissioning',
        '50% reduction in false alarm rates',
        '40% improvement in environmental compliance'
      ],
      icon: '●',
      imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#FF8C42',
      duration: '22 months',
      year: '2021',
      value: '$6.3M',
      client: 'Offshore Oil Company',
      teamSize: '32 engineers'
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const closeModal = () => setSelectedProject(null);

  return (
    <PastProjectsContainer>
      <HeroSection>
        <HeroBackground />
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Past <span className="highlight">Projects</span>
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore our portfolio of successful engineering projects across Power, Oil & Gas, 
          and Heavy Industries. Each project showcases our commitment to innovation and excellence.
        </HeroSubtitle>
      </HeroSection>

      <FilterSection>
        <FilterButtons>
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </FilterButton>
          ))}
        </FilterButtons>

        <ProjectsGrid>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                accentColor={project.accentColor}
                onClick={() => setSelectedProject(project.id)}
                style={{ cursor: 'pointer' }}
              >
                <ProjectImage imageUrl={project.imageUrl}>
                  <ProjectIconContainer accentColor={project.accentColor}>
                    {project.icon}
                  </ProjectIconContainer>
                </ProjectImage>
                <ProjectContent>
                  <ProjectCategory accentColor={project.accentColor}>
                    {project.category}
                  </ProjectCategory>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <ProjectMeta>
                    <MetaItem>
                      <div className="label">Duration</div>
                      <div className="value">{project.duration}</div>
                    </MetaItem>
                    <MetaItem>
                      <div className="label">Year</div>
                      <div className="value">{project.year}</div>
                    </MetaItem>
                    <MetaItem>
                      <div className="label">Value</div>
                      <div className="value">{project.value}</div>
                    </MetaItem>
                  </ProjectMeta>
                  
                  <ProjectTags>
                    {project.tags.map((tag, idx) => (
                      <ProjectTag key={idx} accentColor={project.accentColor}>
                        {tag}
                      </ProjectTag>
                    ))}
                  </ProjectTags>
                  
                  <ViewDetailsButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    accentColor={project.accentColor}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project.id);
                    }}
                  >
                    View Project Details →
                  </ViewDetailsButton>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </FilterSection>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject !== null && (() => {
          const project = projects.find(item => item.id === selectedProject);
          if (!project) return null;
          
          return (
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
                accentColor={project.accentColor}
              >
                <ModalHeader imageUrl={project.imageUrl}>
                  <CloseButton
                    onClick={closeModal}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </CloseButton>
                  <ModalIconContainer accentColor={project.accentColor}>
                    <ModalIcon accentColor={project.accentColor}>
                      {project.icon}
                    </ModalIcon>
                  </ModalIconContainer>
                </ModalHeader>
                
                <ModalBody>
                  <ModalTitle>{project.title}</ModalTitle>
                  
                  <ModalMeta>
                    <MetaItem accentColor={project.accentColor}>
                      <div className="label">Client</div>
                      <div className="value">{project.client}</div>
                    </MetaItem>
                    <MetaItem accentColor={project.accentColor}>
                      <div className="label">Duration</div>
                      <div className="value">{project.duration}</div>
                    </MetaItem>
                    <MetaItem accentColor={project.accentColor}>
                      <div className="label">Project Value</div>
                      <div className="value">{project.value}</div>
                    </MetaItem>
                    <MetaItem accentColor={project.accentColor}>
                      <div className="label">Team Size</div>
                      <div className="value">{project.teamSize}</div>
                    </MetaItem>
                  </ModalMeta>
                  
                  <ModalDescription>{project.fullDescription}</ModalDescription>
                  
                  <TechStack>
                    {project.technologies.map((tech, idx) => (
                      <TechItem key={idx} accentColor={project.accentColor}>
                        {tech}
                      </TechItem>
                    ))}
                  </TechStack>
                  
                  <ProjectDetailsGrid>
                    <DetailSection
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      accentColor={project.accentColor}
                    >
                      <SectionTitle>
                        <SectionIcon accentColor={project.accentColor}>🎯</SectionIcon>
                        Challenges
                      </SectionTitle>
                      <DetailList accentColor={project.accentColor}>
                        {project.challenges.map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </DetailList>
                    </DetailSection>
                    
                    <DetailSection
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      accentColor={project.accentColor}
                    >
                      <SectionTitle>
                        <SectionIcon accentColor={project.accentColor}>💡</SectionIcon>
                        Solutions
                      </SectionTitle>
                      <DetailList accentColor={project.accentColor}>
                        {project.solutions.map((solution, idx) => (
                          <li key={idx}>{solution}</li>
                        ))}
                      </DetailList>
                    </DetailSection>
                  </ProjectDetailsGrid>
                  
                  <OutcomesSection accentColor={project.accentColor}>
                    <OutcomesTitle>Project Outcomes</OutcomesTitle>
                    <OutcomesList>
                      {project.outcomes.map((outcome, idx) => (
                        <OutcomeItem
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          accentColor={project.accentColor}
                        >
                          {outcome}
                        </OutcomeItem>
                      ))}
                    </OutcomesList>
                  </OutcomesSection>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          );
        })()}
      </AnimatePresence>
    </PastProjectsContainer>
  );
};

export default PastProjects; 