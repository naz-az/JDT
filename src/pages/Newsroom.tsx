import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NewsroomContainer = styled.div`
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
      ? 'linear-gradient(rgba(12, 12, 12, 0.8), rgba(26, 26, 46, 0.9)), url("https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
      : 'linear-gradient(rgba(245, 247, 250, 0.8), rgba(195, 207, 226, 0.9)), url("https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
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

const NewsSection = styled.section`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const CategoryTab = styled(motion.button)<{ active: boolean }>`
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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

const NewsCard = styled(motion.article)<{ accentColor?: string }>`
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

const NewsImage = styled.div<{ imageUrl: string }>`
  height: 220px;
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

const NewsIconContainer = styled.div<{ accentColor?: string }>`
  position: relative;
  z-index: 2;
  width: 70px;
  height: 70px;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.accentColor || props.theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px ${props => props.accentColor || props.theme.colors.glow}30;
  font-size: 1.8rem;
  color: ${props => props.accentColor || props.theme.colors.accent};
  text-shadow: 0 0 15px ${props => props.accentColor || props.theme.colors.glow}40;
`;

const NewsContent = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const NewsCategory = styled.span<{ accentColor?: string }>`
  background: ${props => props.accentColor || props.theme.colors.accent}20;
  color: ${props => props.accentColor || props.theme.colors.accent};
  padding: 0.3rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NewsDate = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const NewsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
`;

const NewsExcerpt = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled(motion.button)<{ accentColor?: string }>`
  background: linear-gradient(135deg, ${props => props.accentColor || props.theme.colors.accent}, ${props => props.accentColor || props.theme.colors.secondary});
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  
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

const FeaturedNews = styled.section`
  padding: 3rem 2rem;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.theme.colors.accent}05 0%, transparent 50%);
    animation: rotate 20s linear infinite;
    opacity: 0.5;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FeaturedContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeaturedContent = styled(motion.div)`
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
    
    .highlight {
      color: ${props => props.theme.colors.accent};
      text-shadow: 0 0 20px ${props => props.theme.colors.glow}40;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 1.5rem;
  }
`;

const FeaturedVisual = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.theme.colors.accent}10 0%, transparent 50%);
    animation: rotate 15s linear infinite;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FeaturedButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px ${props => props.theme.colors.glow}40;
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
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div<{ accentColor?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.background};
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.border};
  
  .label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-right: 0.5rem;
  }
  
  .value {
    font-weight: 600;
    color: ${props => props.accentColor || props.theme.colors.accent};
    background: ${props => props.accentColor || props.theme.colors.accent}15;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const ModalDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 3rem;
  text-align: center;
`;

const FullContentSection = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

const ContentTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const ContentText = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.8;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    
    li {
      margin-bottom: 0.8rem;
      list-style-type: disc;
    }
  }
`;

const RelatedSection = styled.div<{ accentColor?: string }>`
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${props => props.accentColor || props.theme.colors.accent}30;
`;

const RelatedTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const RelatedList = styled.ul<{ accentColor?: string }>`
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
      background: ${props => props.accentColor || props.theme.colors.accent}10;
      border-color: ${props => props.accentColor || props.theme.colors.accent};
      transform: translateX(5px);
    }
    
    &::before {
      content: '📰';
      font-size: 1.2rem;
      min-width: 20px;
      text-align: center;
    }
  }
`;

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  fullContent: string;
  relatedTopics: string[];
  icon: string;
  imageUrl: string;
  accentColor: string;
}

const Newsroom: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedNews, setSelectedNews] = useState<number | null>(null);

  const categories = ['All', 'Company News', 'Project Updates', 'Technology', 'Awards', 'Industry Insights'];

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'JDT Engineering Wins Major Smart Grid Contract',
      category: 'Company News',
      date: 'December 15, 2024',
      excerpt: 'JDT Engineering has been awarded a $5.2M contract to implement smart grid solutions across three major power distribution networks in Malaysia, marking our largest smart grid implementation to date.',
      content: 'This landmark contract represents our largest smart grid implementation to date...',
      fullContent: `This landmark contract represents our largest smart grid implementation to date and underscores our position as a leading provider of advanced power grid solutions in Southeast Asia.

The comprehensive project will involve the deployment of intelligent grid infrastructure across three major distribution networks serving over 500,000 customers in the Klang Valley region. Our solution includes:

• Advanced Metering Infrastructure (AMI) with real-time data collection
• Distribution Automation systems for improved reliability
• Energy Management Systems (EMS) for optimal grid operation
• Cybersecurity frameworks to protect critical infrastructure
• Predictive analytics for proactive maintenance

