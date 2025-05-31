import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Social Media Icons Components
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Contact Icons Components
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const WebsiteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(20px);
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 3rem 2rem 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled(motion.div)`
  h3 {
    color: ${props => props.theme.colors.accent};
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px ${props => props.theme.colors.glow}40;
  }

  p, li {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.25rem 0;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.accent};
      cursor: pointer;
    }
  }
`;

const CompanyLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  .jdt {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 10px ${props => props.theme.colors.glow}40;
  }
  
  .engineering {
    color: ${props => props.theme.colors.text};
    font-size: 0.8rem;
    font-weight: 400;
    display: block;
    margin-top: -5px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${props => props.theme.colors.textSecondary};
    transition: all 0.3s ease;
    padding: 0.75rem;
    border-radius: 12px;
    background: ${props => props.theme.colors.background}20;
    border: 1px solid ${props => props.theme.colors.border}30;
    
    &:hover {
      background: ${props => props.theme.colors.border}20;
      color: ${props => props.theme.colors.text};
      transform: translateX(8px);
      border-color: ${props => props.theme.colors.accent}50;
      box-shadow: 0 4px 15px ${props => props.theme.colors.glow}20;
    }
    
    .icon {
      width: 24px;
      height: 24px;
      color: ${props => props.theme.colors.accent};
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.3s ease;
    }
    
    &:hover .icon {
      transform: scale(1.1);
      filter: drop-shadow(0 0 8px ${props => props.theme.colors.glow}60);
    }
    
    span:not(.icon) {
      font-weight: 500;
      font-size: 0.95rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    border-color: transparent;
    
    &::before {
      opacity: 1;
    }
  }

  &.facebook {
    &:hover {
      color: white;
      &::before {
        background: #1877F2;
      }
    }
  }

  &.instagram {
    &:hover {
      color: white;
      &::before {
        background: linear-gradient(45deg, #E1306C, #F56040, #F77737, #FCAF45, #FFDC80);
      }
    }
  }

  &.tiktok {
    &:hover {
      color: white;
      &::before {
        background: linear-gradient(45deg, #000000, #FF0050, #00F2EA);
      }
    }
  }

  &.youtube {
    &:hover {
      color: white;
      &::before {
        background: #FF0000;
      }
    }
  }

  .icon-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  &:hover .icon-content {
    transform: scale(1.1);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const GlowingText = styled.span`
  color: ${props => props.theme.colors.accent};
  text-shadow: 0 0 10px ${props => props.theme.colors.glow}40;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CompanyLogo>
            <span className="jdt">JDT</span>
            <span className="engineering">ENGINEERING SDN BHD</span>
          </CompanyLogo>
          <p>
            Established in 2006, JDT Engineering Sdn Bhd specializes in Power, Oil & Gas, 
            and Heavy Industries, delivering cutting-edge digital solutions, engineering 
            services, and system integration for process optimization.
          </p>
          <SocialLinks>
            <SocialLink
              href="https://facebook.com/jdtengineering"
              className="facebook"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow us on Facebook"
            >
              <span className="icon-content">
                <FacebookIcon />
              </span>
            </SocialLink>
            <SocialLink
              href="https://instagram.com/jdtengineering"
              className="instagram"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow us on Instagram"
            >
              <span className="icon-content">
                <InstagramIcon />
              </span>
            </SocialLink>
            <SocialLink
              href="https://tiktok.com/@jdtengineering"
              className="tiktok"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow us on TikTok"
            >
              <span className="icon-content">
                <TikTokIcon />
              </span>
            </SocialLink>
            <SocialLink
              href="https://youtube.com/@jdtengineering"
              className="youtube"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              title="Subscribe to our YouTube channel"
            >
              <span className="icon-content">
                <YouTubeIcon />
              </span>
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Core Services</h3>
          <ul>
            <li>Digital Solutions</li>
            <li>Engineering Services</li>
            <li>System Integration</li>
            <li>Advanced Technologies</li>
            <li>Process Optimization</li>
            <li>Heavy Industries Support</li>
          </ul>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Industries</h3>
          <ul>
            <li>Power Generation</li>
            <li>Oil & Gas</li>
            <li>Heavy Industries</li>
            <li>Manufacturing</li>
            <li>Infrastructure</li>
            <li>Energy Solutions</li>
          </ul>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3>Contact Information</h3>
          <ContactInfo>
            <div className="contact-item">
              <span className="icon">
                <LocationIcon />
              </span>
              <span>Kuala Lumpur, Malaysia</span>
            </div>
            <div className="contact-item">
              <span className="icon">
                <PhoneIcon />
              </span>
              <span>+60 3-XXXX XXXX</span>
            </div>
            <div className="contact-item">
              <span className="icon">
                <EmailIcon />
              </span>
              <span>info@jdtengineering.com</span>
            </div>
            <div className="contact-item">
              <span className="icon">
                <WebsiteIcon />
              </span>
              <span>www.jdtengineering.com</span>
            </div>
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          © {currentYear} <GlowingText>JDT Engineering Sdn Bhd</GlowingText>. 
          All rights reserved. | Established 2006 | Engineering Excellence Since Day One
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 