The implementation is expected to reduce power outages by 40%, improve energy efficiency by 15%, and enable better integration of renewable energy sources. This project showcases our expertise in combining traditional electrical engineering with cutting-edge digital technologies.

Our team will work closely with the local utility companies to ensure seamless integration with existing infrastructure while minimizing disruption to customers. The project timeline spans 18 months with full deployment expected by mid-2026.`,
      relatedTopics: [
        'Smart Grid Technology Advancements',
        'Power Distribution Modernization',
        'Renewable Energy Integration',
        'Grid Cybersecurity Solutions'
      ],
      icon: '◆',
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#00e676'
    },
    {
      id: 2,
      title: 'Successful Completion of Refinery Optimization Project',
      category: 'Project Updates',
      date: 'November 28, 2024',
      excerpt: 'Our team has successfully completed the digital transformation of a major refinery, achieving 12% increase in efficiency and 25% reduction in downtime through advanced AI-powered systems.',
      content: 'The 24-month project involved comprehensive system integration...',
      fullContent: `The successful completion of this major refinery optimization project marks a significant milestone in our oil & gas portfolio. The 24-month initiative involved comprehensive digital transformation of a 150,000 barrel-per-day refinery facility.

Key achievements include:

• Implementation of AI-powered predictive maintenance systems
• Advanced process control optimization using machine learning
• Real-time quality monitoring and automated adjustments
• Integration of digital twin technology for virtual operations
• Enhanced safety systems with automated emergency response

The results exceeded expectations with a 12% increase in overall efficiency, 25% reduction in unplanned downtime, and 8% improvement in product yield. The facility now serves as a benchmark for digital transformation in the refining industry.

Our multidisciplinary team of process engineers, automation specialists, and data scientists worked around the clock to ensure seamless integration without disrupting operations. The project included extensive training programs for plant operators and maintenance personnel.

The success of this project has positioned JDT Engineering for similar digital transformation initiatives across the region, with several major oil companies already expressing interest in our proven methodologies.`,
      relatedTopics: [
        'AI in Process Industries',
        'Predictive Maintenance Technologies',
        'Digital Twin Applications',
        'Refinery Automation Systems'
      ],
      icon: '▲',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#FF6B6B'
    },
    {
      id: 3,
      title: 'Advancing AI Integration in Industrial Automation',
      category: 'Technology',
      date: 'November 20, 2024',
      excerpt: 'JDT Engineering announces breakthrough in AI-powered predictive maintenance systems, reducing equipment failures by up to 60% and revolutionizing industrial maintenance practices.',
      content: 'Our latest AI algorithms leverage machine learning to predict equipment failures...',
      fullContent: `JDT Engineering has achieved a significant breakthrough in AI-powered predictive maintenance, developing proprietary algorithms that can predict equipment failures with 95% accuracy up to 30 days in advance.

Our research and development team has spent over two years developing these advanced machine learning models, which analyze multiple data streams including:

• Vibration patterns and acoustic signatures
• Temperature and pressure variations
• Power consumption profiles
• Historical maintenance records
• Environmental conditions

The AI system uses deep learning neural networks to identify subtle patterns that human operators might miss. Early implementation across our client facilities has shown remarkable results:

• 60% reduction in unexpected equipment failures
• 35% decrease in maintenance costs
• 45% improvement in equipment lifespan
• 20% increase in overall equipment effectiveness (OEE)

This technology is particularly effective in rotating equipment such as pumps, compressors, and turbines, where early detection of bearing wear, misalignment, or cavitation can prevent catastrophic failures.

We're now offering this technology as a standalone service and integrating it into all our new automation projects. The system can be deployed on-premises or in the cloud, providing flexibility for different operational requirements.`,
      relatedTopics: [
        'Machine Learning in Industry',
        'IoT Sensor Technologies',
        'Condition-Based Maintenance',
        'Industrial Data Analytics'
      ],
      icon: '◉',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#A78BFA'
    },
    {
      id: 4,
      title: 'Excellence in Engineering Award 2024',
      category: 'Awards',
      date: 'October 10, 2024',
      excerpt: 'JDT Engineering receives the prestigious Excellence in Engineering Award from the Malaysian Society of Professional Engineers, recognizing our innovation and commitment to engineering excellence.',
      content: 'This recognition highlights our commitment to innovation and engineering excellence...',
      fullContent: `JDT Engineering is honored to receive the prestigious Excellence in Engineering Award 2024 from the Malaysian Society of Professional Engineers (MSPE). This award recognizes our outstanding contributions to the engineering profession and our commitment to innovation in industrial automation.

The award specifically acknowledges our groundbreaking work in:

• Development of integrated safety systems for offshore platforms
• Innovation in digital twin technology for process industries
• Leadership in sustainable engineering practices
• Mentorship and development of young engineers

The selection committee praised our holistic approach to engineering challenges, combining technical excellence with environmental responsibility and social impact. Our offshore platform safety project, which resulted in zero safety incidents over 24 months, was particularly highlighted.

This award reflects the dedication of our entire team of 150+ engineers, technicians, and support staff who consistently deliver world-class solutions. It also recognizes our investment in research and development, with 15% of our annual revenue dedicated to innovation initiatives.

We're proud to join the ranks of previous recipients, which include some of Malaysia's most respected engineering firms. This recognition motivates us to continue pushing the boundaries of what's possible in engineering and technology.

The award will be presented at the MSPE Annual Convention in Kuala Lumpur, where our CEO will deliver a keynote address on "The Future of Industrial Engineering in the Digital Age."`,
      relatedTopics: [
        'Engineering Excellence Standards',
        'Professional Engineering Recognition',
        'Innovation in Industrial Automation',
        'Sustainable Engineering Practices'
      ],
      icon: '⬢',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#FFD93D'
    },
    {
      id: 5,
      title: 'The Future of Digital Twin Technology in Heavy Industries',
      category: 'Industry Insights',
      date: 'September 25, 2024',
      excerpt: 'Our technical whitepaper explores how digital twin technology is revolutionizing heavy industries and manufacturing processes, providing unprecedented insights into operational efficiency.',
      content: 'Digital twin technology represents a paradigm shift in how we monitor...',
      fullContent: `Our latest technical whitepaper, "The Future of Digital Twin Technology in Heavy Industries," provides comprehensive insights into how this transformative technology is reshaping industrial operations worldwide.

Digital twin technology creates real-time virtual replicas of physical assets, enabling:

• Predictive analytics for equipment performance
• Virtual testing of operational scenarios
• Optimization of process parameters
• Enhanced training simulations
• Improved maintenance planning

Key findings from our research include:

Manufacturing Sector:
• 25% reduction in product development time
• 15% improvement in first-pass yield
• 30% decrease in quality-related costs

Process Industries:
• 20% increase in overall equipment effectiveness
• 40% reduction in unplanned downtime
• 12% improvement in energy efficiency

The whitepaper examines real-world case studies from our implementations across steel production, petrochemicals, and power generation facilities. We detail the technical architecture, data integration challenges, and ROI calculations that demonstrate the business value of digital twin deployments.

Looking ahead, we predict widespread adoption of digital twins will accelerate with advances in:
• Edge computing capabilities
• 5G connectivity
• AI/ML model sophistication
• Cloud infrastructure

The paper concludes with our roadmap for next-generation digital twin platforms that will incorporate augmented reality interfaces and autonomous optimization capabilities.`,
      relatedTopics: [
        'Digital Transformation Strategies',
        'Industrial IoT Implementation',
        'Virtual Reality in Manufacturing',
        'AI-Driven Process Optimization'
      ],
      icon: '◈',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#4ECDC4'
    },
    {
      id: 6,
      title: 'Offshore Platform Safety Systems Upgrade Complete',
      category: 'Project Updates',
      date: 'September 12, 2024',
      excerpt: 'Completion of comprehensive safety system upgrade for offshore drilling platform, enhancing operational safety by 70% and setting new industry standards for offshore safety protocols.',
      content: 'The 22-month project involved upgrading critical safety systems...',
      fullContent: `The successful completion of our comprehensive safety systems upgrade for a major offshore drilling platform represents a landmark achievement in offshore safety engineering. This 22-month project has set new industry standards for platform safety and operational excellence.

The scope of work included:

Emergency Shutdown Systems (ESD):
• Complete replacement of legacy pneumatic systems with smart digital controls
• Integration of advanced fire and gas detection networks
• Implementation of SIL-3 rated safety instrumented functions

Fire Protection Systems:
• Installation of state-of-the-art deluge systems
• Deployment of intelligent fire detection algorithms
• Integration with emergency response protocols

Process Safety Management:
• Development of comprehensive hazard identification procedures
• Implementation of real-time risk monitoring systems
• Creation of automated safety reporting mechanisms

The results have been exceptional:
• 70% improvement in safety response times
• Zero safety incidents since system commissioning
• 50% reduction in false alarm rates
• 85% faster emergency response coordination

This project required extensive collaboration with offshore crews, safety regulators, and international certification bodies. All work was completed during scheduled maintenance windows to minimize production impact.

The enhanced safety systems now serve as a reference design for other platforms in the region, with three additional operators requesting similar upgrades based on our proven methodologies.`,
      relatedTopics: [
        'Offshore Safety Engineering',
        'Emergency Response Systems',
        'Process Safety Management',
        'Maritime Safety Standards'
      ],
      icon: '●',
      imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      accentColor: '#FF8C42'
    }
  ];

  const filteredNews = selectedCategory === 'All' 
    ? newsItems 
    : newsItems.filter(news => news.category === selectedCategory);

  const closeModal = () => setSelectedNews(null);

  return (
    <NewsroomContainer>
      <HeroSection>
        <HeroBackground />
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="highlight">Newsroom</span>
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stay updated with the latest news, project updates, and industry insights from JDT Engineering. 
          Discover our ongoing innovations and achievements in engineering excellence.
        </HeroSubtitle>
      </HeroSection>

      <FeaturedNews>
        <FeaturedContainer>
          <FeaturedContent
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>
              Latest <span className="highlight">Developments</span>
            </h2>
            <p>
              JDT Engineering continues to push the boundaries of engineering innovation. 
              Our recent projects showcase cutting-edge technologies and sustainable solutions 
              that are shaping the future of industrial automation and process optimization.
            </p>
            <FeaturedButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Updates →
            </FeaturedButton>
          </FeaturedContent>
          
          <FeaturedVisual
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 style={{ position: 'relative', zIndex: 2, fontSize: '2rem', marginBottom: '1rem', color: '#00c853' }}>
              18+ Years of Excellence
            </h3>
            <p style={{ position: 'relative', zIndex: 2, fontSize: '1.1rem' }}>
              Consistently delivering innovative engineering solutions across 
              Power, Oil & Gas, and Heavy Industries sectors.
            </p>
          </FeaturedVisual>
        </FeaturedContainer>
      </FeaturedNews>

      <NewsSection>
        <CategoryTabs>
          {categories.map((category) => (
            <CategoryTab
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <NewsGrid>
          <AnimatePresence>
            {filteredNews.map((news, index) => (
              <NewsCard
                key={news.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                accentColor={news.accentColor}
                onClick={() => setSelectedNews(news.id)}
                style={{ cursor: 'pointer' }}
              >
                <NewsImage imageUrl={news.imageUrl}>
                  <NewsIconContainer accentColor={news.accentColor}>
                    {news.icon}
                  </NewsIconContainer>
                </NewsImage>
                <NewsContent>
                  <NewsHeader>
                    <NewsCategory accentColor={news.accentColor}>
                      {news.category}
                    </NewsCategory>
                    <NewsDate>{news.date}</NewsDate>
                  </NewsHeader>
                  <NewsTitle>{news.title}</NewsTitle>
                  <NewsExcerpt>{news.excerpt}</NewsExcerpt>
                  <ReadMoreButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    accentColor={news.accentColor}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNews(news.id);
                    }}
                  >
                    Read Full Article →
                  </ReadMoreButton>
                </NewsContent>
              </NewsCard>
            ))}
          </AnimatePresence>
        </NewsGrid>
      </NewsSection>

      {/* Modal */}
      <AnimatePresence>
        {selectedNews !== null && (() => {
          const news = newsItems.find(item => item.id === selectedNews);
          if (!news) return null;
          
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
                accentColor={news.accentColor}
              >
                <ModalHeader imageUrl={news.imageUrl}>
                  <CloseButton
                    onClick={closeModal}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </CloseButton>
                  <ModalIconContainer accentColor={news.accentColor}>
                    <ModalIcon accentColor={news.accentColor}>
                      {news.icon}
                    </ModalIcon>
                  </ModalIconContainer>
                </ModalHeader>
                
                <ModalBody>
                  <ModalTitle>{news.title}</ModalTitle>
                  
                  <ModalMeta>
                    <MetaItem accentColor={news.accentColor}>
                      <span className="label">Category:</span>
                      <span className="value">{news.category}</span>
                    </MetaItem>
                    <MetaItem accentColor={news.accentColor}>
                      <span className="label">Published:</span>
                      <span className="value">{news.date}</span>
                    </MetaItem>
                  </ModalMeta>
                  
                  <ModalDescription>{news.excerpt}</ModalDescription>
                  
                  <FullContentSection>
                    <ContentTitle>Full Article</ContentTitle>
                    <ContentText dangerouslySetInnerHTML={{ __html: news.fullContent.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
                  </FullContentSection>
                  
                  <RelatedSection accentColor={news.accentColor}>
                    <RelatedTitle>Related Topics</RelatedTitle>
                    <RelatedList accentColor={news.accentColor}>
                      {news.relatedTopics.map((topic, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          {topic}
                        </motion.li>
                      ))}
                    </RelatedList>
                  </RelatedSection>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          );
        })()}
      </AnimatePresence>
    </NewsroomContainer>
  );
};

export default Newsroom; 